package io.github.anigaut.adhdresources.core.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class HttpException extends RuntimeException {
    private final HttpStatus status;
    // Name of the request field this error belongs to, so the frontend can show it under that input. Null if not field-specific.
    private final String field;

    public HttpException(HttpStatus status, String message) {
        this(status, null, message);
    }

    public HttpException(HttpStatus status, String field, String message) {
        super(message);
        this.status = status;
        this.field = field;
    }
}
