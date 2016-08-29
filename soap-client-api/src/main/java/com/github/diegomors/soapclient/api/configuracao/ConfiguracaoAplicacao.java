package com.github.diegomors.soapclient.api.configuracao;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableScheduling
@EnableWebMvc
@ComponentScan(basePackages = "com.github.diegomors.soapclient")
public class ConfiguracaoAplicacao  {
}
