package io.github.anigaut.adhdresources.professionalType;

import io.github.anigaut.adhdresources.professional.Professional;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "professional_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "title", unique = true)
    private String title;

    @NotNull
    @Column(name = "is_doctor")
    private boolean isDoctor;

    @NotNull
    @Column(name = "can_diagnose")
    private boolean canDiagnose;

    @NotNull
    @Column(name = "can_prescribe_meds")
    private boolean canPrescribeMeds;

    @OneToMany(mappedBy = "professionalType", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Professional> professionals;
}
