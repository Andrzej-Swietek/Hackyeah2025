import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskControllerApiFactory, Team, TeamControllerApiFactory } from '@/api';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import { ColumnTitle } from '@components/board';
import { RetroContainer } from '@components/common/RetroContainer.tsx';
import { RetroButton } from '@components/common/RetroButton.tsx';
import { FolderKanban, Trash2 } from 'lucide-react';
import { RetroEntryCard } from '@components/common/RetroEntryCard.tsx';
import { Loading } from '@components/common/Loading.tsx';
import { useTranslation } from 'react-i18next';

interface HomeProps {
}

// const fetchTeams = async () => {
//   const response = await TeamControllerApiFactory().getAllTeams({});
//   return response.data;
// };
//
// const fetchUsersTeams = async (userId: string) => {
//   const response = await TeamControllerApiFactory().getTeamsByUserId(userId);
//   return response.data;
// };
//
// const fetchUserTasks = async (userId: string) => {
//   const response = await TaskControllerApiFactory().getTasksByUserId(userId);
//   return response.data;
// };

export const Home: FC<HomeProps> = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const userId = profile?.id;
  // const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  // const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  // const queryClient = useQueryClient();
  // const deleteTeamMutation = useMutation({
  //   mutationFn: async (teamId: number) => {
  //     await TeamControllerApiFactory().deleteTeam(teamId);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['teams'] });
  //     queryClient.invalidateQueries({ queryKey: ['my-teams', userId] });
  //   },
  // });

  // const { isLoading, isError } = useQuery({
  //   queryKey: ['teams'],
  //   queryFn: fetchTeams,
  // });

  // const {
  //   data: teams,
  //   isLoading: isTeamsLoading,
  // } = useQuery({
  //   queryKey: ['my-teams', userId],
  //   queryFn: () => fetchUsersTeams(userId!),
  //   enabled: !!userId,
  // });

  // const {
  //   data: tasks,
  //   isLoading: isTasksLoading,
  // } = useQuery({
  //   queryKey: ['my-tasks', userId],
  //   queryFn: () => fetchUserTasks(userId!),
  //   enabled: !!userId,
  // });

  // if (!isLoading && !userId) {
  //   navigate('/auth/login');
  // }

  // if (isError) {
  //   return <div>Error loading teams</div>;
  // }

  // if (isLoading) {
  //   return <Loading className="h-screen"></Loading>;
  // }

  return (
    <>
      <div className="w-full h-[125px] !px-32 !pt-12 !pb-8 border-b">
        <h1 className="font-[Josefin_Sans] font-normal text-[36px] leading-[100%] tracking-[0%] align-bottom text-[var(--primary-black)]">
          {t('home.greeting', { firstName: profile?.firstName, lastName: profile?.lastName })}
          {/*{t('home.greeting', { firstName: "Example", lastName: "User" })}*/}
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-8 min-h-[80vh] grid-rows-[auto_1fr] items-start !p-8">
        <main className="col-span-8 grid grid-cols-12 gap-y-8">

        </main>
        <aside className="col-span-4 grid grid-cols-12 gap-y-8 relative">

        </aside>
      </div>
    </>
  );
};
