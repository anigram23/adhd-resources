package io.github.anigaut.adhdresources.staticPage;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaticPageRepository extends JpaRepository<StaticPage, Integer> {
    boolean existsBySlug(String slug);

    List<StaticPage> findAllByOrderByCreatedAtAsc();

    @EntityGraph(value = "StaticPage.withSectionsAndBlocks")
    Optional<StaticPage> findWithSectionsAndBlocksBySlug(String slug);
}
