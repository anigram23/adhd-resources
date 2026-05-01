package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionBlockRepository extends JpaRepository<SectionBlock, Integer> {
     boolean existsByOrderIndexAndStaticPageSection(int orderIndex, StaticPageSection staticPageSection);
}
