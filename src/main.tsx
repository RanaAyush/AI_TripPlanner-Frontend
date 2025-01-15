import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PlannerPlan from './pages/PlannerPlan.tsx'
import PlannerMeal from './pages/PlannerMeal.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './pages/ViewTrip.tsx'
import MyTrips from './pages/MyTrips.tsx'
import ProfileSettings from './pages/ProfileSettings.tsx'
import BlogPage from './pages/BlogPage.tsx'
import BlogReadPage from './pages/BlogReadPage.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'planner-plan',
    element:<PlannerPlan/>
  },
  {
    path:'planner-meal',
    element:<PlannerMeal/>
  },
  {
    path:'contact',
    element:<ContactPage/>
  },
  {
    path:'about',
    element:<AboutPage/>
  },
  {
    path:'login',
    element:<LoginPage/>
  },
  {
    path:'view-trip/:id',
    element:<ViewTrip/>
  },
  {
    path:'my-trips',
    element:<MyTrips/>
  },
  {
    path:'profile-settings',
    element:<ProfileSettings/>
  },
  {
    path:'blogs',
    element:<BlogPage/>
  },
  {
    path:'blogs/:id',
    element:<BlogReadPage/>
  },
  {
    path:'*',
    element:<NotFoundPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_KEY}>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
