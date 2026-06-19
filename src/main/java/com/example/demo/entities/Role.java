package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Role {
	@Id
	@Column(name="role_id")
	private int roleId;
	
	
	private String name;

}
