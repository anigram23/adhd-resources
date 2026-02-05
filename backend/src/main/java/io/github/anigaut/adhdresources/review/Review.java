package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.professional.Professional;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "review")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id", nullable = false)
    private Professional professional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private Reviewer reviewer;

    @NotNull
    @Column(name = "does_online_consultations")
    private Boolean doesOnlineConsultations;

    @NotNull
    @Column(name = "contact_number", length = 10)
    private String contactNumber;

    @NotNull
    @Column(name = "address")
    private String address;

    @NotNull
    @Column(name = "consultation_fee")
    private int consultationFee;

    @Column(name = "diagnosis_fee")
    private Integer diagnosisFee;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "rating")
    private Short rating;
}
