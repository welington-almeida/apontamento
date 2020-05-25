package br.com.porto.controlesinternos.apontamento.web.config;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * @author WELINGTON ALMEIDA - MECK
 *
 */
public class WebAppInitializer implements WebApplicationInitializer {

	public void onStartup(final ServletContext servletContext) throws ServletException {
//		// Create the 'root' Spring application context
//		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
//		rootContext.register(WebSpringConfig.class);

		// Create the dispatcher servlet's Spring application context
		final AnnotationConfigWebApplicationContext dispatcherContext = new AnnotationConfigWebApplicationContext();
		dispatcherContext.register(WebSpringConfig.class);

		// Register and map the dispatcher servlet
		final ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(dispatcherContext));
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");		
	}


}