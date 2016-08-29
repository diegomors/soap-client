package com.github.diegomors.soapclient.core.configuracao;

import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Classe de configuracao da camada de persistencia. Algumas propriedades vem do
 * arquivo de configuracao: core.properties.
 * 
 * Atencao para o profile do Spring utilizado para criar o DataSource, nos casos
 * de homologacao e producao, o dataSource vira do servidor de aplicacao.
 */
@Configuration
@EnableTransactionManagement
public class ConfiguracaoJPA {

    final Logger logger = LoggerFactory.getLogger(ConfiguracaoJPA.class);

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
        entityManager.setPersistenceUnitName("templatePU");
        entityManager.setDataSource(dataSource);
        entityManager.setPackagesToScan(new String[] { "com.github.diegomors.soapclient.core" });

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        entityManager.setJpaVendorAdapter(vendorAdapter);
        entityManager.setJpaProperties(obterPropriedadesAdicionais());
        return entityManager;
    }

    @Bean
    @Profile({ "homologacao", "producao" })
    public DataSource dataSource(Environment environment) {
        JndiDataSourceLookup dataSourceLookup = new JndiDataSourceLookup();
        dataSourceLookup.setResourceRef(true);
        String nomeDataSource = PropriedadesCore.obterPropriedade("configuracao.persistence.dataSource");
        logger.info("Obtendo do datasource: {} no ambiente:", nomeDataSource, environment.getActiveProfiles());
        DataSource dataSource = dataSourceLookup.getDataSource(nomeDataSource);
        return dataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);
        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    private Properties obterPropriedadesAdicionais() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto",
                PropriedadesCore.obterPropriedade("configuracao.persistence.hibernate.hbm2ddl.auto"));
        properties.setProperty("hibernate.show_sql",
                PropriedadesCore.obterPropriedade("configuracao.persistence.hibernate.show_sql"));
        properties.setProperty("hibernate.format_sql",
                PropriedadesCore.obterPropriedade("configuracao.persistence.hibernate.format_sql"));
        return properties;
    }
}
