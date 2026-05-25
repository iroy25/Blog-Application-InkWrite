package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.repositories.CommentRepo;
import com.example.demo.repositories.PostRepo;
@Component 
public class PostSecurity {

    @Autowired
    private PostRepo postRepo;
    
    @Autowired
    private CommentRepo commentRepo;

    
    public boolean isPostOwner(Integer postId, String email) {
        return postRepo.findById(postId)
            .map(p -> p.getUser().getEmail().equals(email))
            .orElse(false);
    }

    
    public boolean isCommentOwner(Integer commentId,String email) {
    	return commentRepo.findById(commentId)
                .map(c -> c.getUser().getEmail().equals(email))
                .orElse(false);
    }
    public boolean isCommentOnOwnedPost(Integer commentId, String email) {
        return commentRepo.findById(commentId)
            .map(c -> c.getPost().getUser().getEmail().equals(email))
            .orElse(false);
    }
}