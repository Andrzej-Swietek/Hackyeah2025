import { FC } from 'react';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Project, ProjectControllerApiFactory } from '@/api';
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const UserProjects: FC = () => {
    const { profile } = useUserProfile();
    const navigate = useNavigate();

    const { data: projects, isLoading, error } = useQuery<Project[]>({
        queryKey: ['user-projects', profile?.id],
        queryFn: async () => {
            if (!profile?.id) return [];
            const res = await ProjectControllerApiFactory().getProjectsByParticipant(profile.id);
            return res.data || [];
        },
        enabled: !!profile?.id,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-muted-foreground text-lg">Ładowanie projektów...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-500 text-lg">Błąd ładowania projektów</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Moje projekty</h1>
            {(!projects || projects.length === 0) && (
                <p className="text-muted-foreground">Nie masz jeszcze żadnych projektów.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects?.map((project) => {
                    const locations = Array.from(
                        new Set(
                            project.plan
                                ?.flatMap(day =>
                                    day.scheduleEntries?.map(se => se.site?.address?.city).filter(Boolean) || []
                                ) || []
                        )
                    );

                    return (
                        <Card
                            key={project.id}
                            className="overflow-hidden cursor-pointer hover:shadow-lg transition flex flex-col !py-0 relative"
                            onClick={() => navigate(`/project-editor/${project.id}`)}
                        >
                            {/* Obrazek projektu */}
                            <div
                                className="h-48 bg-gray-200 bg-cover bg-center w-full"
                                style={{
                                    backgroundImage: `url(https://picsum.photos/600/400)`,
                                }}
                            />

                            {/* Treść karty */}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                                <p className="text-md text-muted-foreground line-clamp-3">{project.description}</p>

                                <div className="mt-auto pt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span>Liczba osób: {project.numberOfTravelers}</span>
                                    <span>Typ: {project.tripType}</span>
                                </div>
                            </div>

                            {locations.length > 0 && (
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1 shadow">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="text-xs text-muted-foreground line-clamp-1">
                                        {locations.join(", ")}
                                    </span>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
