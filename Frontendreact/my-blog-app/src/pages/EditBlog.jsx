import axios from 'axios'
import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

export default function EditBlog() {
  const blog=useLoaderData() 
  const [blogData,setBlogData]= useState(blog)
  const navigate=useNavigate()

  const onHandleChange=(e)=>{
      setBlogData(pre=>({...pre,[e.target.name]:e.target.value}))
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:5000/blog/${blog.id}`,blogData)
    navigate("/")
  }


  return (
    <>
    <div className="container mt-1">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <div className="mb-3">
              <label for="title" className="form-label">Title</label>
              <input type="text" name="title" className="form-control" onChange={onHandleChange} value={blogData.title}/>
            </div>
            <div className="mb-3">
              <label for="description" className="form-label">Description</label>
              <textarea type="text" name="description" rows="8" className="form-control" onChange={onHandleChange} value={blogData.description}></textarea>
            </div>
            <center><button id='buttonedt' onClick={onSubmit} type="submit" className="btn text-white">Submit</button></center>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}
