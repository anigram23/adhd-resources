package io.github.anigaut.adhdresources.core.security;

import io.github.anigaut.adhdresources.core.security.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .formLogin(AbstractHttpConfigurer::disable)
            .logout(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/admin/**").permitAll()

                    .requestMatchers(HttpMethod.PATCH, "/reviewer/**").hasRole("REVIEWER")
                    .requestMatchers(HttpMethod.DELETE, "/reviewer/**").authenticated()
                    .requestMatchers("/reviewer/**").permitAll()

                    .requestMatchers("/city/**").permitAll()

                    .requestMatchers("/state/**").permitAll()

                    .requestMatchers("/me").permitAll()

                    .requestMatchers(HttpMethod.GET, "/professional/**").permitAll()

                    .requestMatchers(HttpMethod.GET, "/professional-type/**").permitAll()
                    .requestMatchers("/professional-type/**").hasRole("ADMIN")

                    .requestMatchers(HttpMethod.GET, "/ticket-type/**").permitAll()
                    .requestMatchers("/ticket-type/**").hasRole("ADMIN")

                    .requestMatchers(HttpMethod.GET, "/ticket/**").authenticated()
                    .requestMatchers(HttpMethod.POST, "/ticket/**").hasRole("REVIEWER")
                    .requestMatchers(HttpMethod.PATCH, "/ticket/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/ticket/**").authenticated()

                    .requestMatchers(HttpMethod.GET, "/review/reviews-for-admin").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.POST, "/review").hasRole("REVIEWER")
                    .requestMatchers(HttpMethod.PATCH, "/review/**").hasRole("REVIEWER")
                    .requestMatchers(HttpMethod.DELETE, "/review/**").authenticated()

                    .requestMatchers(HttpMethod.GET, "/static-page/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/static-page").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PATCH, "/static-page/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/static-page/**").hasRole("ADMIN")

                    .requestMatchers(HttpMethod.GET, "/static-page-section/**").permitAll()
                    .requestMatchers(HttpMethod.POST, "/static-page-section").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PATCH, "/static-page-section/**").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "/static-page-section/**").hasRole("ADMIN")

                    .requestMatchers("/section-block/**").hasRole("ADMIN")
                    .anyRequest().permitAll()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
