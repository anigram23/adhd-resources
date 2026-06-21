package io.github.anigaut.adhdresources.ticketType;

import io.github.anigaut.adhdresources.ticket.Ticket;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "ticket_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "title", unique = true)
    private String title;

    @OneToMany(mappedBy = "ticketType", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets;
}
