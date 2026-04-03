package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ResultadoApostaResponse {
    private Long id;
    private String tipo_aposta;
    private String palpite;
    private BigDecimal valor_apostado;
    private String status;
    private BigDecimal premio;
}
