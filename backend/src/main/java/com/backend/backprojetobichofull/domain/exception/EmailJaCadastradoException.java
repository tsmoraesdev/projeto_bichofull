package com.backend.backprojetobichofull.domain.exception;

public class EmailJaCadastradoException extends RuntimeException {

    public EmailJaCadastradoException() {
        super("E-mail já cadastrado");
    }

    public EmailJaCadastradoException(String message) {
        super(message);
    }
}