package com.example.MemegeneratorAPI.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Random;

@Service

public class MemeService {

    private static final String IMAGE_FOLDER = "src/main/resources/static/images";

    public String getRandomMeme() {
        File folder = new File(IMAGE_FOLDER);
        File[] files = folder.listFiles((dir, name) -> name.endsWith(".jpg") || name.endsWith(".png"));

        if (files != null && files.length > 0) {
            int randomIndex = new Random().nextInt(files.length);
            return "/images/" + files[randomIndex].getName(); // Korrekte URL für Thymeleaf
        }

        return "/images/default.jpg";  // Falls kein Bild vorhanden ist
    }
}
