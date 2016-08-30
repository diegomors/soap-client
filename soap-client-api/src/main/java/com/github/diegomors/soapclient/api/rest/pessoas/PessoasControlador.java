package com.github.diegomors.soapclient.api.rest.pessoas;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.diegomors.soapclient.api.comum.ExcecaoGenerica;
import com.github.diegomors.soapclient.core.pessoas.Pessoa;
import com.github.diegomors.soapclient.core.pessoas.PessoaDTO;
import com.github.diegomors.soapclient.core.pessoas.PessoaServico;

@RestController
@RequestMapping("/pessoas")
public class PessoasControlador {

    final Logger logger = LoggerFactory.getLogger(PessoasControlador.class);

    @Autowired
    private PessoaServico pessoaServico;

    @RequestMapping(value = "/help", method = RequestMethod.GET, produces = { "application/text" })
    public String help() {
        return "http://enderecogitlab/descricao.wiki";
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Pessoa>> listarPessoas(@RequestParam(value = "ids[]", required = false) List<Long> ids) {
        List<Pessoa> lista = pessoaServico.buscarTodos(ids);
        return new ResponseEntity<List<Pessoa>>(lista, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = { "application/json" })
    public ResponseEntity<PessoaDTO> buscarPessoaPeloid(@PathVariable("id") long id) {
        PessoaDTO pessoa = verificarPessoaExiste(id);
        if (pessoa != null)
            return new ResponseEntity<PessoaDTO>(pessoa, HttpStatus.OK);
        return new ResponseEntity<PessoaDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<PessoaDTO> salvarNovaPessoa(@RequestBody @Valid PessoaDTO pessoa,
            BindingResult bindingResult) throws ExcecaoGenerica {
        if (bindingResult.hasErrors()) {
            logger.warn("Ocorreu {} errro(s) de validacao!", bindingResult.getFieldErrorCount());
            throw new ExcecaoGenerica(HttpStatus.BAD_REQUEST, "JSON recebido diferente do esperado!");
        }
        try {
            logger.info("Inserindo uma nova pessoa, nome: [{}]...", pessoa.getNome());
            pessoa = pessoaServico.salvar(pessoa);
            return new ResponseEntity<PessoaDTO>(pessoa, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Erro ao inserir uma pessoa", e);
            return new ResponseEntity<PessoaDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<PessoaDTO> atualizarPessoa(@PathVariable("id") long id, @RequestBody @Valid PessoaDTO pessoa,
            BindingResult bindingResult) throws ExcecaoGenerica {
        if (bindingResult.hasErrors()) {
            logger.warn("Ocorreu {} errro(s) de validacao!", bindingResult.getFieldErrorCount());
            throw new ExcecaoGenerica(HttpStatus.BAD_REQUEST, "JSON recebido diferente do esperado!");
        }
        PessoaDTO pessoaCorrente = verificarPessoaExiste(id);
        if (pessoaCorrente == null) {
            return new ResponseEntity<PessoaDTO>(HttpStatus.NOT_FOUND);
        }
        pessoa = pessoaServico.editar(id, pessoa);
        return new ResponseEntity<PessoaDTO>(pessoa, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<PessoaDTO> removerPessoa(@PathVariable("id") long id) {
        PessoaDTO pessoa = verificarPessoaExiste(id);
        if (pessoa == null) {
            return new ResponseEntity<PessoaDTO>(HttpStatus.NOT_FOUND);
        }
        pessoaServico.remover(id);
        return new ResponseEntity<PessoaDTO>(HttpStatus.NO_CONTENT);
    }

    private PessoaDTO verificarPessoaExiste(long id) {
        Pessoa pessoaCorrente = pessoaServico.buscarPorID(id);
        PessoaDTO pessoaDTO = null;
        if (pessoaCorrente != null) {
            pessoaDTO = new PessoaDTO(pessoaCorrente);
        } else {
            logger.warn("Pessoa com id: [{}], nao foi encontrada!", id);
        }
        return pessoaDTO;
    }
}
