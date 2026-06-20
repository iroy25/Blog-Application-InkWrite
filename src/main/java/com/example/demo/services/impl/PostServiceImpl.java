package com.example.demo.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Category;
import com.example.demo.entities.Post;
import com.example.demo.entities.User;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.payloads.PostDto;
import com.example.demo.payloads.PostResponse;
import com.example.demo.repositories.CategoryRepo;
import com.example.demo.repositories.PostRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.PostService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepo postRepo;
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Override
public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {

    try {

        System.out.println("STEP 1");

        User user = this.userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User","User id",userId));

        System.out.println("STEP 2");

        Category category = this.categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category","Category id",categoryId));

        System.out.println("STEP 3");

        Post post = this.modelMapper.map(postDto, Post.class);

        System.out.println("STEP 4");

        post.setImageName("default.png");
        post.setAddedDate(new Date());
        post.setUser(user);
        post.setCategory(category);

        System.out.println("STEP 5");

        Post saved = this.postRepo.save(post);

        System.out.println("STEP 6");

        PostDto dto = this.modelMapper.map(saved, PostDto.class);

        dto.setUserId(user.getUserId());
        dto.setUserName(user.getName());

        System.out.println("STEP 7");

        return dto;

    } catch (Exception e) {

        e.printStackTrace();

        throw e;
    }
}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		Post post=this.postRepo.findById(postId)
				.orElseThrow(()-> new ResourceNotFoundException("Post", "Post Id",postId));
		post.setTitle(postDto.getTitle());		
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		Post updatedPost=this.postRepo.save(post);
		return this.modelMapper.map(updatedPost,PostDto.class);
	}

	@Override
	public void deletePost(Integer postId) {
		Post post=this.postRepo.findById(postId)
		.orElseThrow(()-> new ResourceNotFoundException("Post", "Post Id",postId));
		this.postRepo.delete(post);
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
		

		Sort sort = sortDir.equalsIgnoreCase("asc") 
		        ? Sort.by(sortBy).ascending() 
		        : Sort.by(sortBy).descending();

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);
		
		Page<Post> pagePost = this.postRepo.findAll(p);
		List<Post> allPosts = pagePost.getContent();
		
		
		List<PostDto> postDtos= allPosts.stream().map((post)
				->this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
				
		PostResponse postResponse= new PostResponse();
		postResponse.setContent(postDtos);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		return postResponse;
	}

	@Override
	public PostDto getPostById(Integer postId) {
		Post post = this.postRepo.findById(postId)
			.orElseThrow(()-> new ResourceNotFoundException("Post", "Post Id",postId));
		return this.modelMapper.map(post,PostDto.class);
	}

	@Override
	public List<PostDto> getPostsByCategory(Integer categoryId) {
		Category cat=this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("Category","Category id",categoryId));
		List<Post> posts = this.postRepo.findByCategory(cat);
		
		List<PostDto> postDtos=posts.stream()
				.map((post)->this.modelMapper.map(post, PostDto.class))
				.collect((Collectors.toList()));
		
		return postDtos;
	}

	@Override
	public List<PostDto> getPostsByUser(Integer userId) {
		User  user =this.userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("User","User id",userId));
		List<Post> posts = this.postRepo.findByUser(user);
		
		List<PostDto> postDtos=posts.stream()
				.map((post)->this.modelMapper.map(post, PostDto.class))
				.collect((Collectors.toList()));
		
		return postDtos;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> posts=this.postRepo.searchByTitle("%"+keyword+"%");
		List<PostDto> postDtos = posts.stream().map((post)->this.modelMapper.map(post,PostDto.class))
				.collect(Collectors.toList());
		return postDtos;
	}

}
