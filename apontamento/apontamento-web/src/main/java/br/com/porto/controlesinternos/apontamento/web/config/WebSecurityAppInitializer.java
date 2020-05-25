package br.com.porto.controlesinternos.apontamento.web.config;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * @author WELINGTON ALMEIDA - MECK
 *
 */
public class WebSecurityAppInitializer extends AbstractSecurityWebApplicationInitializer {
	
	public WebSecurityAppInitializer() {
        super(WebSecurityConfig.class);
    }
	
}
