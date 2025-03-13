package com.example.MemegeneratorAPI.controller;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import com.example.MemegeneratorAPI.model.Meme;

/**
 * Service zum Speichern eines Memes, welcher intern einen REST-Aufruf an einen anderen Endpunkt
 * (hier: DummyLobbyController) durchführt.
 */

@Service
public class MemeSaver {

    // RestTemplate zum Durchführen von HTTP-Anfragen
    private final RestTemplate restTemplate;

/**
 * Konstruktor, der ein RestTemplate über den RestTemplateBuilder erstellt.
 */
    public MemeSaver(RestTemplateBuilder restTemplateBuilder) {

        this.restTemplate = restTemplateBuilder.build();
    }

/**
 * Endpunkt zum Speichern des Memes.
 * Führt einen HTTP POST-Request an den Lobby-Endpunkt aus, um das Meme weiterzuleiten.
 */
    @PostMapping("/saveMeme")
    public void saveMeme(@RequestBody Meme meme) {

        // URL des Lobby-Controllers, an den das Meme gesendet wird
        String lobbyUrl = "http://localhost:8080/api/lobbyController/addMeme";

        try {
            // Senden des Meme-Objekts per POST und Überprüfung des Antwortcodes
            ResponseEntity<String> response = restTemplate.postForEntity(lobbyUrl, meme, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Meme sent to lobby.");
            } else {
                System.err.println("Error during transmitting the meme " + response.getBody());
            }
        } catch (Exception e) {
            // Fehlerbehandlung: Ausgabe der Fehlermeldung
            System.err.println("Error " + e.getMessage());
        }
    }
}