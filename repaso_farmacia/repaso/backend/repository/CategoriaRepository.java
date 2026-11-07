package com.repaso.farmacia.repository;

import com.repaso.farmacia.entity.Categoria;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    // Endpoint 1: consulta derivada
    List<Categoria> findByEstadoTrue();
}
