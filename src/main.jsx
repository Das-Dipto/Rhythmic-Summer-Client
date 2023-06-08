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
import SelectedClass from './Pages/PrivateRoute/SelectedClass.jsx';
import EnrolledClass from './Pages/PrivateRoute/EnrolledClass.jsx';
import AddClass from './Pages/PrivateRoute/AddClass.jsx';
import MyClass from './Pages/PrivateRoute/MyClass.jsx';
import ManageClass from './Pages/PrivateRoute/ManageClass.jsx'
import ManageUser from './Pages/PrivateRoute/ManageUser.jsx';


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
        element: <ProtectedRoute> <AdminDash></AdminDash> </ProtectedRoute>,
        children:[
          {
           path:"manageClasses",
           element:<ProtectedRoute> <ManageClass/>  </ProtectedRoute> 
          },
          {
            path:"manageUsers",
            element: <ProtectedRoute> <ManageUser/> </ProtectedRoute>
          }
      ]
      },
      {
        path:"StudentDash",
        element:<ProtectedRoute> <StudentDash></StudentDash> </ProtectedRoute>,
        children:[
          {
           path:"selected",
           element:<ProtectedRoute><SelectedClass/></ProtectedRoute> 
          },
          {
            path:"enrolled",
            element: <ProtectedRoute> <EnrolledClass/> </ProtectedRoute>
          }
      ]
      },
      {
        path:"InstructorDash",
        element: <ProtectedRoute> <InstructorDash></InstructorDash> </ProtectedRoute>,
        children:[
          {
           path:"addClass",
           element:<ProtectedRoute> <AddClass/> </ProtectedRoute> 
          },
          {
            path:"myClass",
            element: <ProtectedRoute> <MyClass/> </ProtectedRoute>
          }
      ]
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
