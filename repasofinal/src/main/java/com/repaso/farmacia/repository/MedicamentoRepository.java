package com.repaso.farmacia.repository;

import com.repaso.farmacia.dto.MedicamentoCategoriaDTO;
import com.repaso.farmacia.entity.Medicamento;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Integer> {

    // Endpoint 2: activos + nombre contiene (sin importar mayúsculas)
    List<Medicamento> findByEstadoTrueAndNombreContainingIgnoreCase(String nombre);

    // Endpoint 3: JOIN a categoría con DTO
    @Query("SELECT new com.repaso.farmacia.dto.MedicamentoCategoriaDTO("
         + "m.nombre, m.laboratorio, c.nombre, m.precio, m.stock) "
         + "FROM Medicamento m JOIN m.idCategoria c "
         + "WHERE m.estado = true "
         + "ORDER BY c.nombre, m.nombre")
    List<MedicamentoCategoriaDTO> reporteMedicamentoCategoria();

    // Endpoint 4: activos con stock menor a cantidad, del menor al mayor
    List<Medicamento> findByEstadoTrueAndStockLessThanOrderByStockAsc(Integer cantidad);
}
