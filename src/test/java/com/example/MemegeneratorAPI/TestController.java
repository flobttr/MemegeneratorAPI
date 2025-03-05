package com.example.MemegeneratorAPI;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/thymeleaf-test")
    public String testThymeleaf(Model model) {
        model.addAttribute("message", "Thymeleaf funktioniert!");
        return "thymeleaf-test";  // Verweist auf thymeleaf-test.html
    }
}