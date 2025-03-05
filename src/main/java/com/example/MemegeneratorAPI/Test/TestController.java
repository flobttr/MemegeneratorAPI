package com.example.MemegeneratorAPI.Test;

import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/thymeleaf-test")
    public String testThymeleaf(Model model) {
        model.addAttribute("testMessage", "Thymeleaf funktioniert einwandfrei!");
        return "thymeleaf-test";  // Verweist auf thymeleaf-test.html
    }
}
