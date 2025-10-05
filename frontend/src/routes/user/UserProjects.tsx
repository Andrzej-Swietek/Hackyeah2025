import { FC } from 'react';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Project, ProjectControllerApiFactory } from '@/api';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <div className="w-full max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Moje projekty</h1>
            {(!projects || projects.length === 0) && (
                <p className="text-muted-foreground">Nie masz jeszcze żadnych projektów.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.map((project) => (
                    <Card
                        key={project.id}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition"
                        onClick={() => navigate(`/project-editor/${project.id}`)}
                    >
                        {/* Obrazek projektu */}
                        <div className="h-40 bg-gray-200 bg-cover bg-center"
                             style={{
                                 backgroundImage: `url(https://picsum.photos/200/300)`
                             }}
                        />

                        {/* Treść */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

                            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                <span>Liczba osób: {project.numberOfTravelers}</span>
                                <span>Typ: {project.tripType}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
