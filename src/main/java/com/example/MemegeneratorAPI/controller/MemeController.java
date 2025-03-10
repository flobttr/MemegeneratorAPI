package com.example.MemegeneratorAPI.controller;

import com.example.MemegeneratorAPI.service.MemeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
//@RequestMapping("/")

public class MemeController {
    private final MemeService memeService;


    public MemeController(MemeService memeService){
        this.memeService = memeService;
    }

    @GetMapping("/")

    public String showMeme(Model model){
        String memePath = memeService.getRandomMeme();
        model.addAttribute("memePath", memePath);
        return "meme";
    }

}
