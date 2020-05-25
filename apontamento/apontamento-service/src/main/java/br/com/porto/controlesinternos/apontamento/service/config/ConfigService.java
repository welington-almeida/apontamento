package br.com.porto.controlesinternos.apontamento.service.config;

import java.io.IOException;
import java.util.Properties;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;


@Configuration
@EnableAsync
@EnableScheduling
@PropertySources(
		{
			@PropertySource("classpath:/properties/apontamento-mail-config.properties"),
		})
@ComponentScan("br.com.porto.controlesinternos.apontamento.service")
@EnableTransactionManagement
public class ConfigService {
	
	@Autowired
	private Environment env;
	
	@Bean
	JavaMailSenderImpl javaMail() {
		final JavaMailSenderImpl mail = new JavaMailSenderImpl();
		mail.setUsername(env.getProperty("br.com.porto.controlesinternos.apontamento.mail.username"));
		mail.setPassword(env.getProperty("br.com.porto.controlesinternos.apontamento.password"));
		final Properties properties = new Properties();
		properties.setProperty("mail.transport.protocol", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.protocol"));
		properties.setProperty("mail.smtp.auth", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.auth"));
		properties.setProperty("mail.smtp.starttls.enable", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.starttls"));
		properties.setProperty("mail.smtp.debug", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.debug"));
		properties.setProperty("mail.smtp.host", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.host"));
		properties.setProperty("mail.smtp.port", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.port"));
		properties.setProperty("mail.smtp.ssl.trust", env.getProperty("br.com.porto.controlesinternos.apontamento.mail.ssl"));
		mail.setJavaMailProperties(properties);
		return mail;
	}
		
	@Bean
	public VelocityEngine velocityEngine() throws VelocityException, IOException {
		final VelocityEngineFactoryBean velocityFactory = new VelocityEngineFactoryBean();
		velocityFactory.setResourceLoaderPath("/br/com/porto/controlesinternos/apontamento/mail/");
		return velocityFactory.createVelocityEngine();
	}

}
