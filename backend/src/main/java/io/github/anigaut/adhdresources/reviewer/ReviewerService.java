package io.github.anigaut.adhdresources.reviewer;

import io.github.anigaut.adhdresources.core.exception.HttpException;
import io.github.anigaut.adhdresources.core.security.auth.UserDetailsDTO;
import io.github.anigaut.adhdresources.core.security.jwt.JwtUtil;
import io.github.anigaut.adhdresources.core.utils.CookieUtil;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerLoginDTO;
import io.github.anigaut.adhdresources.reviewer.dto.ReviewerPasswordChangeDTO;
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
    private final ReviewerMapper reviewerMapper;
    private final PasswordEncoder passwordEncoder;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;

    @Transactional
    public void register(ReviewerRegisterDTO dto, HttpServletResponse response) {
        if (reviewerRepository.existsByEmail(dto.getEmail())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "A User With This Email Already Exists. Please Login or Register With a Different Email.");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        Reviewer reviewer = reviewerMapper.toEntity(dto);
        reviewerRepository.save(reviewer);

        String token = jwtUtil.generateToken(reviewer.getEmail(), "REVIEWER");
        cookieUtil.attachJwtCookie(response, token);
    }

    @Transactional
    public void login(ReviewerLoginDTO dto, HttpServletResponse response) {
        Reviewer reviewer = reviewerRepository.findByEmail(dto.getEmail());
        if (reviewer == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "A User With This Email ID Does Not Exist. Please Use a Different One or Create a New Account.");
        }

        if (!passwordEncoder.matches(dto.getPassword(), reviewer.getPasswordHash())) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Password. Please Try Again.");
        }

        String token = jwtUtil.generateToken(reviewer.getEmail(), "REVIEWER");
        cookieUtil.attachJwtCookie(response, token);
    }

    public void logout(HttpServletResponse response) {
        cookieUtil.clearJwtCookie(response);
    }

    public String changePassword(ReviewerPasswordChangeDTO dto, String reviewerEmail) {
        Reviewer reviewer = reviewerRepository.findByEmail(dto.getEmail());
        if (reviewer == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "User Does Not Exist");
        }

        if (!dto.getEmail().equals(reviewerEmail)) {
            throw new HttpException(HttpStatus.FORBIDDEN, "Unauthorized.");
        }

        if (!passwordEncoder.matches(dto.getOldPassword(), reviewer.getPasswordHash())) {
            throw new HttpException(HttpStatus.UNAUTHORIZED, "Invalid Password");
        }

        if (!dto.getNewPassword().equals(dto.getConfirmNewPassword())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "New Passwords Do not Match");
        }

        reviewer.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
        reviewerRepository.save(reviewer);

        return "Changed Password Successfully";
    }

    public UserDetailsDTO getCurrentReviewer(String email) {
        Reviewer reviewer = reviewerRepository.findByEmail(email);
        if (reviewer == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "A User With This Email Does Not Exist");
        }

        return reviewerMapper.toUserDetailsDTO(reviewer);
    }
}
