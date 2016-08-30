package com.github.diegomors.soapclient.core.pessoas;

import java.io.Serializable;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PessoaDTO implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private Pessoa pessoa;

    public PessoaDTO() {
        pessoa = new Pessoa();
    }

    public PessoaDTO(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Long getId() {
        return pessoa.getId();
    }

    // property level constraint, maior flexibilidade e maior transparencia.
    @NotEmpty
    @Length(max = 100, message = "{org.hibernate.validator.constraints.Length.mensagemParaApenasMax}")
    public String getNome() {
        return pessoa.getNome();
    }

    public void setNome(String nome) {
        this.pessoa.setNome(nome);
    }

    public String toJSON() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
