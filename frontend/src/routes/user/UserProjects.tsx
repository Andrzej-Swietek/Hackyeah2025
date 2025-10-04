import { FC } from 'react';

interface UserProjectsProps {
}

export const UserProjects: FC<AboutProps> = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">User Projects Page</h1>
            <p className="mt-4 text-lg">There will be a list of projects that the user is a part of.</p>
        </div>
    );
};
