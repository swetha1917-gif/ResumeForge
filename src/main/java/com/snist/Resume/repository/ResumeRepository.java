package com.snist.Resume.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.snist.Resume.model.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}