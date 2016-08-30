package com.github.diegomors.soapclient.core.pessoas;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.diegomors.soapclient.core.comum.PaginaDeRegistrosDTO;
import com.github.diegomors.soapclient.core.comum.PaginacaoDTO;

@Service
public class PessoaServico {

    final Logger logger = LoggerFactory.getLogger(PessoaServico.class);

    @Autowired
    private PessoaRepositorio pessoaRepositorio;

    @Transactional(readOnly = true)
    public PaginaDeRegistrosDTO<Pessoa> buscarPagina(PessoaFiltroDTO filtro, PaginacaoDTO paginacao) {
        return this.pessoaRepositorio.buscarPagina(filtro, paginacao);
    }

    @Transactional
    public void remover(Long id) {
        this.pessoaRepositorio.remover(id);
    }

    public Pessoa buscarPorID(Long id) {
        return this.pessoaRepositorio.buscarPorID(id);
    }

    public PessoaDTO buscarPorNome(String nome) {
        PessoaDTO pessoaDto = new PessoaDTO();
        Pessoa pessoa = pessoaRepositorio.buscarPorNome(nome);
        if (pessoa == null)
            return null;
        pessoaDto.setNome(pessoa.getNome());
        return pessoaDto;
    }

    @Transactional
    public PessoaDTO editar(Long idDaPessoa, PessoaDTO pessoaDTO) {
        Pessoa entidade = this.pessoaRepositorio.buscarPorID(idDaPessoa);
        entidade.setNome(pessoaDTO.getNome());
        return new PessoaDTO(this.pessoaRepositorio.salvar(entidade));
    }

    @Transactional
    public PessoaDTO salvar(PessoaDTO pessoaDTO) {
        Pessoa entidade = new Pessoa();
        entidade.setNome(pessoaDTO.getNome());
        return new PessoaDTO(this.pessoaRepositorio.salvar(entidade));
    }

    public List<Pessoa> buscarTodos() {
        return this.pessoaRepositorio.buscarTodos();
    }

    public List<Pessoa> buscarTodos(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return this.buscarTodos();
        }
        return this.pessoaRepositorio.buscarTodos(ids);
    }
}
