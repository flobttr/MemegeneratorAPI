package com.example.MemegeneratorAPI.SST;

import com.example.MemegeneratorAPI.model.Meme;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST-Controller zur Verwaltung der Dummy-Lobbies.
 * Hier wird ein Meme einer Lobby hinzugefügt.
 */

@RestController
@RequestMapping("/api/lobbyController")
public class DummyLobbyController {

    // Map, die Lobbies anhand ihres Lobby-Codes speichert
    @SuppressWarnings({"rawtypes", "unchecked"})
    private Map<String, DummyLobby> lobbies = new HashMap();

    /**
     * Endpunkt zum Hinzufügen eines Memes in eine Lobby.
     * Erstellt ggf. eine neue Lobby, wenn der Lobby-Code noch nicht vorhanden ist.
     */

    @RequestMapping("/addMeme")
    public ResponseEntity<String> addMemeToLobby(@RequestBody Meme meme) {
        System.out.println("LobbyCode: " + meme.getLobbyCode());
        try {
            // Erstellen einer neuen DummyLobby oder Überschreiben der existierenden Lobby anhand des Lobby-Codes
            lobbies.put(meme.getLobbyCode(), new DummyLobby(meme.getLobbyCode()));
            System.out.println("Meme has been saved in Lobby " + meme.getLobbyCode() + ".");
            // Hinzufügen des Meme zur Lobby
            lobbies.get(meme.getLobbyCode()).addMemeToList(meme);
            return ResponseEntity.ok("Meme saved.");

        } catch (Exception e) {
            // Fehlerbehandlung: Ausgabe des Fehlers und Rückgabe eines 500-Status
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while saving the meme");
        }
    }

}
