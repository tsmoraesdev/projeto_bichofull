package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class HistoricoResumoResponse {
    private BigDecimal total_ganhos;
    private BigDecimal total_perdas;
    private long apostas_premiadas;
    private long apostas_perdidas;
}