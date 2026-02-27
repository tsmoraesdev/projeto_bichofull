package com.backend.backprojetobichofull.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationDTO {
    private String nome;
    private String email;
    private String senha;
}