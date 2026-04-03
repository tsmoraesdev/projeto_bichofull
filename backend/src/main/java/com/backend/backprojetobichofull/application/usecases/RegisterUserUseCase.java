package com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.api.dto.UserRegistrationDTO;
import com.backend.backprojetobichofull.domain.exception.EmailJaCadastradoException;
import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import com.backend.backprojetobichofull.api.dto.UserRegistrationDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class RegisterUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void execute(UserRegistrationDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailJaCadastradoException();
        }

        User user = User.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(passwordEncoder.encode(dto.getSenha()))
                .saldo(new BigDecimal("1000.00"))
                .build();

        userRepository.save(user);
    }
}