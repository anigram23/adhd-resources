package io.github.anigaut.adhdresources.admin;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    boolean existsByEmail(String email);
    Admin findByEmail(String email);
}
