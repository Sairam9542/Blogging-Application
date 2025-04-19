import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import axios from 'axios';

export default function BlogItem() {
    const allBlogs = useLoaderData();
    const navigate = useNavigate();
    
    // Add state for hover effects and delete confirmation
    const [hoveredBlog, setHoveredBlog] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const deleteBlog = async(id) => {
        await axios.delete(`http://localhost:5000/blog/${id}`);
        navigate("/");
    };

    return (
        <>
            <style>
                {`
                    .blog-container {
                        max-width: 900px;
                        margin: 30px auto;
                        padding: 0 20px;
                    }
                    
                    .blog-card {
                        background-color: #fff;
                        border-radius: 12px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
                        margin-bottom: 30px;
                        transition: all 0.3s ease;
                        border-left: 5px solid transparent;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .blog-card:hover {
                        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                        transform: translateY(-3px);
                        border-left: 5px solid #6d46e4;
                    }
                    
                    .blog-header {
                        padding: 25px 25px 15px;
                    }
                    
                    .blog-title {
                        margin: 0;
                        font-size: 22px;
                        font-weight: 600;
                        color: #333;
                        transition: color 0.3s ease;
                    }
                    
                    .blog-card:hover .blog-title {
                        color: #6d46e4;
                    }
                    
                    .blog-content {
                        padding: 0 25px 20px;
                        color: #555;
                        line-height: 1.6;
                        max-height: 120px;
                        overflow: hidden;
                        position: relative;
                    }
                    
                    .blog-content::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 50px;
                        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
                    }
                    
                    .blog-content img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                        margin: 10px 0;
                    }
                    
                    .blog-content p {
                        margin: 10px 0;
                    }
                    
                    .blog-actions {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px 25px;
                        border-top: 1px solid #f0f0f0;
                        background-color: #fafafa;
                    }
                    
                    .view-link {
                        color: #6d46e4;
                        text-decoration: none;
                        font-weight: 500;
                        display: flex;
                        align-items: center;
                        transition: all 0.2s ease;
                    }
                    
                    .view-link:hover {
                        color: #4b2eaa;
                        transform: translateX(3px);
                    }
                    
                    .view-link svg {
                        margin-left: 5px;
                        transition: transform 0.2s ease;
                    }
                    
                    .view-link:hover svg {
                        transform: translateX(3px);
                    }
                    
                    .delete-btn {
                        background-color: #fff;
                        border: 1px solid #ff4d6d;
                        color: #ff4d6d;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-weight: 500;
                        font-size: 14px;
                    }
                    
                    .delete-btn:hover {
                        background-color: #ff4d6d;
                        color: #fff;
                    }
                    
                    .confirm-delete {
                        background-color: #ff4d6d;
                        color: white;
                        animation: pulse 1.5s infinite;
                    }
                    
                    @keyframes pulse {
                        0% { box-shadow: 0 0 0 0 rgba(255, 77, 109, 0.4); }
                        70% { box-shadow: 0 0 0 10px rgba(255, 77, 109, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(255, 77, 109, 0); }
                    }
                    
                    .no-blogs {
                        text-align: center;
                        padding: 50px 20px;
                        color: #666;
                        font-size: 18px;
                    }
                    
                    /* Responsive design */
                    @media (max-width: 768px) {
                        .blog-card {
                            margin-bottom: 20px;
                        }
                        
                        .blog-title {
                            font-size: 20px;
                        }
                        
                        .blog-content {
                            max-height: 100px;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .blog-header, .blog-content, .blog-actions {
                            padding: 15px;
                        }
                        
                        .blog-title {
                            font-size: 18px;
                        }
                        
                        .blog-actions {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 15px;
                        }
                        
                        .delete-btn {
                            align-self: flex-end;
                        }
                    }
                `}
            </style>

            <div className="blog-container">
                {allBlogs.length > 0 ? (
                    allBlogs.map((blog, index) => (
                        <div 
                            key={index} 
                            className="blog-card"
                            onMouseEnter={() => setHoveredBlog(blog.id)}
                            onMouseLeave={() => setHoveredBlog(null)}
                        >
                            <div className="blog-header">
                                <h3 className="blog-title">{blog.title}</h3>
                            </div>
                            <div className="blog-content">
                                <Markdown>{blog.description}</Markdown>
                            </div>
                            <div className="blog-actions">
                                <a className="view-link" href={`/blogView/${blog.id}`}>
                                    View more
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </a>
                                <button 
                                    className={`delete-btn ${confirmDelete === blog.id ? 'confirm-delete' : ''}`}
                                    onClick={() => {
                                        if (confirmDelete === blog.id) {
                                            deleteBlog(blog.id);
                                        } else {
                                            setConfirmDelete(blog.id);
                                            setTimeout(() => setConfirmDelete(null), 3000);
                                        }
                                    }}
                                >
                                    {confirmDelete === blog.id ? 'Confirm Delete' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-blogs">
                        <h3>No blogs found</h3>
                        <p>Start creating your first blog post!</p>
                    </div>
                )}
            </div>
        </>
    );
}