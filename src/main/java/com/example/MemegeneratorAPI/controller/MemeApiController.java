package com.example.MemegeneratorAPI.controller;

import com.example.MemegeneratorAPI.model.Meme;
import com.example.MemegeneratorAPI.service.MemeSaver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST-Controller, der HTTP-Anfragen für Meme-Operationen behandelt.
 * Hier wird vor allem der Endpunkt zum Speichern eines Memes implementiert.
 */
@RestController
@RequestMapping("/api/memes")

public class MemeApiController {

    // Automatische Einbindung des MemeSaver-Service, um Memes zu speichern
    @Autowired
    private MemeSaver memeSaver;

    // Post-Endpunkt für das Speichern des Memes
    // Der Request-Body enthält ein Meme-Objekt, welches gespeichert werden soll
    @PostMapping("/save")
    public ResponseEntity<String> saveMeme(@RequestBody Meme meme) {
        System.out.println("Method saveMeme() was called .");
        try {
            // Aufruf des MemeSaver zum Speichern des Meme-Objekts
            memeSaver.saveMeme(meme);
            System.out.println("The meme was saved");
            String responseMsg = String.format(
                "Meme saved: [player=%s (%s)]",
                meme.getPlayerName(), meme.getPlayerId()
            );
            return ResponseEntity.ok(responseMsg);

        } catch(Exception e){
            // Fehlerbehandlung: Gibt den Stacktrace aus und liefert einen 500 Internal Server Error
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving the meme.");
        }
    }
}
