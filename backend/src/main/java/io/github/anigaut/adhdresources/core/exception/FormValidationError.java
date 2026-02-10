package io.github.anigaut.adhdresources.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FormValidationError {
    public String field;
    public String message;
}
