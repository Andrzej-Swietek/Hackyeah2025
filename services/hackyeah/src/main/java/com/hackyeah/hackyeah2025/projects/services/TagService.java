package com.hackyeah.hackyeah2025.projects.services;

import com.hackyeah.hackyeah2025.projects.entities.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {
    List<Tag> findAll(String query);
    Optional<Tag> getTagById(Long id);
    Tag createTag(String name);
    void deleteTag(Long id);
}
