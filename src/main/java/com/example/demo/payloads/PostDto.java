package com.example.demo.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {
	private Integer postId;
	private String title;
	
	private String content;
	
	private String imageName;
	
	private Date addedDate;
	
	private CategoryDto category;
	
	@JsonProperty("author_id")
	private Integer userId;
	
	@JsonProperty("author_name")
	private String userName;
	
	private Set<CommentDto> comments = new HashSet<>();
	
}
