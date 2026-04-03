package com.backend.backprojetobichofull.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class HistoricoSorteioResponse {
    private Long id;
    private LocalDateTime data_sorteio;
    private List<String> premios;
}