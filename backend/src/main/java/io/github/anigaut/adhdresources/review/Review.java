package io.github.anigaut.adhdresources.review;

import io.github.anigaut.adhdresources.professional.Professional;
import io.github.anigaut.adhdresources.reviewer.Reviewer;
import io.github.anigaut.adhdresources.ticket.Ticket;
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
    @JoinColumn(name = "reviewer_id")
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
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @NotNull
    @Column(name = "rating")
    private float rating;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
