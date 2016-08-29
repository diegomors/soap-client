package com.github.diegomors.soapclient.core.comum;

import java.io.Serializable;

public class PaginacaoDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final Integer REGISTROS_POR_PAGINA_PADRAO = 20;

	private Integer numeroDaPagina;
	
	private Integer registrosPorPagina;
	
	public PaginacaoDTO() {
		this.numeroDaPagina = 1;
		this.registrosPorPagina = REGISTROS_POR_PAGINA_PADRAO;
	}

	public Integer getNumeroDaPagina() {
		return numeroDaPagina;
	}

	public void setNumeroDaPagina(Integer numeroDaPagina) {
		this.numeroDaPagina = numeroDaPagina;
	}

	public Integer getRegistrosPorPagina() {
		return registrosPorPagina;
	}

	public void setRegistrosPorPagina(Integer registrosPorPagina) {
		this.registrosPorPagina = registrosPorPagina;
	}

}
