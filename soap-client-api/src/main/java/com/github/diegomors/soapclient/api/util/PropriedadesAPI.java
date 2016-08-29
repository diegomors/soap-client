package com.github.diegomors.soapclient.api.util;

import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PropriedadesAPI {

    final static Logger logger = LoggerFactory.getLogger(PropriedadesAPI.class);
    private static Properties propriedades;
    
    static {
        propriedades = new Properties();
        String nomeDoArquivo = "api.properties";
        try {
            InputStream inputStream = PropriedadesAPI.class.getClassLoader().getResourceAsStream(nomeDoArquivo);
            if (inputStream != null)
                propriedades.load(inputStream);
        } catch (Exception e) {
            logger.error("Erro ao carregar arquivo de configuracoes iniciais!", e);
            
        }
    }

    public static String obterPropriedade(String nomeDaPropriedade) {
        return propriedades.getProperty(nomeDaPropriedade);
    }
}
