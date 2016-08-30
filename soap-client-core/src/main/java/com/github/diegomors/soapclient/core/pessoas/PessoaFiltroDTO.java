package com.github.diegomors.soapclient.core.pessoas;

import java.io.Serializable;

public class PessoaFiltroDTO implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private String nome;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
