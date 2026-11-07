package com.repaso.farmacia.dto;

public class MessageResponse {
    private String mensaje;

    public MessageResponse(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
