package com.github.diegomors.soapclient.core.testes.pessoa;

import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.github.diegomors.soapclient.core.pessoas.Pessoa;
import com.github.diegomors.soapclient.core.pessoas.PessoaRepositorio;
import com.github.diegomors.soapclient.core.testes.configuracao.ConfiguracaoJPATeste;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { PessoaRepositorio.class, ConfiguracaoJPATeste.class })
@ActiveProfiles("test")
public class PessoaRepositorioTest {

    @Autowired
    PessoaRepositorio pessoaRepositorio;

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void test() {
        List<Pessoa> pessoas = pessoaRepositorio.buscarTodos();
        Assert.assertEquals(7, pessoas.size());
    }

}
