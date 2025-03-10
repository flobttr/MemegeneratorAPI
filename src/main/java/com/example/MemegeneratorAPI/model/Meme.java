package com.example.MemegeneratorAPI.model;

public class Meme {

    private String id;      // jetzt als String
    private String title;   // neuer Titel, z. B. "Meme von Player <id>"
    private String imageData;
    private String playerName;
    private String playerId;

    // Konstruktoren
    public Meme() {}

    public Meme(String id, String title, String imageData, String playerName, String playerId) {
        this.id = id;
        this.title = title;
        this.imageData = imageData;
        this.playerName = playerName;
        this.playerId = playerId;
    }

    // Getter/Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }
}
