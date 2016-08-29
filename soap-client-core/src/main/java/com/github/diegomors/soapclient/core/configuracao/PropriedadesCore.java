package com.github.diegomors.soapclient.core.configuracao;

import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PropriedadesCore {

    final static Logger logger = LoggerFactory.getLogger(PropriedadesCore.class);
    private static Properties propriedades;

    static {
        propriedades = new Properties();
        String nomeDoArquivo = "core.properties";
        try {
            InputStream inputStream = PropriedadesCore.class.getClassLoader().getResourceAsStream(nomeDoArquivo);
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
