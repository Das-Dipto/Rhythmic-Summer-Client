import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
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
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import AdminDash from './Pages/PrivateRoute/AdminDash.jsx';
import StudentDash from './Pages/PrivateRoute/StudentDash.jsx';
import InstructorDash from './Pages/PrivateRoute/InstructorDash.jsx';
import SelectedClass from './Pages/PrivateRoute/SelectedClass.jsx';
import EnrolledClass from './Pages/PrivateRoute/EnrolledClass.jsx';
import AddClass from './Pages/PrivateRoute/AddClass.jsx';
import MyClass from './Pages/PrivateRoute/MyClass.jsx';
import ManageClass from './Pages/PrivateRoute/ManageClass.jsx'
import ManageUser from './Pages/PrivateRoute/ManageUser.jsx';
import UpdateClassInfo from './Pages/PrivateRoute/UpdateClassInfo.jsx';
import Payment from './Pages/PrivateRoute/Payment.jsx';
import PaymentHistory from './Pages/PrivateRoute/PaymentHistory.jsx';
import { Fade } from 'react-awesome-reveal';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:"/",
    element:<Fade><Root></Root></Fade>,
    errorElement:<Error></Error>,
    children:[
      {
        path:"/",
        element: <Fade> <Home></Home> </Fade> 
      },
      {
        path:"home",
        element:<Fade> <Home></Home> </Fade>
      },
      {
        path:"instructors",
        element: <Fade> <Instructors></Instructors> </Fade> 
      },
      {
        path:"classes",
        element: <Fade> <Classes></Classes> </Fade> 
      },
      {
        path:"dashboard",
        element: <ProtectedRoute> <Fade> <Dashboard></Dashboard> </Fade> </ProtectedRoute> 
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
          },
          {
            path:"payment/:id",
            element: <ProtectedRoute> <Payment/> </ProtectedRoute>
          },
          {
            path:"paymentHistory",
            element:<ProtectedRoute> <PaymentHistory/> </ProtectedRoute>
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
          },
          {
            path:"updateClassInfo/:id",
            element: <ProtectedRoute> <UpdateClassInfo/> </ProtectedRoute>
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
