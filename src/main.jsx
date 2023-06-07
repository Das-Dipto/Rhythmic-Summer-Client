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
        element: <Dashboard></Dashboard>
      },
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"registration",
        element:<Register></Register>
      }
    ]


  }])

ReactDOM.createRoot(document.getElementById('root')).render(
   <RouterProvider router={router} />
)