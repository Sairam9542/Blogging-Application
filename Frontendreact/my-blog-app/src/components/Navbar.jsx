import React from 'react'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src="https://img.freepik.com/premium-vector/word-blog-vector-banner-with-text-colored-rainbow_100655-2724.jpg" alt='Blog' width="70px"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a id="navstyles" className="nav-link active btn px-4" aria-current="page" href="/">Home</a>
        </li>
      </ul> 
      <form className="d-flex" role="search">
        <a id="navstyles" href="/addBlog" className="btn px-4" type="submit">Add Blog</a>
      </form>
    </div>
  </div>
</nav>
</>
  )
}
