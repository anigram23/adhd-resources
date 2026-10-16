package io.github.anigaut.adhdresources.admin;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "bootstrap.admin")
public class AdminBootstrapProperties {

    private boolean enabled = false;
    private List<Account> accounts = new ArrayList<>();

    @Getter
    @Setter
    public static class Account {
        private String name;
        private String email;
        private String password;
        private boolean isSuper = true;
    }
}
