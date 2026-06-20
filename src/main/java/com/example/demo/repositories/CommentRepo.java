package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.demo.entities.Comment;
import com.example.demo.entities.Post;

public interface CommentRepo extends JpaRepository<Comment, Integer>{
	
    List<Comment> findByPost(Post post);
}
