package com.repaso.farmacia.service;

import com.repaso.farmacia.dto.MedicamentoCategoriaDTO;
import com.repaso.farmacia.dto.MedicamentoDTO;
import com.repaso.farmacia.entity.Medicamento;
import com.repaso.farmacia.repository.MedicamentoRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;

    public MedicamentoService(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }

    private MedicamentoDTO aDTO(Medicamento m) {
        return new MedicamentoDTO(m.getNombre(), m.getLaboratorio(), m.getPrecio(), m.getStock());
    }

    public List<MedicamentoDTO> mostrarActivosFiltro(String nombre) {
        return medicamentoRepository.findByEstadoTrueAndNombreContainingIgnoreCase(nombre)
                .stream().map(this::aDTO).toList();
    }

    public List<MedicamentoCategoriaDTO> reporteMedicamentoCategoria() {
        return medicamentoRepository.reporteMedicamentoCategoria();
    }

    public List<MedicamentoDTO> stockBajo(Integer cantidad) {
        return medicamentoRepository.findByEstadoTrueAndStockLessThanOrderByStockAsc(cantidad)
                .stream().map(this::aDTO).toList();
    }
}
