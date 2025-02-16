package me.huynhducphu.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Admin 2/15/2025
 **/
@RestController
public class HelloWorldController {
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World";
    }
}
