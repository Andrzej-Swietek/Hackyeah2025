import { FC } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { About } from '@routes/About.tsx';
import { Home } from '@routes/Home.tsx';
import { Login } from '@routes/auth/Login.tsx';
import { MainLayout } from '@layouts/MainLayout.tsx';
import { Register } from '@routes/auth/Register.tsx';
import { ProjectEditor} from "@routes/ProjectEditor/ProjectEditor.tsx";
import { UserProfileTab } from '@routes/user/UserProfile.tsx';
import {UserProjects} from "@routes/user/UserProjects.tsx";
import { Reports } from '@routes/user/Reports.tsx';
import { Settings } from '@routes/settings/Settings.tsx';
import { LabelsManagement } from '@routes/settings/labels/LabelsManagement.tsx';
import { Alerts } from '@routes/alerts/Alerts.tsx';

interface Props {
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      // {
      //   path: 'alerts',
      //   element: <Alerts />,
      // },
      {
        path: 'auth',
        element: <Outlet />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: 'user',
        element: <Outlet />,
        children: [
          { path: 'my-profile', element: <UserProfileTab /> },
          { path: 'my-projects', element: <UserProjects /> },
          // { path: 'reports', element: <Reports /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
      {
        path: 'new-project',
        element: <ProjectEditor createNew={true} />,
      },
      {
        path: 'project-editor/:projectId',
        element: <ProjectEditor />,
      },
      // { path: 'management/labels', element: <LabelsManagement /> },
    ],
  },
]);

const App: FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
