import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DayPlanner } from "@components/project/DayPlanner.tsx";
import { MapView } from "@components/project/MapView.tsx";
import { CreateProjectModal } from "@components/project/CreateProjectModal.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectControllerApiFactory, Project } from "@/api";
import {useTranslation} from "react-i18next";


interface ProjectEditorProps {
    createNew?: boolean;
}

interface MarkerData {
    lat: number;
    lng: number;
    background: string;
    borderColor: string;
    glyphColor: string;
    name: string;
    description: string;
}

export const ProjectEditor: FC<ProjectEditorProps> = ({ createNew = false }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {t} = useTranslation();

    const { projectId } = useParams<{ projectId: string }>();

    const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(projectId);
    const [showCreateModal, setShowCreateModal] = useState(createNew);

    const { data: projectData, isLoading: isProjectLoading } = useQuery<Project>({
        queryKey: ['project', currentProjectId],
        queryFn: async () => {
            if (!currentProjectId) return undefined;
            const res = await ProjectControllerApiFactory().getProjectById(currentProjectId);
            console.log(res.data);
            return res.data;
        },
        enabled: !!currentProjectId,
    });

    const mappedDays = projectData?.plan?.map(day => ({
        id: String(day.id),
        date: day.date ? new Date(day.date).toISOString().substring(0, 10) : "",
        activities: day.scheduleEntries?.map(entry => ({
            id: String(entry.id),
            time: entry.startDate ? new Date(entry.startDate).toISOString().substring(11, 16) : "",
            title: entry.site?.name || "",
            location: entry.site?.address?.city || "",
            notes: entry.site?.description || "",
        })) || []
    })) || [];

    const mappedMarkers: MarkerData[] = projectData?.plan?.flatMap(day =>
        day.scheduleEntries?.map(entry => ({
            lat: entry.site?.geolocation?.latitude || 0,
            lng: entry.site?.geolocation?.longitude || 0,
            background: "#2563eb",     // np. niebieski
            borderColor: "#1d4ed8",
            glyphColor: "#ffffff",
            name: entry.site?.name || "Site",
            description: entry.site?.description || "",
        })) || []
    ) || [];

    const handleSavePlan = async (days: Day[]) => {
        if (!projectData) return;

        const updatedProject: Project = {
            ...projectData,
            plan: days.map(d => ({
                id: Number(d.id) || undefined,
                date: new Date(d.date),
                scheduleEntries: d.activities.map(a => ({
                    id: Number(a.id) || undefined,
                    startDate: new Date(`${d.date}T${a.time}:00`),
                    site: {
                        id: a.id,
                        name: a.title,
                        description: a.notes,
                        address: { city: a.location },
                        geolocation: { latitude: 0, longitude: 0 }
                    }
                }))
            }))
        };

        await ProjectControllerApiFactory().updateProject(projectData.id!, updatedProject);
        queryClient.invalidateQueries(['project', projectData.id]);
    };


    const [currentSlide, setCurrentSlide] = useState(0);
    const places = [
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
        { img_url: "https://overhere-media.s3.amazonaws.com/images/krakow_travel_guides.max-1280x768.jpg" },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % places.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [places.length]);

    return (
        <div className="flex flex-col w-full min-h-[88vh] relative">
            {showCreateModal && (
                <CreateProjectModal
                    open={showCreateModal}
                    onClose={() => navigate('/')}
                    onCreated={(newProjectId: number) => {
                        setCurrentProjectId(newProjectId);
                        setShowCreateModal(false);
                    }}
                />
            )}

            <section className="relative w-full h-[200px] md:h-[300px] lg:h-[350px] overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        {currentProjectId ? projectData?.name : t('projectEditor.header')}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl">
                        {currentProjectId ? projectData?.description : t('projectEditor.subheader')}
                    </p>
                </div>

                <div className="relative w-full h-full">
                    <div
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {places.map((place, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full h-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${place.img_url})` }}
                            >
                                <div className="absolute inset-0 bg-black/50" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*{!showCreateModal && currentProjectId && (*/}
            {/*    <div className="w-full mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">*/}
            {/*        <DayPlanner*/}
            {/*            selectedDay={null}*/}
            {/*            onSelectDay={() => {}}*/}
            {/*        />*/}
            {/*        <MapView*/}
            {/*            center={{ lat: 40.1215019, lng: -100.4503936 }}*/}
            {/*            zoom={4}*/}
            {/*            markers={exampleMarkers}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

            {!showCreateModal && currentProjectId && projectData && (
                <div className="w-full mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DayPlanner
                        initialDays={mappedDays}
                        selectedDay={null}
                        onSelectDay={() => {}}
                        onSave={handleSavePlan}
                    />
                    <MapView
                        center={{
                            lat: mappedMarkers[0]?.lat || 40.0,
                            lng: mappedMarkers[0]?.lng || -100.0,
                        }}
                        zoom={5}
                        markers={mappedMarkers}
                    />
                </div>
            )}
        </div>
    );
};
