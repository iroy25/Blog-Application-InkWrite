package com.example.demo.services.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.services.FileService;
@Service
public class FileServiceImpl implements FileService {

@Override
public String uploadImage(String path, MultipartFile file) throws IOException {

    try {

        String name = file.getOriginalFilename();

        String randomID = UUID.randomUUID().toString();

        String fileName = randomID + name.substring(name.lastIndexOf("."));

        File folder = new File(path);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String filePath = folder.getAbsolutePath() + File.separator + fileName;

        System.out.println("===== IMAGE UPLOAD =====");
        System.out.println("Configured path : " + path);
        System.out.println("Absolute path   : " + folder.getAbsolutePath());
        System.out.println("Saving file to  : " + filePath);

        Files.copy(
                file.getInputStream(),
                Paths.get(filePath),
                java.nio.file.StandardCopyOption.REPLACE_EXISTING);

        System.out.println("Image uploaded successfully!");

        return fileName;

    } catch (Exception e) {
        System.out.println("IMAGE UPLOAD FAILED");
        e.printStackTrace();
        throw e;
    }
}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path+ File.separator +fileName;
		InputStream is = new FileInputStream(fullPath);
		return is;
	}

}
