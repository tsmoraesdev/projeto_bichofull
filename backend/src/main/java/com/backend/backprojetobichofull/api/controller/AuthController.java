package main.java.com.backend.backprojetobichofull.api.controller;

import com.backend.backprojetobichofull.api.dto.UserRegistrationDTO;
import com.backend.backprojetobichofull.application.usecases.RegisterUserUseCase;
import com.backend.backprojetobichofull.domain.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;

    public AuthController(RegisterUserUseCase registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegistrationDTO dto) {
        // Converte DTO para Entidade de Domínio
        User user = User.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .build();

        registerUserUseCase.execute(user);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário registrado com sucesso!");
    }
}