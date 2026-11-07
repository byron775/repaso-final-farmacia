package com.repaso.farmacia.controller;

import com.repaso.farmacia.dto.ClienteVentaDTO;
import com.repaso.farmacia.dto.ClienteVentaDetalleDTO;
import com.repaso.farmacia.service.ClienteService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/reporteClienteVenta")
    public List<ClienteVentaDTO> reporteClienteVenta() {
        return clienteService.reporteClienteVenta();
    }

    @GetMapping("/reporteClienteVentaDetalle")
    public List<ClienteVentaDetalleDTO> reporteClienteVentaDetalle() {
        return clienteService.reporteClienteVentaDetalle();
    }
}
