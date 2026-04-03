package com.backend.backprojetobichofull.infrastructure.persistence;

import com.backend.backprojetobichofull.domain.model.Draw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrawRepository extends JpaRepository<Draw, Long> {
    List<Draw> findAllByOrderByDataSorteioDesc();
}