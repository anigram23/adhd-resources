package io.github.anigaut.adhdresources.staticPage;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StaticPageRepository extends JpaRepository<StaticPage, UUID> {
    boolean existsBySlug(String slug);

    List<StaticPage> findAllByOrderByCreatedAtAsc();

    @EntityGraph(value = "StaticPage.withSections")
    Optional<StaticPage> findWithSectionsBySlug(String slug);
}
