package com.backend.backprojetobichofull.api.controller;

import com.backend.backprojetobichofull.api.dto.HistoricoResponse;
import com.backend.backprojetobichofull.application.usecases.ConsultarHistoricoUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/historico")
public class HistoryController {

    private final ConsultarHistoricoUseCase consultarHistoricoUseCase;

    public HistoryController(ConsultarHistoricoUseCase consultarHistoricoUseCase) {
        this.consultarHistoricoUseCase = consultarHistoricoUseCase;
    }

    @GetMapping
    public ResponseEntity<?> consultar(
            @org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        try {
            HistoricoResponse response = consultarHistoricoUseCase.executar(userDetails.getUsername());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}