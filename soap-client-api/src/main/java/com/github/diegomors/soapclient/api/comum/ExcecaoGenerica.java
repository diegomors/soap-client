package com.github.diegomors.soapclient.api.comum;

import org.springframework.http.HttpStatus;

public class ExcecaoGenerica extends Exception {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    private HttpStatus httpCodigoStatus;
    
    @SuppressWarnings("unused")
    private ExcecaoGenerica() {}
    
    public ExcecaoGenerica(HttpStatus httpCodigoStatus, String mensagem) {
        super(mensagem);
        this.httpCodigoStatus = httpCodigoStatus;
    }
    public HttpStatus getHttpCodigoStatus() {
        return httpCodigoStatus;
    }
    public void setHttpCodigoStatus(HttpStatus httpCodigoStatus) {
        this.httpCodigoStatus = httpCodigoStatus;
    }
}
