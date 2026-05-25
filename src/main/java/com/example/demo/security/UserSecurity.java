package com.example.demo.security;

import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {

    @Autowired
    private UserRepo userRepo;

    public boolean isOwner(Authentication authentication, Integer userId) {
        String loggedInEmail = authentication.getName(); 
        return userRepo.findById(userId)
                .map(user -> user.getEmail().equals(loggedInEmail))
                .orElse(false);
    }
}