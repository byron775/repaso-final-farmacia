package com.repaso.farmacia.dto;

import java.math.BigDecimal;

public class MedicamentoCategoriaDTO {

    private String nombreMedicamento;
    private String laboratorio;
    private String nombreCategoria;
    private BigDecimal precio;
    private Integer stock;

    public MedicamentoCategoriaDTO() {
    }

    // El ORDEN de los parámetros debe ser igual al del SELECT new ... del @Query
    public MedicamentoCategoriaDTO(String nombreMedicamento, String laboratorio, String nombreCategoria, BigDecimal precio, Integer stock) {
        this.nombreMedicamento = nombreMedicamento;
        this.laboratorio = laboratorio;
        this.nombreCategoria = nombreCategoria;
        this.precio = precio;
        this.stock = stock;
    }

    public String getNombreMedicamento() {
        return nombreMedicamento;
    }

    public void setNombreMedicamento(String nombreMedicamento) {
        this.nombreMedicamento = nombreMedicamento;
    }

    public String getLaboratorio() {
        return laboratorio;
    }

    public void setLaboratorio(String laboratorio) {
        this.laboratorio = laboratorio;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
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
