package com.repaso.farmacia.controller;

import com.repaso.farmacia.dto.MedicamentoCategoriaDTO;
import com.repaso.farmacia.dto.MedicamentoDTO;
import com.repaso.farmacia.service.MedicamentoService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medicamentos")
@CrossOrigin(origins = "*")
public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    public MedicamentoController(MedicamentoService medicamentoService) {
        this.medicamentoService = medicamentoService;
    }

    @GetMapping("/mostrarActivosFiltro")
    public List<MedicamentoDTO> mostrarActivosFiltro(@RequestParam String nombre) {
        return medicamentoService.mostrarActivosFiltro(nombre);
    }

    @GetMapping("/reporteMedicamentoCategoria")
    public List<MedicamentoCategoriaDTO> reporteMedicamentoCategoria() {
        return medicamentoService.reporteMedicamentoCategoria();
    }

    @GetMapping("/stockBajo")
    public List<MedicamentoDTO> stockBajo(@RequestParam Integer cantidad) {
        return medicamentoService.stockBajo(cantidad);
    }
}
