package com.github.diegomors.soapclient.core.comum;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class BaseRepositorio<T> {

    @PersistenceContext(unitName = "nfeconsultaPU")
    private EntityManager entityManager;

    protected void aplicarParametros(Query query, Map<String, Object> parametros) {
        for (Entry<String, Object> parametro : parametros.entrySet()) {
            query.setParameter(parametro.getKey(), parametro.getValue());
        }
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    protected List<Integer> normalizarColecaoDeNumerosInteiros(List<? extends Number> numeros) {

        List<Integer> inteiros = new ArrayList<Integer>();
        for (Number numero : numeros) {
            if (numero != null) {
                inteiros.add(numero.intValue());
            } else {
                inteiros.add(null);
            }
        }
        return inteiros;
    }

    public T salvar(T objeto) {
        this.entityManager.persist(objeto);
        return objeto;
    }

    public T atualizar(T objeto) {
        this.entityManager.merge(objeto);
        return objeto;
    }

    public void remover(T objeto) {
        this.entityManager.remove(objeto);
    }

    public void refresh(T objeto) {
        this.entityManager.refresh(objeto);
    }
}
