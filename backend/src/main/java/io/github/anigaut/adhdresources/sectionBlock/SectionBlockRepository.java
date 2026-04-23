package io.github.anigaut.adhdresources.sectionBlock;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionBlockRepository extends JpaRepository<SectionBlock, Integer> {
     boolean existsByOrderIndex(int orderIndex);
}
