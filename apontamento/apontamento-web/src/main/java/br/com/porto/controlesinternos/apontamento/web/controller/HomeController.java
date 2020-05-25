package br.com.porto.controlesinternos.apontamento.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {

	private final ModelAndView mav = new ModelAndView();
	
	@RequestMapping("/")
	public ModelAndView index(final HttpServletRequest request,@ModelAttribute("mensagem") final String mensagem){
		mav.clear();
		mav.setViewName("index");
		if(request.getSession().getAttribute("usuarioLogado") != null){
			mav.setViewName("redirect:/painel/");
		}else{
			mav.addObject("mensagem", mensagem);
		}
		return mav;
	}
}
