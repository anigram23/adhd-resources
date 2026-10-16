package io.github.anigaut.adhdresources.staticPageSection;

import io.github.anigaut.adhdresources.staticPage.StaticPage;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "static_page_section")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaticPageSection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "static_page_id", nullable = false)
    private StaticPage staticPage;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "content", columnDefinition = "TEXT")
    private String content = "";

    @NotNull
    @Column(name = "order_index")
    private int orderIndex;
}
