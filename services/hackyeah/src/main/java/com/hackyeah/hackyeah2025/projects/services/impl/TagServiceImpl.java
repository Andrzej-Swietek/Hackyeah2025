package com.hackyeah.hackyeah2025.projects.services.impl;

import com.hackyeah.hackyeah2025.projects.entities.Tag;
import com.hackyeah.hackyeah2025.projects.repositories.TagRepository;
import com.hackyeah.hackyeah2025.projects.services.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> findAll(String query) {
        if (!query.isEmpty())
            return tagRepository.findAllMatching(query);
        else
            return tagRepository.findAll();
    }

    @Override
    public Tag createTag(String name) {
        return tagRepository.save(
                Tag.builder()
                        .name(name)
                        .build()
        );
    }

    @Override
    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
