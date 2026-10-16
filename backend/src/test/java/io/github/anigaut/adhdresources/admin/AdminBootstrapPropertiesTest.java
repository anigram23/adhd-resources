package io.github.anigaut.adhdresources.admin;

import org.junit.jupiter.api.Test;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.mock.env.MockEnvironment;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AdminBootstrapPropertiesTest {

    @Test
    void bindsMultipleAccounts() {
        MockEnvironment environment = new MockEnvironment()
                .withProperty("bootstrap.admin.enabled", "true")
                .withProperty("bootstrap.admin.accounts[0].email", "root@example.com")
                .withProperty("bootstrap.admin.accounts[0].password", "pw1")
                .withProperty("bootstrap.admin.accounts[0].super", "true")
                .withProperty("bootstrap.admin.accounts[1].email", "editor@example.com")
                .withProperty("bootstrap.admin.accounts[1].password", "pw2")
                .withProperty("bootstrap.admin.accounts[1].super", "false");

        AdminBootstrapProperties properties = Binder.get(environment)
                .bind("bootstrap.admin", AdminBootstrapProperties.class)
                .get();

        assertTrue(properties.isEnabled());
        assertEquals(2, properties.getAccounts().size());
        assertEquals("root@example.com", properties.getAccounts().get(0).getEmail());
        assertTrue(properties.getAccounts().get(0).isSuper());
        assertEquals("editor@example.com", properties.getAccounts().get(1).getEmail());
        assertFalse(properties.getAccounts().get(1).isSuper());
    }

    @Test
    void bindsFromEnvironmentVariableNames() {
        Map<String, Object> variables = new HashMap<>();
        variables.put("BOOTSTRAP_ADMIN_ENABLED", "true");
        variables.put("BOOTSTRAP_ADMIN_ACCOUNTS_0_NAME", "admin-name");
        variables.put("BOOTSTRAP_ADMIN_ACCOUNTS_0_EMAIL", "me@example.com");
        variables.put("BOOTSTRAP_ADMIN_ACCOUNTS_0_PASSWORD", "some-password");
        variables.put("BOOTSTRAP_ADMIN_ACCOUNTS_0_SUPER", "true");

        MockEnvironment environment = new MockEnvironment();
        environment.getPropertySources()
                .addFirst(new SystemEnvironmentPropertySource("systemEnvironment", variables));

        AdminBootstrapProperties properties = Binder.get(environment)
                .bind("bootstrap.admin", AdminBootstrapProperties.class)
                .get();

        assertTrue(properties.isEnabled());
        assertEquals(1, properties.getAccounts().size());
        assertEquals("admin-name", properties.getAccounts().get(0).getName());
        assertEquals("me@example.com", properties.getAccounts().get(0).getEmail());
        assertEquals("some-password", properties.getAccounts().get(0).getPassword());
        assertTrue(properties.getAccounts().get(0).isSuper());
    }
}
