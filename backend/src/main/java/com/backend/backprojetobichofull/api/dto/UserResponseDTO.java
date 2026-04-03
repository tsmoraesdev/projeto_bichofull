package com.backend.backprojetobichofull.api.dto;

import java.math.BigDecimal;

public record UserResponseDTO(
        Long id,
        String nome,
        String email,
        BigDecimal saldo
) {}
