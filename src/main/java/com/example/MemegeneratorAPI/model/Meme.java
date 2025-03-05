package com.example.MemegeneratorAPI.model;

public class Meme {
    private String fileName;
    private String imagePath;

    public Meme(String fileName, String imagePath) {
        this.fileName = fileName;
        this.imagePath = imagePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}

