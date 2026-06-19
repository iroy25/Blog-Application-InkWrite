package com.example.demo;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.config.AppConstants;
import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepo;

@SpringBootApplication
public class BlogApplication implements CommandLineRunner{

	@Autowired
	private RoleRepo roleRepo;
	
	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) {
		try {
			if (!roleRepo.existsById(AppConstants.ADMIN_USER)) {
				Role role1 = new Role();
				role1.setRoleId(AppConstants.ADMIN_USER);
				role1.setName("ROLE_ADMIN");
				roleRepo.save(role1);
			}

			if (!roleRepo.existsById(AppConstants.NORMAL_USER)) {
				Role role2 = new Role();
				role2.setRoleId(AppConstants.NORMAL_USER);
				role2.setName("ROLE_NORMAL");
				roleRepo.save(role2);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
