package com.example.demo.payloads;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentDto {
	
	private int id;
	
	private String content;
	
	private int userId;
	
	private String userName;


}
