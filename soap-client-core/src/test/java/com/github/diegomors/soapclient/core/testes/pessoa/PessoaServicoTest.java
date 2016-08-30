package com.github.diegomors.soapclient.core.testes.pessoa;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class PessoaServicoTest {

	@Before
	public void setUp() throws Exception {
	}

	/**
	 * Teste para verificar a regra de negocio (...)
	 * que diz que 1 (um) deve ser maior do que 0 (zero)
	 */
	@Test
	public void test_se_um_maior_que_zero() {
		assertEquals(true, 1 > 0);
	}
}
