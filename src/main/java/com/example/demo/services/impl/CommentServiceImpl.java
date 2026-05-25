package com.example.demo.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Comment;
import com.example.demo.entities.Post;
import com.example.demo.entities.User;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.payloads.CommentDto;
import com.example.demo.repositories.CommentRepo;
import com.example.demo.repositories.PostRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private PostRepo postrepo;
	@Autowired
	private UserRepo userrepo;
	@Autowired
	private CommentRepo commentRepo;
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId, Integer userId) {
		Post post=this.postrepo.findById(postId).orElseThrow(()
				->new ResourceNotFoundException("Post","post id",postId));
		User user = this.userrepo.findById(userId)
		        .orElseThrow(() ->
		            new ResourceNotFoundException("User", "user id", userId));
		
		Comment comment = this.modelMapper.map(commentDto,Comment.class);
		comment.setPost(post);
		comment.setUser(user);
		Comment savedComment = this.commentRepo.save(comment);
		
		CommentDto commentdto = this.modelMapper.map(savedComment, CommentDto.class);

		commentdto.setUserId(savedComment.getUser().getUserId());
		commentdto.setUserName(savedComment.getUser().getName());

		return commentdto;
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment com=this.commentRepo.findById(commentId).orElseThrow(()
				-> new ResourceNotFoundException("Comment","comment id",commentId));
		this.commentRepo.delete(com);
	}

}
