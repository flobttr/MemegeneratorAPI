package com.example.MemegeneratorAPI.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;

@RestController
public class MemeSaver {

    // Liest den Pfad aus der application.properties: meme.storage.location
    @Value("${meme.storage.location}")
    private String memeStorageLocation;

    // Endpunkt zum Speichern des Memes
    @PostMapping("/saveMeme")
    public ResponseEntity<Map<String,Object>> saveMeme(@RequestBody Map<String, String> payload){
        // Der Key "imageData" enthält den Base64-String aus dem Frontend
        String imageData = payload.get("imageData");

        // Bestimme den MIME-Typ anhand des Data-URL-Prefix
        String mimeType = imageData.substring(5, imageData.indexOf(";"));  // z.B. "image/png" oder "image/jpeg"
        String extension = mimeType.equals("image/png") ? ".png" : mimeType.equals("image/jpeg") ? ".jpg" : "";

        // Entferne den "data:image/png;base64,"-Teil
        String base64Image = imageData.contains(",") ? imageData.split(",")[1] : imageData;

        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            String fileName = "meme_" + System.currentTimeMillis() + extension;
            Path outputPath = Paths.get(memeStorageLocation, fileName);
            Files.createDirectories(outputPath.getParent());
            Files.write(outputPath, imageBytes);

            Map<String, Object> response = new HashMap<>();
            response.put("filePath", outputPath.toAbsolutePath().toString());
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Fehler beim Speichern des Bildes");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}