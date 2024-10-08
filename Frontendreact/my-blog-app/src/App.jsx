import React from 'react'

import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/home'
import MainNavigation from './components/MainNavigation';
import axios from 'axios'
import AddBlog from './pages/AddBlog';
import BlogDetails from './pages/BlogDetails';
import EditBlog from './pages/EditBlog';


const getAllBlogs=async()=> {
  let allBlogs=[]
  await axios.get("http://localhost:5000/blog").then(res=>
    allBlogs =res.data
  )
  return allBlogs;
}
const getBlog = async({params})=>{
  let Blogs=[]
  await axios.get(`http://localhost:5000/blog/${params.id}`).then(res=>{
    Blogs=res.data
  })
  return Blogs
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
    {index:true,element:<Home/>,loader:getAllBlogs},
    {path:"/addBlog",element:<AddBlog/>},
    {path:"/blogView/:id",element:<BlogDetails/>,loader:getBlog},
    {path:"/editBlog/:id",element:<EditBlog/>,loader:getBlog}
  ]}
])

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
