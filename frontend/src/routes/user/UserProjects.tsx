import { FC } from 'react';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import {useNavigate} from "react-router-dom";


interface UserProjectsProps {
}

export const UserProjects: FC<AboutProps> = () => {
    const { profile, loading, error } = useUserProfile();
    const navigate = useNavigate();


    // if (loading)
    //     return (
    //         <div className="flex flex-col items-center justify-center h-screen">
    //             <p className="text-muted-foreground text-lg">Ładowanie profilu...</p>
    //         </div>
    //     );



    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">User Projects Page</h1>
            <p className="mt-4 text-lg">There will be a list of projects that the user is a part of.</p>
        </div>
    );
};
