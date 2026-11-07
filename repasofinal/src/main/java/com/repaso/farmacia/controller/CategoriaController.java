package com.repaso.farmacia.controller;

import com.repaso.farmacia.dto.CategoriaDTO;
import com.repaso.farmacia.service.CategoriaService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("/mostrarActivos")
    public List<CategoriaDTO> mostrarActivos() {
        return categoriaService.mostrarActivos();
    }
}
