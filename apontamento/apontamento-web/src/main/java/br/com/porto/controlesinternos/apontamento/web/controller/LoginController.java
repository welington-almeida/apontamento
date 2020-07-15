package br.com.porto.controlesinternos.apontamento.web.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.model.Usuario;

import br.com.porto.controlesinternos.apontamento.service.UsuarioService;


@Controller
public class LoginController{
	
	@Inject
	UsuarioService usuarioService;
	private final ModelAndView mav = new ModelAndView();
	
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public ModelAndView loginForm(@ModelAttribute("msg")String msg) {
		mav.clear();
		mav.addObject("msg", msg);
		mav.setViewName("login");
		return mav;
	}

	@RequestMapping(value="/logar", method=RequestMethod.POST)
    public ModelAndView efetuaLogin(Usuario usuario, HttpSession session) {
        mav.clear();
		Usuario usuarioLogin = usuarioService.existeUsuario(usuario.getEmail(), usuario.getSenha());
		if(usuarioLogin != null) {
			mav.setViewName("redirect:/grupo/");
            session.setAttribute("usuarioLogado", usuarioLogin);
            return mav;
        } else {
        	mav.addObject("msg", "Usuario ou senha incorretos");
        	System.out.println("Usuário ou senha incorretos");
        	mav.setViewName("redirect:/login");
        }
        return mav;
    }
	
	@RequestMapping(value="/NovoUsuario",method = RequestMethod.GET)
	public ModelAndView novoUsuario() {
		mav.clear();
		mav.setViewName("novoUsuario");
		return mav;
	}
	
	@RequestMapping(value="/EsqueciMinhaSenha",method = RequestMethod.GET)
	public ModelAndView esqueciMinhaSenha() {
		mav.clear();
		mav.setViewName("esqueciMinhaSenha");
		return mav;
	}
	
	  @RequestMapping("/logout")
	    public String logout(HttpSession session) {
	        session.invalidate();
	        return "redirect:/login";
	    }
}	
	
	
	
