package com.github.diegomors.soapclient.core.comum;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PaginaDeRegistrosDTO<T> implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<T> registros;
	
	/**
	 * Configuração utilizada para buscar
	 * essa página de registros.
	 */
	private PaginacaoDTO configuracao;
	
	/**
	 * Total de registros encontrados.
	 */
	private Long total;
	
	public List<Integer> getIntervaloDePaginas() {
		
		int pagina = configuracao.getNumeroDaPagina();

		List<Integer> intervalo = new ArrayList<Integer>();
		intervalo.add(pagina);
		
		int esquerda = pagina;
		int direita = pagina;
		int total = getTotalDePaginas();
		
		boolean alternador = true;
		
		for (int i = 0; i < 4; i++) {
			if (alternador) {
				if (esquerda > 1) {
					intervalo.add(0, --esquerda);
				} else if (direita < total) {
					intervalo.add(++direita);
				} else {
					break;
				}
			} else {
				if (direita < total) {
					intervalo.add(++direita);
				} else if (esquerda > 1) {
					intervalo.add(0, --esquerda);
				} else {
					break;
				}
			}
			alternador = !alternador;
		}
		return intervalo;
	}

	public int getTotalDePaginas() {
		return (int) Math.ceil((double)total / (double)configuracao.getRegistrosPorPagina());
	}

	public List<T> getRegistros() {
		if (registros == null) {
			registros = new ArrayList<T>();
		}
		return registros;
	}

	public void setRegistros(List<T> registros) {
		this.registros = registros;
	}

	public PaginacaoDTO getConfiguracao() {
		return configuracao;
	}

	public void setConfiguracao(PaginacaoDTO configuracao) {
		this.configuracao = configuracao;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

}
