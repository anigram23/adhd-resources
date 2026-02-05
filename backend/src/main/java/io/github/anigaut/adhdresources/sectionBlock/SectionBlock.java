package io.github.anigaut.adhdresources.sectionBlock;

import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "section_block")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SectionBlock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "static_page_section_id", nullable = false)
    private StaticPageSection staticPageSection;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "order_index")
    private int orderIndex;
}
