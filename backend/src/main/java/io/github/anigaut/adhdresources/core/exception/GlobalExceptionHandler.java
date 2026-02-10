package io.github.anigaut.adhdresources.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpException.class)
    public ResponseEntity<ErrorResponse> handleHttpException(HttpException ex, WebRequest req) {
        String path = req.getDescription(false).replace("uri=", "");

        ErrorResponse errorResponse = new ErrorResponse(
                ex.getStatus().value(),
                ex.getMessage(),
                LocalDateTime.now(),
                path
        );

        return new ResponseEntity<>(errorResponse, ex.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleFormValidationException(MethodArgumentNotValidException ex, WebRequest req) {
        String path = req.getDescription(false).replace("uri=", "");

        List<FormValidationError> validationErrors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            FormValidationError error = new FormValidationError(fieldError.getField(), fieldError.getDefaultMessage());
            validationErrors.add(error);
        });

        ErrorResponse errorResponse = new ErrorResponse(
                400,
                "Validation failed for one or more fields.",
                LocalDateTime.now(),
                path,
                validationErrors
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, WebRequest req) {
        String path = req.getDescription(false).replace("uri=", "");

        ErrorResponse errorResponse = new ErrorResponse(
                500,
                "Something went wrong: " + ex.getMessage(),
                LocalDateTime.now(),
                path
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
