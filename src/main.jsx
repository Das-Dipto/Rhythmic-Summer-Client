import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Pages/PublicRoute/Root.jsx';
import Home from './Pages/PublicRoute/Home.jsx';
import Error from './Pages/PublicRoute/Error.jsx';
import Instructors from './Pages/PublicRoute/Instructors.jsx';
import Classes from './Pages/PublicRoute/Classes.jsx';
import Dashboard from './Pages/PrivateRoute/Dashboard.jsx';
import Login from './Pages/PublicRoute/Login.jsx';
import Register from './Pages/PublicRoute/Register.jsx';
import ProtectedRoute  from './Component/ProtectedRoute.jsx'
import AuthProvider from './ContextProvider/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AdminDash from './Pages/PrivateRoute/AdminDash.jsx';
import StudentDash from './Pages/PrivateRoute/StudentDash.jsx';
import InstructorDash from './Pages/PrivateRoute/InstructorDash.jsx';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:"/",
    element:<Root></Root>,
    errorElement:<Error></Error>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"home",
        element:<Home></Home>
      },
      {
        path:"instructors",
        element: <Instructors></Instructors>
      },
      {
        path:"classes",
        element: <Classes></Classes>
      },
      {
        path:"dashboard",
        element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute> 
      },
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      },
      {
        path:"AdminDash",
        element: <ProtectedRoute> <AdminDash></AdminDash> </ProtectedRoute>
      },
      {
        path:"StudentDash",
        element:<ProtectedRoute> <StudentDash></StudentDash> </ProtectedRoute>
      },
      {
        path:"InstructorDash",
        element: <ProtectedRoute> <InstructorDash></InstructorDash> </ProtectedRoute>
      }

    ]


  }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
     </QueryClientProvider>
  </AuthProvider>
)
