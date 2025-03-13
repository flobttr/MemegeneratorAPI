package com.example.MemegeneratorAPI.service;

import org.springframework.stereotype.Service;
import java.io.File;
import java.util.Random;

/**
 * Service-Klasse, die für die Auswahl eines zufälligen Meme-Templates zuständig ist.
 */

@Service

public class MemeService {

    // Pfad zum Ordner, in dem die Meme-Templates gespeichert sind
    private static final String IMAGE_FOLDER = "src/main/resources/static/memeTemplates";

/**
 * Wählt zufällig ein Bild (Meme-Template) aus dem IMAGE_FOLDER aus.
 */

    public String getRandomMeme() {
        //Erzeugen eines File-Objekts für den Bildordner
        File folder = new File(IMAGE_FOLDER);
        // Filtern der Dateien, die mit .jpg oder .png enden
        File[] files = folder.listFiles((dir, name) -> name.endsWith(".jpg") || name.endsWith(".png"));

        // Überprüfe, ob Dateien vorhanden sind
        if (files != null && files.length > 0) {
            int randomIndex = new Random().nextInt(files.length);
            //Rückgabe des Pfades des zufälligen ausgewählten Bildes (angepasst für Thymeleaf
            return "/memeTemplates/" + files[randomIndex].getName();
        }

        return "No Memes found";
    }
}