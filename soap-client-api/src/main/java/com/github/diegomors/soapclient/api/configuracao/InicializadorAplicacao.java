package com.github.diegomors.soapclient.api.configuracao;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import com.github.diegomors.soapclient.api.util.PropriedadesAPI;
import com.github.diegomors.soapclient.core.configuracao.PropriedadesCore;

/**
 * Classe que inicializa toda a aplicacao. Devo registrar as classes de
 * Configuracao e defino tambem o profile ativo do Spring, com base na variavel
 * ambiente que foi passado para o arquivo core.properties do modulo-core.
 *
 */
public class InicializadorAplicacao implements WebApplicationInitializer {

    final Logger logger = LoggerFactory.getLogger(InicializadorAplicacao.class);

    @Override
    public void onStartup(ServletContext servletContext) {
        XmlWebApplicationContext rootContext = new XmlWebApplicationContext();
        rootContext.setConfigLocation("/WEB-INF/applicationContext.xml");
        servletContext.addListener(new ContextLoaderListener(rootContext));

        servletContext.setInitParameter(AbstractEnvironment.DEFAULT_PROFILES_PROPERTY_NAME, "desenvolvimento");
        String profileAtivo = PropriedadesCore.obterPropriedade("configuracao.ambiente");
        logger.info("Definindo profile ativo: {}", profileAtivo);
        servletContext.setInitParameter(AbstractEnvironment.ACTIVE_PROFILES_PROPERTY_NAME, profileAtivo);

        ServletRegistration.Dynamic dispatcher =
                servletContext.addServlet("dispatcher", new DispatcherServlet(rootContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/*");
        
        ServletRegistration.Dynamic jaxwsServlet =
                servletContext.addServlet("jaxws-servlet", "com.sun.xml.ws.transport.http.servlet.WSSpringServlet");
        jaxwsServlet.addMapping("/soap");   

        if (profileAtivo.equalsIgnoreCase("desenvolvimento")){
        	configurarProxy();
        	configurarCertificadoDigital();
        }
    }
    
    private void configurarProxy() {
		System.setProperty("http.proxyHost", PropriedadesAPI.obterPropriedade("configuracao.proxy.Host"));
		System.setProperty("http.proxyPort", PropriedadesAPI.obterPropriedade("configuracao.proxy.Port"));
		System.setProperty("http.proxyUser", PropriedadesAPI.obterPropriedade("configuracao.proxy.User"));
		System.setProperty("http.proxyPassword", PropriedadesAPI.obterPropriedade("configuracao.proxy.Password"));
	}
    
    private void configurarCertificadoDigital(){
    	System.setProperty("javax.net.ssl.trustStore",PropriedadesAPI.obterPropriedade("configuracao.certificado.TrustStore.Path"));
		System.setProperty("javax.net.ssl.trustStorePassword",PropriedadesAPI.obterPropriedade("configuracao.certificado.TrustStore.Password"));
		System.setProperty("javax.net.ssl.keyStore",PropriedadesAPI.obterPropriedade("configuracao.certificado.KeyStore.Path"));
		System.setProperty("javax.net.ssl.keyStorePassword",PropriedadesAPI.obterPropriedade("configuracao.certificado.keyStore.Password"));
    }
}
