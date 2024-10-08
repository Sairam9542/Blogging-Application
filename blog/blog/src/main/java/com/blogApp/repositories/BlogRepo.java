package com.blogApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogApp.entity.Blog;

public interface BlogRepo extends JpaRepository<Blog,Integer> {

}
