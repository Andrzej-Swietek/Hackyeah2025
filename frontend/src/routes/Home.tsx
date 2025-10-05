import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  DaySchedule,
  ProjectControllerApiFactory, ScheduleEntry,
} from '@/api';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import { useTranslation } from 'react-i18next';
import { Project } from '@/api';
import { useUpdateEffect } from '@hooks/useUpdateEffect.ts';

interface HomeProps {
}

// Const fetchTeams = async () => {
//   Const response = await TeamControllerApiFactory().getAllTeams({});
//   Return response.data;
// };

// Const fetchPhotos = async () => {
//     Const response = await GoogleApiControllerApiFactory().getPlaces({
//         Lat: number,
//         Lng: number,
//         Radius?: number,
//
//
//     });
//     Return response.data;
// }

// Const fetchUsersTeams = async (userId: string) => {
//   Const response = await TeamControllerApiFactory().getTeamsByUserId(userId);
//   Return response.data;
// };
//
// Const fetchUserTasks = async (userId: string) => {
//   Const response = await TaskControllerApiFactory().getTasksByUserId(userId);
//   Return response.data;
// };

export const Home: FC<HomeProps> = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // Build the Axios request args from the generated ParamCreator
      const response = await ProjectControllerApiFactory().getProjects(0, 10);

      return response.data;
    },
  });


  const userId = profile?.id;
  // Const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  // Const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  // Const queryClient = useQueryClient();
  // Const deleteTeamMutation = useMutation({
  //   MutationFn: async (teamId: number) => {
  //     Await TeamControllerApiFactory().deleteTeam(teamId);
  //   },
  //   OnSuccess: () => {
  //     QueryClient.invalidateQueries({ queryKey: ['teams'] });
  //     QueryClient.invalidateQueries({ queryKey: ['my-teams', userId] });
  //   },
  // });

  // Const { isLoading, isError } = useQuery({
  //   QueryKey: ['teams'],
  //   QueryFn: fetchTeams,
  // });

  // Const {
  //   Data: teams,
  //   IsLoading: isTeamsLoading,
  // } = useQuery({
  //   QueryKey: ['my-teams', userId],
  //   QueryFn: () => fetchUsersTeams(userId!),
  //   Enabled: !!userId,
  // });

  // Const {
  //   Data: tasks,
  //   IsLoading: isTasksLoading,
  // } = useQuery({
  //   QueryKey: ['my-tasks', userId],
  //   QueryFn: () => fetchUserTasks(userId!),
  //   Enabled: !!userId,
  // });

  // If (!isLoading && !userId) {
  //   Navigate('/auth/login');
  // }

  // If (isError) {
  //   Return <div>Error loading teams</div>;
  // }

  // If (isLoading) {
  //   Return <Loading className="h-screen"></Loading>;
  // }

  return (
    <>
      <div className="w-full h-[125px] !px-32 !pt-12 !pb-8 border-b">
        <h1 className="font-[Josefin_Sans] font-normal text-[36px] leading-[100%] tracking-[0%] align-bottom text-[var(--primary-black)]">
          {t('home.greeting')}
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-8 min-h-[80vh] grid-rows-[auto_1fr] items-start !p-8">

        <main className="col-span-8 grid grid-cols-12 gap-y-8">
          {isLoading && <p>Loading projects...</p>}
          {isError && <p>Error fetching projects</p>}
          {data?.data?.map((project: Project) => (
            <div key={project.id} className="col-span-12">
              <HomeCarousel project={project} />
            </div>
          ))}
        </main>

        <aside className="col-span-4 grid grid-cols-12 gap-y-8 relative">

        </aside>
      </div>
    </>
  );
};

type HomeCarousel = {
  project: Project;
};

export const HomeCarousel: FC<HomeCarousel> = ({ project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos =
      project?.plan?.flatMap(day =>
        day?.scheduleEntries?.flatMap(entry =>
          entry?.site?.photosPaths ?? [],
        ) ?? [],
      ) ?? [];

  useUpdateEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  if (!photos.length) return null;
  return (
    <section className="flex gap-8 relative w-full h-[200px] md:h-[300px] lg:h-[350px] overflow-hidden">

      <div
        className="flex-1 h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${photo})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-start gap-4">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <p className="text-gray-700">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Travelers:
            {' '}
            {project.numberOfTravelers ?? '-'}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Trip Type:
            {' '}
            {project.tripType ?? '-'}
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Eating Breaks:
            {' '}
            {project.numberOfEatingBreaks ?? '-'}
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            Intensiveness:
            {' '}
            {project.intensivenessLevel ?? '-'}
          </span>
        </div>

      </div>


    </section>
  );
};
