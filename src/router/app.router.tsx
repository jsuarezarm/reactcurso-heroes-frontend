import { createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/admin/layouts/AdminLayout';
// import { AdminPage } from '@/admin/pages/AdminPage';
import { HeroesLayout } from '@/heores/layouts/HeroesLayout';
import { HeroPage } from '@/heores/pages/hero/HeroPage';
import { HomePage } from '@/heores/pages/home/HomePage';
import { lazy } from 'react';

// import { SearchPage } from '@/heores/pages/search/SearchPage';

const SearchPage = lazy(() => import('@/heores/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'heroes/:idSlug',
        element: <HeroPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: '*',
        // element: <h1>404</h1>,
        element: <Navigate to="/" />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />
      },
    ]
  }
]);