package com.example.demo.services;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
	// String uploadImage(String path, MultipartFile file) throws IOException;
	//InputStream getResource(String path, String fileName) throws FileNotFoundException;

	String uploadImage(MultipartFile file) throws IOException;
}
