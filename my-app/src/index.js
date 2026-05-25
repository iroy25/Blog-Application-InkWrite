import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, 
} from "react-router-dom"

import Homepage from './routes/Homepage';
import PostListPage from './routes/PostListPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';

import MainLayout from './layouts/MainLayout';
import SinglePostPage from './components/SinglePostPage';
import { AuthProvider } from "./utils/AuthContext";

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminPosts from './admin/AdminPosts';
import AdminPostForm from './admin/AdminPostForm';
import AdminUsers from './admin/AdminUsers';
import AdminUserPosts from './admin/AdminUserPosts';
import AdminCategories from './admin/AdminCategories';
import WritePage from './routes/WritePage';
const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
  {
    path:"/",
    element:<Homepage />,
  }, {
    path:"/posts",
    element: <PostListPage />,
  },

  {
    path:"/login",
    element: <LoginPage/>,
  },{
    path:"/register",
    element: <RegisterPage/>,
  },
  {
    path:"/post/:postId",
    element: <SinglePostPage/>,
  },  {
  path: "/write",
  element: <WritePage />,
},
{
  path: "/edit-post/:postId",
  element: <WritePage />,
},
   ],

  }, {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ 
      index: true, 
      element: <AdminDashboard /> 
    },{ 
      path: "posts", 
      element: <AdminPosts />
    },{ 
      path: "posts/create", 
      element: <AdminPostForm /> 
    },{ 
      path: "posts/edit/:postId", 
      element: <AdminPostForm /> 
    },{ 
      path: "users", 
      element: <AdminUsers /> 
    },{ path: "users/:userId/posts", 
      element: <AdminUserPosts /> 
    },{ path: "categories", 
      element: <AdminCategories /> 
    },    
  ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>      
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
