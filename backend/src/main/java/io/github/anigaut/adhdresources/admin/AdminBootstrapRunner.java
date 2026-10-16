package io.github.anigaut.adhdresources.admin;

import io.github.anigaut.adhdresources.admin.AdminBootstrapProperties.Account;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminBootstrapRunner implements ApplicationRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminBootstrapProperties properties;

    @Override
    public void run(ApplicationArguments args) {
        if (!properties.isEnabled()) {
            log.debug("Admin bootstrap disabled");
            return;
        }

        List<Account> accounts = properties.getAccounts();
        if (accounts == null || accounts.isEmpty()) {
            throw new IllegalStateException("BOOTSTRAP_ADMIN_ENABLED=true but no bootstrap.admin.accounts.* were configured");
        }

        accounts.forEach(this::bootstrap);
    }

    private void bootstrap(Account account) {
        String email = account.getEmail();
        if (email == null || email.isBlank()) {
            throw new IllegalStateException("BOOTSTRAP_ADMIN_ACCOUNTS_*_EMAIL must be set for every configured account");
        }

        String password = account.getPassword();
        if (password == null || password.isBlank()) {
            throw new IllegalStateException("BOOTSTRAP_ADMIN_ACCOUNTS_*_PASSWORD must be set for every configured account");
        }

        if (adminRepository.existsByEmail(email)) {
            log.info("Admin with email {} already exists, skipping bootstrap", email);
            return;
        }

        Admin admin = new Admin();
        admin.setName(resolveName(account));
        admin.setEmail(email);
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setSuper(account.isSuper());
        adminRepository.save(admin);

        log.info("Bootstrapped admin {}", email);
    }

    private String resolveName(Account account) {
        String name = account.getName();
        if (name != null && !name.isBlank()) {
            return name;
        }

        String email = account.getEmail();
        int at = email.indexOf('@');
        return at > 0 ? email.substring(0, at) : email;
    }
}
