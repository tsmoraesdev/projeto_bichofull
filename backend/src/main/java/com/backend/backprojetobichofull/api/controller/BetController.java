package com.backend.backprojetobichofull.api.controller;

import com.backend.backprojetobichofull.api.dto.BetRequest;
import com.backend.backprojetobichofull.api.dto.BetResponse;
import com.backend.backprojetobichofull.api.dto.SortearApostasRequest;
import com.backend.backprojetobichofull.api.dto.SortearApostasResponse;
import com.backend.backprojetobichofull.application.usecases.ListarMinhasApostasUseCase;
import com.backend.backprojetobichofull.application.usecases.RegistrarApostaUseCase;
import com.backend.backprojetobichofull.application.usecases.RemoverApostaUseCase;
import com.backend.backprojetobichofull.application.usecases.SortearApostasUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apostas")
public class BetController {

    private final RegistrarApostaUseCase registrarApostaUseCase;
    private final ListarMinhasApostasUseCase listarMinhasApostasUseCase;
    private final SortearApostasUseCase sortearApostasUseCase;
    private final RemoverApostaUseCase removerApostaUseCase;

    public BetController(RegistrarApostaUseCase registrarApostaUseCase,
                         ListarMinhasApostasUseCase listarMinhasApostasUseCase,
                         SortearApostasUseCase sortearApostasUseCase,
                         RemoverApostaUseCase removerApostaUseCase) {
        this.registrarApostaUseCase = registrarApostaUseCase;
        this.listarMinhasApostasUseCase = listarMinhasApostasUseCase;
        this.sortearApostasUseCase = sortearApostasUseCase;
        this.removerApostaUseCase = removerApostaUseCase;
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody BetRequest dto,
                                       @org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        try {
            BetResponse response = registrarApostaUseCase.executar(dto, userDetails.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listarMinhas(
            @org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        try {
            List<BetResponse> response = listarMinhasApostasUseCase.executar(userDetails.getUsername());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/sortear")
    public ResponseEntity<?> sortear(
            @RequestBody SortearApostasRequest dto,
            @org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        try {
            SortearApostasResponse response = sortearApostasUseCase.executar(dto, userDetails.getUsername());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(
            @PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        try {
            Map<String, Object> response = removerApostaUseCase.executar(id, userDetails.getUsername());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
