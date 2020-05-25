package br.com.porto.controlesinternos.apontamento.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @author WELINGTON ALMEIDA - MECK
 * 
 */
public class AutorizadorInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(final HttpServletRequest request,
			final HttpServletResponse response, final Object controller)
			throws Exception {
		if (request.getSession().getAttribute("usuarioLogado") != null) {
			return true;
		} else if (request.getUserPrincipal() != null) {
			response.sendRedirect("/mapa-astral/login");
		} else {
			response.sendRedirect("/mapa-astral/");
		}
		return false;
	}

}