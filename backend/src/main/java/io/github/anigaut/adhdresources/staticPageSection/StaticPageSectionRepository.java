package io.github.anigaut.adhdresources.staticPageSection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaticPageSectionRepository extends JpaRepository<StaticPageSection, Integer> {
    boolean existsByTitle(String title);
    boolean existsByOrderIndex(int orderIndex);
    List<StaticPageSection> findAllByStaticPageId(int staticPageId);
}
