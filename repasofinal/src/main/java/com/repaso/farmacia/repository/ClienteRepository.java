package com.repaso.farmacia.repository;

import com.repaso.farmacia.dto.ClienteVentaDTO;
import com.repaso.farmacia.dto.ClienteVentaDetalleDTO;
import com.repaso.farmacia.entity.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // Endpoint 5: Venta -> Cliente
    @Query("SELECT new com.repaso.farmacia.dto.ClienteVentaDTO("
         + "c.nombre, c.apellido, v.fechaVenta, v.total) "
         + "FROM Venta v JOIN v.idCliente c "
         + "WHERE v.estado = true "
         + "ORDER BY v.fechaVenta")
    List<ClienteVentaDTO> reporteClienteVenta();

    // Endpoint 6: VentaDetalle -> Venta -> Cliente, y VentaDetalle -> Medicamento
    @Query("SELECT new com.repaso.farmacia.dto.ClienteVentaDetalleDTO("
         + "c.nombre, c.apellido, v.fechaVenta, m.nombre, "
         + "d.cantidad, d.precioUnitario, d.subtotal) "
         + "FROM VentaDetalle d "
         + "JOIN d.idVenta v "
         + "JOIN v.idCliente c "
         + "JOIN d.idMedicamento m "
         + "WHERE v.estado = true "
         + "ORDER BY v.fechaVenta")
    List<ClienteVentaDetalleDTO> reporteClienteVentaDetalle();
}
