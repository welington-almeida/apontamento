package br.com.porto.controlesinternos.apontamento.web.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles2.TilesConfigurer;

import br.com.porto.controlesinternos.apontamento.service.config.ConfigService;
import br.com.porto.controlesinternos.apontamento.web.interceptor.AutorizadorInterceptor;

@PropertySources(
		{
			@PropertySource("classpath:/properties/apontamento-application.properties")
		})
@Configuration
@EnableWebMvc
@ComponentScan(value={"br.com.porto.controlesinternos.apontamento.web"})
@Import({ConfigService.class})
public class WebSpringConfig extends WebMvcConfigurerAdapter {
	
	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}

	@Bean
	public ViewResolver configureViewResolver() {
		final UrlBasedViewResolver viewResolver = new UrlBasedViewResolver();
		viewResolver.setViewClass(org.springframework.web.servlet.view.tiles2.TilesView.class);
		return viewResolver;
	}
	
	@Bean
	public MessageSource messageSource() {
	    final ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
	    messageSource.setBasename("/resources/messages");
	    return messageSource;
	}
	
	@Bean
	public TilesConfigurer tilesConfigurer() {
		final TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions("/tiles/tiles-config.xml");
		return tilesConfigurer;
	}
	
	@Override
	public void configureDefaultServletHandling(final DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	
	@Bean
	public CommonsMultipartResolver multipartResolver() {
	    final CommonsMultipartResolver resolver=new CommonsMultipartResolver();
	    resolver.setDefaultEncoding("UTF-8");
	    return resolver;
	}
	
	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
	    registry.addInterceptor(new AutorizadorInterceptor()).addPathPatterns("/**").addPathPatterns("/sair**")
	    .excludePathPatterns("/resources/**","/salvar-nova-senha","/redefinir-senha/**","/enviar-senha","/esqueceu-senha","/api/**","/apontamento/","/login/","/login","/sair","/");
	}
}
