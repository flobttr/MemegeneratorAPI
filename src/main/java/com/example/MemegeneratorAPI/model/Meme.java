package com.example.MemegeneratorAPI.model;

/**
 * Modellklasse für ein Meme.
 * Beinhaltet Bilddaten, Spielerinformationen und den Lobby-Code.
 */

public class Meme {
    private final String imageData;
    private final String playerName;
    private final String playerId;
    private final String lobbyCode;

    //Konstruktor zum Erstellen eines Meme-Objekts

    public Meme(String imageData, String playerName, String playerId, String lobbyCode) {
        this.lobbyCode = lobbyCode;
        this.imageData = imageData;
        this.playerName = playerName;
        this.playerId = playerId;
    }

    // Getter-Methoden zum Abrufen der einzelnen Eigenschaften

    public String getImageData() {

        return imageData;
    }

    public String getPlayerName() {

        return playerName;
    }

    public String getPlayerId() {


        return playerId;
    }

    public String getLobbyCode() {
        return lobbyCode;
    }
}