package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.staticPage.StaticPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StaticPageSectionRepository extends JpaRepository<StaticPageSection, Integer> {
    boolean existsByTitle(String title);
    boolean existsByOrderIndexAndStaticPage(int orderIndex, StaticPage staticPage);
    List<StaticPageSection> findAllByStaticPageId(UUID staticPageId);
}
