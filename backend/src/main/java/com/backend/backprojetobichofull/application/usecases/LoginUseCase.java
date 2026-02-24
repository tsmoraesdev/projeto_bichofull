package main.java.com.backend.backprojetobichofull.application.usecases;

import com.backend.backprojetobichofull.domain.model.User;
import com.backend.backprojetobichofull.infrastructure.persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User execute(String email, String password) {
        // RF02 - Autenticação
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuário ou senha inválidos.");
        }

        User user = userOptional.get();

        // RNF03 - Verifica se a senha enviada bate com o Hash do banco
        if (!passwordEncoder.matches(password, user.getSenha())) {
            throw new RuntimeException("Usuário ou senha inválidos.");
        }

        return user;
    }
}