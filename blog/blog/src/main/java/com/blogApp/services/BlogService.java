package com.blogApp.services;

import org.springframework.stereotype.Service;

import com.blogApp.entity.Blog;
import com.blogApp.repositories.BlogRepo;
import java.util.List;


@Service
public class BlogService {
    
    BlogRepo blogRepo;
    public BlogService(BlogRepo blogRepo) {
        this.blogRepo = blogRepo;
    }
    
    public Blog createBlog(Blog blog){
        return blogRepo.save(blog);
    }
    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }
    public Blog getBlogById(int id) {
        return blogRepo.findById(id).orElseThrow(()->new RuntimeException("Blog not found "));
    }
    public Blog editBlog(Blog blog,int id) {
        blog.setId(id);
        return blogRepo.save(blog);
    }
    public void deleteById(int id) {
        blogRepo.deleteById(id);
    }

}
