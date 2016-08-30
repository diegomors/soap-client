package com.github.diegomors.soapclient.core.pessoas;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TAB_PESSOA", schema="TEMPLATE")
public class Pessoa implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "PESSOA_SEQ_GENERATOR", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "PESSOA_SEQ_GENERATOR", sequenceName = "TEMPLATE.SEQ_TAB_PESSOA", allocationSize = 1)
    @Column(name = "ID_PESSOA")
    private Long id;

    @Column(name = "NOME")
    private String nome;
    
    @Column(name = "IDADE")
    private int idade;
    
    @Column(name = "DATA_CRIACAO")
    private Date dataDeCriacao;
    
    @Column(name = "DATA_ATUALIZACAO")
    private Date dataDeAtualizacao;
    
    public Pessoa() {}

    public Date getDataDeCriacao() {
        return dataDeCriacao;
    }

    public void setDataDeCriacao(Date dataDeCriacao) {
        this.dataDeCriacao = dataDeCriacao;
    }

    public Date getDataDeAtualizacao() {
        return dataDeAtualizacao;
    }

    public void setDataDeAtualizacao(Date dataDeAtualizacao) {
        this.dataDeAtualizacao = dataDeAtualizacao;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}