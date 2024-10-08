import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddBlog() {
  const [blogData,setBlogData]= useState({})
  const navigate=useNavigate()

  const onHandleChange=(e)=>{
      setBlogData(pre=>({...pre,[e.target.name]:e.target.value}))
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:5000/blog",blogData)
    navigate("/")
  }


  return (
    <>
    <div className="container mt-1 py-2 bg-light rounded border shadow">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form>
            <div className="mb-3">
              <label for="title" className="form-label">Title</label>
              <input type="text" name="title" className="form-control" onChange={onHandleChange}/>
            </div>
            <div className="mb-3">
              <label for="description" className="form-label">Description</label>
              <textarea type="text" name="description" rows="8" className="form-control" onChange={onHandleChange}></textarea>
            </div>
            <center><button id='blogsubmit' onClick={onSubmit} type="submit" className="btn btn-primary">Submit</button></center>
          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}
