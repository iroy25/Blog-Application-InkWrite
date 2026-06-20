package com.example.demo.services;
import java.util.List;
import com.example.demo.payloads.CommentDto;

public interface CommentService {

	List<CommentDto> getAllComments();
	
	CommentDto createComment(CommentDto commentDto, Integer postId,Integer userId);
	
	void deleteComment(Integer commentId);
	

}
