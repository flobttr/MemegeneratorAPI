package com.example.MemegeneratorAPI.SST;

import com.example.MemegeneratorAPI.model.Meme;

import java.util.ArrayList;
import java.util.List;

/**
 * Dummy-Implementierung einer Lobby, um Memes zu sammeln.
 * Diese Klasse dient als Platzhalter und speichert Meme-Objekte in einer Liste.
 */

public class DummyLobby {
    // Eindeutiger Code der Lobby
    private final String lobbyCode;

    //Liste zum Speichern der Meme-Objekte
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private List<Meme> memes = new ArrayList();

/**
 * Konstruktor, der eine neue Lobby mit dem gegebenen Code erstellt.
 */

    public DummyLobby(String lobbyCode){
        this.lobbyCode = lobbyCode;
    }

/**
 * Gibt den Lobby-Code zurück.
 */
    public String getLobbyCode(){
        return lobbyCode;
    }

/**
 * Fügt ein Meme zur internen Liste hinzu.
 */
    public void addMemeToList(Meme meme){
        memes.add(meme);
        // Ausgabe des Spielernamens des ersten Memes in der Liste
        System.out.println(memes.getFirst().getPlayerName());
    }
}
