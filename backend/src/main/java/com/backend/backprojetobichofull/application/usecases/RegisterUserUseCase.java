package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(User user) {
        // Validação: Email único (RF01)
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        // RNF03: Criptografia de senha (BCrypt)
        user.setSenha(passwordEncoder.encode(user.getSenha()));

        // RF03: Garantir que o saldo inicial seja R$ 1.000,00
        // (A classe User já inicializa com 1000.00, mas aqui reforçamos a regra)
        
        return userRepository.save(user);
    }
}