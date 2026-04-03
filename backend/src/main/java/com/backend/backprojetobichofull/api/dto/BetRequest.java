package com.backend.backprojetobichofull.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BetRequest {
    private String tipo_aposta;
    private String palpite;
    private BigDecimal valor_apostado;
}