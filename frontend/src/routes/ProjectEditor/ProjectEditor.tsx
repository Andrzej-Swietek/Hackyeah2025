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
            return res.data;
        },
        enabled: !!currentProjectId,
    });

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

    const exampleMarkers: MarkerData[] = [
        {
            lat: 40.1215,
            lng: -100.4503,
            background: '#ff0000',
            borderColor: '#aa0000',
            glyphColor: '#ffffff',
            name: 'Marker 1',
            description: 'Opis dla markera 1',
        },
        {
            lat: 39.5,
            lng: -99.0,
            background: '#00ff00',
            borderColor: '#006400',
            glyphColor: '#000000',
            name: 'Marker 2',
            description: 'Opis dla markera 2',
        },
    ];

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

            {!showCreateModal && currentProjectId && (
                <div className="w-full mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DayPlanner
                        selectedDay={null}
                        onSelectDay={() => {}}
                    />
                    <MapView
                        center={{ lat: 40.1215019, lng: -100.4503936 }}
                        zoom={4}
                        markers={exampleMarkers}
                    />
                </div>
            )}
        </div>
    );
};
