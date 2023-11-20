import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Users from './pages/users/Users';
import Home from './pages/home/Home';
import ErrorHandler from './pages/Error/Error-page';
import PrivateRoute from './utils/PrivateRoute';
import Update from './pages/update/Update';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorHandler />,
    children: [

      { index: true, element: <Home /> },

      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <PrivateRoute component={<Dashboard />} />
      },
      {
        path: "/users",
        element: <PrivateRoute component={<Users />} />
      },
      {
        path: "/update",
        element: <PrivateRoute component={<Update />} />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
