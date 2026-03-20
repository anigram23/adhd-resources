package io.github.anigaut.adhdresources.core.security.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException
    {
        String token = extractTokenFromCookie(request);
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        authorities
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (JwtException e) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("jwt"))
                .findFirst()
                .map(cookie -> cookie.getValue())
                .orElse(null);
    }
}
