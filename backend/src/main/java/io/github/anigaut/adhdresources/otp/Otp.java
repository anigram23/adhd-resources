package io.github.anigaut.adhdresources.otp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Otp {
    @Id
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "code_hash")
    private String codeHash;

    @NotNull
    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @NotNull
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
