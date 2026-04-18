package io.github.anigaut.adhdresources.staticPage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StaticPageRepository extends JpaRepository<StaticPage, Integer> {
    boolean existsBySlug(String slug);
}
