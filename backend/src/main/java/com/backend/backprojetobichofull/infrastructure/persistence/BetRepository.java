package com.backend.backprojetobichofull.infrastructure.persistence;

import com.backend.backprojetobichofull.domain.model.Bet;
import com.backend.backprojetobichofull.domain.model.StatusAposta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BetRepository extends JpaRepository<Bet, Long> {
    List<Bet> findByUserIdOrderByDataApostaDesc(Long userId);
    List<Bet> findByUserIdAndStatusOrderByDataApostaDesc(Long userId, StatusAposta status);
    List<Bet> findByIdInAndUserId(List<Long> ids, Long userId);
    Optional<Bet> findByIdAndUserId(Long id, Long userId);

    long countByUserIdAndStatus(Long userId, StatusAposta status);
}
