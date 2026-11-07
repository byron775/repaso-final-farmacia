package com.repaso.farmacia.dto;

import java.math.BigDecimal;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class ClienteVentaDTO {

    private String nombreCliente;
    private String apellidoCliente;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "America/Guatemala")
    private Date fechaVenta;
    private BigDecimal total;

    public ClienteVentaDTO() {
    }

    // El ORDEN de los parámetros debe ser igual al del SELECT new ... del @Query
    public ClienteVentaDTO(String nombreCliente, String apellidoCliente, Date fechaVenta, BigDecimal total) {
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        this.fechaVenta = fechaVenta;
        this.total = total;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidoCliente() {
        return apellidoCliente;
    }

    public void setApellidoCliente(String apellidoCliente) {
        this.apellidoCliente = apellidoCliente;
    }

    public Date getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(Date fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
