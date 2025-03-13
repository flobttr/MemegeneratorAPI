
package com.example.MemegeneratorAPI.controller;

import com.example.MemegeneratorAPI.service.MemeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

/**
 * MVC-Controller, der für das Anzeigen von Memes in der Weboberfläche zuständig ist.
 */

@Controller


public class MemeController {

    // Service, der die Logik zum Auswählen eines zufälligen Memes kapselt.
    private final MemeService memeService;


    // Konstruktor-Injektion des MemeService
    public MemeController(MemeService memeService){
        this.memeService = memeService;
        System.out.println("MemeController has been instaled.");
    }

/**
 * GET-Endpunkt für die Startseite.
 * Hier wird ein zufälliger Meme-Pfad ermittelt und an das View (Thymeleaf Template) übergeben.
 */
    @GetMapping("/")
    public String showMeme(Model model){

        // Ermitteln eines zufälligen Meme-Pfads über den MemeService
        System.out.println("showMeme() was called.");
        String memePath = memeService.getRandomMeme();

        // Hinzufügen des Meme-Pfads zum Model, damit dieser im Template verwendet werden kann
        System.out.println("Randomly selected meme pat " + memePath);
        model.addAttribute("memePath", memePath);
        return "meme";
    }

}
