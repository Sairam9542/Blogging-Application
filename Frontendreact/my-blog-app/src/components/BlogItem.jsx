import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import axios from 'axios'

export default function BlogItem() {
    const allBlogs=useLoaderData()
    const navigate=useNavigate()
    console.log(allBlogs )

    const deleteBlog=async(id)=>{
        await axios.delete(`http://localhost:5000/blog/${id}`)
        navigate("/")
    }
  return (
    <>
        {
            allBlogs.map((blog,index)=>{
               return( <div className="card shadow p-3 m-5 rounded border-0">
                    <div key={index} className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text"><Markdown>{blog.description}</Markdown></p>
                        <p><a className='viewelement' href={`/blogView/${blog.id}`}>View more</a></p>
                        <button id='buttondlt' onClick={()=>deleteBlog(blog.id)} className='btn text-white'>Delete</button>
                    </div>
                </div>)
            })
        }
    </>
  )
}
