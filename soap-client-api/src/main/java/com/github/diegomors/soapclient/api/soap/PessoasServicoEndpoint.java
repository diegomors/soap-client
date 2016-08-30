package com.github.diegomors.soapclient.api.soap;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlElement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.github.diegomors.soapclient.core.pessoas.Pessoa;
import com.github.diegomors.soapclient.core.pessoas.PessoaServico;

@Component
@WebService(targetNamespace = "http://localhost:8001/soap-client/soap", name = "PessoasServicoSoap")
public class PessoasServicoEndpoint {

    final Logger logger = LoggerFactory.getLogger(PessoasServicoEndpoint.class);

    @Autowired
    private PessoaServico pessoaServico;

    public PessoasServicoEndpoint() {
    }

    @WebMethod
    public Pessoa getPessoaPorID(@XmlElement(required = true, nillable = false) @WebParam(name = "id") Long id) {
        return pessoaServico.buscarPorID(id);
    }

    @WebMethod
    public List<Pessoa> getTodasAsPessoas() {
        return pessoaServico.buscarTodos();
    }
}
