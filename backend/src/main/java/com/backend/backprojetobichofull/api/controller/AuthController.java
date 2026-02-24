package main.java.com.backend.backprojetobichofull.api.controller;

import com.backend.backprojetobichofull.api.dto.LoginDTO;
import com.backend.backprojetobichofull.api.dto.UserRegistrationDTO;
import com.backend.backprojetobichofull.application.usecases.LoginUseCase;
import com.backend.backprojetobichofull.application.usecases.RegisterUserUseCase;
import com.backend.backprojetobichofull.domain.model.User;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUseCase loginUseCase;

    public AuthController(RegisterUserUseCase registerUserUseCase, LoginUseCase loginUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUseCase = loginUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegistrationDTO dto) {
        User user = User.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .build();
        registerUserUseCase.execute(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário registrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO dto) {
        User user = loginUseCase.execute(dto.getEmail(), dto.getSenha());
        
        String token = jwtService.generateToken(user.getEmail());
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("nome", user.getNome());
        
        return ResponseEntity.ok(response);
    }
}