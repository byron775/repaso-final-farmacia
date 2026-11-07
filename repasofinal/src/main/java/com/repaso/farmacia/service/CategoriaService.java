package com.repaso.farmacia.service;

import com.repaso.farmacia.dto.CategoriaDTO;
import com.repaso.farmacia.repository.CategoriaRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaDTO> mostrarActivos() {
        return categoriaRepository.findByEstadoTrue().stream()
                .map(c -> new CategoriaDTO(c.getNombre(), c.getDescripcion()))
                .toList();
    }
}
