package main.java.com.backend.backprojetobichofull.infrastructure.persistence;

import com.backend.backprojetobichofull.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Necessário para o RF02 (Login)
    Optional<User> findByEmail(String email);
    
    // Verifica se o email já existe no RF01 (Cadastro)
    boolean existsByEmail(String email);
}