package com.backend.backprojetobichofull.api.dto;

import lombok.Data;

@Data
public class UserRegistrationDTO {

    private String nome;
    private String email;
    private String senha;
}