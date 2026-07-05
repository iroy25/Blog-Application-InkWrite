package com.example.demo.services.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.services.FileService;
@Service
public class FileServiceImpl implements FileService {
	@Autowired
    private Cloudinary cloudinary;

@Override
public String uploadImage(MultipartFile file) throws IOException {

	try {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder", "inkwrite/posts")
        );

        String secureUrl = (String) uploadResult.get("secure_url");

        System.out.println("===== CLOUDINARY UPLOAD SUCCESS =====");
        System.out.println("URL: " + secureUrl);

        return secureUrl;

    } catch (Exception e) {
        System.out.println("IMAGE UPLOAD FAILED");
        e.printStackTrace();
        throw e;
    }
	}


}
