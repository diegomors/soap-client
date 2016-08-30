package com.github.diegomors.soapclient.core.pessoas;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.NonUniqueResultException;
import javax.persistence.Query;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.github.diegomors.soapclient.core.comum.BaseRepositorio;
import com.github.diegomors.soapclient.core.comum.PaginaDeRegistrosDTO;
import com.github.diegomors.soapclient.core.comum.PaginacaoDTO;

@Repository
public class PessoaRepositorio extends BaseRepositorio<Pessoa> {
    
    final Logger logger = LoggerFactory.getLogger(PessoaRepositorio.class);

    public PaginaDeRegistrosDTO<Pessoa> buscarPagina(PessoaFiltroDTO filtro, PaginacaoDTO paginacao) {

        StringBuilder ql = new StringBuilder();
        ql.append(" FROM ").append(Pessoa.class.getSimpleName()).append(" pes ");
        ql.append(" WHERE 1 = 1 ");

        Map<String, Object> parametros = new HashMap<String, Object>();

        if (!StringUtils.isEmpty(filtro.getNome())) {
            ql.append(" AND lower(pes.nome) LIKE lower(:nome) ");
            parametros.put("nome", "%" + filtro.getNome() + "%");
        }

        // cria a query do count
        Query queryContadora = getEntityManager().createQuery(" SELECT COUNT(pes.id) " + ql.toString());
        aplicarParametros(queryContadora, parametros);
        Long total = (Long) queryContadora.getSingleResult();

        // cria a query dos dados da pagina
        Query querySeletora = getEntityManager().createQuery(ql.toString() + " ORDER BY pes.nome ");
        aplicarParametros(querySeletora, parametros);
        querySeletora.setFirstResult((paginacao.getNumeroDaPagina() - 1) * paginacao.getRegistrosPorPagina());
        querySeletora.setMaxResults(paginacao.getRegistrosPorPagina());

        // obtem as entidades de retorno
        @SuppressWarnings("unchecked")
        List<Pessoa> entidades = querySeletora.getResultList();

        // cria o DTO da pagina de registros
        PaginaDeRegistrosDTO<Pessoa> pagina = new PaginaDeRegistrosDTO<Pessoa>();
        pagina.setConfiguracao(paginacao);
        pagina.setTotal(total);
        pagina.setRegistros(entidades);

        return pagina;
    }

    public void remover(Long id) {
        Pessoa entidade = getEntityManager().find(Pessoa.class, id);
        super.remover(entidade);
    }

    public Pessoa buscarPorID(Long id) {
        return getEntityManager().find(Pessoa.class, id);
    }

    public Pessoa buscarPorNome(String nome) {
        try {
            return getEntityManager()
                    .createQuery(" FROM " + Pessoa.class.getName() + " WHERE lower(nome) LIKE lower(:nome)",
                            Pessoa.class)
                    .setParameter("nome", nome).getSingleResult();
        } catch (NonUniqueResultException ex) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public List<Pessoa> buscarTodos() {
        return getEntityManager().createQuery(" FROM " + Pessoa.class.getName() + " pes " + " ORDER BY pes.id")
                .getResultList();
    }
    
    @SuppressWarnings("unchecked")
    public List<Pessoa> buscarTodos(List<Long> ids) {
        return getEntityManager().createNamedQuery("Pessoa.buscaPorIDs")
                .setParameter("ids", ids)
                .getResultList();
    }
}
