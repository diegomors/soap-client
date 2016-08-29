package com.github.diegomors.soapclient.api.comum;

public class InformacaoDoErro {

    public final int httpStatus;
    public final String url;
    public final String mensagemDeErro;

    public InformacaoDoErro(int httpStatus, String url, String mensagemDeErro) {
        this.httpStatus = httpStatus;
        this.url = url;
        this.mensagemDeErro = mensagemDeErro;
    }
}
