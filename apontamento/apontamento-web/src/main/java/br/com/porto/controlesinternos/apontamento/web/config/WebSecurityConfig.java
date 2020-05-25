package br.com.porto.controlesinternos.apontamento.web.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.porto.controlesinternos.apontamento.dao.config.ConfigDAO;

@Configuration
@EnableWebSecurity
@Import({ConfigDAO.class})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private DataSource datasource;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	public void configureGlobal(final AuthenticationManagerBuilder auth) throws Exception {
		auth
		.jdbcAuthentication()
		.dataSource(datasource)
		.passwordEncoder(passwordEncoder)
		.usersByUsernameQuery("select email as usuario, senha as password, habilitado as enabled from MA_USUARIO where email = ? ")
		.authoritiesByUsernameQuery("select u.cod_usuario as usuario,u.cod_perfil as authority from MA_USUARIO u where" +
				" u.email  = ?")
		.getUserDetailsService();
	}

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
	    http.authorizeRequests()
	    .antMatchers("/403/").access("permitAll")
	    .antMatchers("/404/").access("permitAll")
	    .antMatchers("/500/").access("permitAll")
	    .and().formLogin().usernameParameter("username").passwordParameter("senha")
	    .loginPage("/").loginProcessingUrl("/autenticar")
	    .failureUrl("/?error=true")
	    .defaultSuccessUrl("/login")
	    .and().logout().deleteCookies("remove")
        .invalidateHttpSession(false)
        .logoutUrl("/logout/").logoutSuccessUrl("/sair")
		//habilitar depois, estudar os problemas com chamadas AJAX
        .and().csrf().disable()
        .headers().frameOptions().disable()
        .exceptionHandling().accessDeniedPage("/403/");
	    //controla o número de sessões por usuário, neste caso 1 sessão ativa por usuário.
//	    http.sessionManagement().maximumSessions(1).expiredUrl("/logout/");
	}
}