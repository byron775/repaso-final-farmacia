package com.repaso.farmacia.dto;

import java.math.BigDecimal;

public class MedicamentoDTO {

    private String nombre;
    private String laboratorio;
    private BigDecimal precio;
    private Integer stock;

    public MedicamentoDTO() {
    }

    // El ORDEN de los parámetros debe ser igual al del SELECT new ... del @Query
    public MedicamentoDTO(String nombre, String laboratorio, BigDecimal precio, Integer stock) {
        this.nombre = nombre;
        this.laboratorio = laboratorio;
        this.precio = precio;
        this.stock = stock;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLaboratorio() {
        return laboratorio;
    }

    public void setLaboratorio(String laboratorio) {
        this.laboratorio = laboratorio;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
