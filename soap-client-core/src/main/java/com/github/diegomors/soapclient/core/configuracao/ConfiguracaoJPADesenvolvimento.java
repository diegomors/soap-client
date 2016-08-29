package com.github.diegomors.soapclient.core.configuracao;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class ConfiguracaoJPADesenvolvimento {

    final Logger logger = LoggerFactory.getLogger(ConfiguracaoJPADesenvolvimento.class);

    /**
     * DataSource fornecido apenas para ambiente/profile de 'desenvolvimento',
     * nos demais ambientes a aplicacao deve utilizar o DataSource fornecido
     * pelo servidor de aplicacao (weblogic). Ver classe {@code ConfiguracaoJPA}
     * 
     * @param environment
     * @return
     */
    @Bean
    @Profile("desenvolvimento")
    public DataSource dataSource(Environment environment) {
        logger.info("Criando datasource para o ambiente: {} ", environment.toString());
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(PropriedadesCore.obterPropriedade("configuracao.dataSource.driverClassName"));
        dataSource.setUrl(PropriedadesCore.obterPropriedade("configuracao.dataSource.url"));
        dataSource.setUsername(PropriedadesCore.obterPropriedade("configuracao.dataSource.username"));
        dataSource.setPassword(PropriedadesCore.obterPropriedade("configuracao.dataSource.password"));
        return dataSource;
    }
}
