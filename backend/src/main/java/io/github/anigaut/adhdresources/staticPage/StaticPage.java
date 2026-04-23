package io.github.anigaut.adhdresources.staticPage;

import io.github.anigaut.adhdresources.staticPageSection.StaticPageSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "static_page")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@NamedEntityGraph(name = "StaticPage.withSections", attributeNodes = @NamedAttributeNode("sections"))
public class StaticPage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "slug", unique = true)
    private String slug;

    @NotNull
    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "staticPage", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StaticPageSection> sections;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
