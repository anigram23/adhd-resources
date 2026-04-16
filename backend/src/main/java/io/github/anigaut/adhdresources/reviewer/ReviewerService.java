package io.github.anigaut.adhdresources.reviewer;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.core.security.jwt.JwtUtil;
import io.github.anigaut.adhdresources.core.utils.CookieUtil;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerLoginDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerRegisterDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewerService {
    private final ReviewerRepository reviewerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;

    @Transactional
    public void register(ReviewerRegisterDTO dto, HttpServletResponse response) {
        if (reviewerRepository.existsByEmail(dto.getEmail())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "A user with this email already exists");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        Reviewer reviewer = new Reviewer();
        reviewer.setEmail(dto.getEmail());
        reviewer.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        reviewerRepository.save(reviewer);

        String token = jwtUtil.generateToken(reviewer.getEmail(), "REVIEWER");
        cookieUtil.attachJwtCookie(response, token);
    }

    @Transactional
    public void login(ReviewerLoginDTO dto, HttpServletResponse response) {
        Reviewer reviewer = reviewerRepository.findByEmail(dto.getEmail());
        if (reviewer == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "A user with this does not exist");
        }

        if (!passwordEncoder.matches(dto.getPassword(), reviewer.getPasswordHash())) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        String token = jwtUtil.generateToken(reviewer.getEmail(), "REVIEWER");
        cookieUtil.attachJwtCookie(response, token);
    }

    public void logout(HttpServletResponse response) {
        cookieUtil.clearJwtCookie(response);
    }

    public UserDetailsDTO getCurrentReviewer(String email) {
        Reviewer reviewer = reviewerRepository.findByEmail(email);
        if (reviewer == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "A user with this email does not exist");
        }

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setId(reviewer.getId());
        userDetailsDTO.setEmail(reviewer.getEmail());
        userDetailsDTO.setRole("REVIEWER");

        return userDetailsDTO;
    }
}
