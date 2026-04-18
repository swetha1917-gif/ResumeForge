package com.snist.Resume.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.snist.Resume.model.Resume;
import com.snist.Resume.repository.ResumeRepository;

@RestController
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeRepository repo;

    @PostMapping("/save")
    public Resume saveResume(@RequestBody Resume resume) {
        return repo.save(resume);
    }
}