package br.com.porto.controlesinternos.apontamento.dao.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@PropertySources(
		{
			@PropertySource("classpath:/properties/apontamento-database.properties")
		})
@ComponentScan(value={"br.com.porto.controlesinternos.apontamento.dao"})
@EnableTransactionManagement
public class ConfigDAO {
	
	@Autowired
	private Environment env;
	
	@Bean
	PasswordEncoder passwordEncoder(){
		final PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}
	
	@Bean(name="entityManagerFactory")
	LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(dataSource());
		em.setPackagesToScan(new String[] { "br.com.porto.controlesinternos.apontamento"});

		final JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		em.setJpaProperties(additionalProperties());
		em.setPersistenceUnitName("apontamentoUnit");

		return em;
	}
	
	@Bean
	DataSource dataSource() {
		final DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(env.getProperty("br.com.porto.controlesinternos.apontamento.database.driver"));
		
		System.out.println("Conectando a base de dados..");

		dataSource.setUrl(env.getProperty("br.com.porto.controlesinternos.apontamento.database"));
		dataSource.setUsername(env.getProperty("br.com.porto.controlesinternos.apontamento.database.user"));
		dataSource.setPassword(env.getProperty("br.com.porto.controlesinternos.apontamento.database.password"));
		
		return dataSource;
	}
	
	@Bean(name = "jpaTransactionManager")
	PlatformTransactionManager transactionManager() {
		final JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());

		return transactionManager;
	}
	
	@Bean
	PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfig() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	private Properties additionalProperties() {
		final Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("br.com.porto.controlesinternos.apontamento.database.hibernate.hbm2ddl.auto"));
		properties.setProperty("hibernate.dialect", env.getProperty("br.com.porto.controlesinternos.apontamento.database.hibernate.dialect"));
		properties.setProperty("hibernate.show_sql", env.getProperty("br.com.porto.controlesinternos.apontamento.database.hibernate.show_sql"));
		return properties;
	}
}