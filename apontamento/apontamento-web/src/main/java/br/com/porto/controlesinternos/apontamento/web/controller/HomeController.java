package br.com.porto.controlesinternos.apontamento.web.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.altoastral.mapaastral.model.Usuario;
import br.com.altoastral.mapaastral.service.UsuarioService;

/**
 * @author Welington Almeida
 * 
 */
@Controller
public class HomeController {

	private final ModelAndView mav = new ModelAndView();

	@Inject
	private UsuarioService usuarioService;
	
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

	@RequestMapping("/login")
	public ModelAndView painel(final HttpServletRequest request, final RedirectAttributes redirectAttributes) {
		mav.clear();
		mav.setViewName("redirect:/403");
		try {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			
			Usuario usuarioLogado = usuarioService.buscarUsuarioPorEmail(user.getUsername());
			
			if(usuarioLogado != null) {
				request.getSession().setAttribute("usuarioLogado",usuarioLogado);
				mav.setViewName("redirect:/painel/");
			}
		
		} catch (final Exception e) {
			System.out.println(e);
		}
		
		return mav;
	}

	@RequestMapping("/esqueceu-senha")
	public ModelAndView esqueceuSenha(@ModelAttribute("mensagem") final String mensagem) {
		mav.clear();
		mav.setViewName("esqueceu-senha");
		mav.addObject("mensagem", mensagem);
		return mav;
	}

	@RequestMapping("/enviar-senha")
	public String esqueceuSenha(final String email,
			final RedirectAttributes redirectAttributes) {
		redirectAttributes.addFlashAttribute("mensagem",
				usuarioService.enviarEmailNovaSenha(email));
		return "redirect:/esqueceu-senha";
	}

	@RequestMapping("/redefinir-senha/{hash}")
	public ModelAndView redefinirSenha(@PathVariable("hash") final String hash,
			@ModelAttribute("mensagem") final String mensagem) {
		mav.clear();

		final Usuario usuario = usuarioService
				.buscarUsuarioRedefinirSenha(hash);
		mav.addObject("mensagem", mensagem);
		if (mensagem.equals("OK") || usuario != null) {
			mav.setViewName("redefinir-senha");
			mav.addObject("usuario", usuario);
			mav.addObject("hash", hash);
			mav.addObject("exigirSenhaAtual", false);
			if(mensagem.equals("OK")) {
				mav.addObject("exibirVoltar", true);
			}
		} else {
			mav.setViewName("404");
		}

		return mav;
	}

	@RequestMapping("/salvar-nova-senha")
	public ModelAndView salvarNovaSenha(final boolean exigirSenhaAtual,final String senhaAtual,
			final String novaSenha,
			final String confirmaNovaSenha, final String email,
			final String hash, final RedirectAttributes redirectAttributes) {
		
		mav.clear();
		mav.setViewName("redirect:/redefinir-senha/" + hash);

		final String mensagem = usuarioService.redefinirSenha(novaSenha,
				confirmaNovaSenha, email, hash,exigirSenhaAtual,senhaAtual);

		redirectAttributes.addFlashAttribute("mensagem", mensagem);
		
		if(exigirSenhaAtual){
			mav.setViewName("redirect:/painel/redefinir-senha/");
		}

		return mav;
	}

	@RequestMapping("/403")
	public String acessoNegado() {
		return "403";
	}

	@RequestMapping("/sair")
	public ModelAndView sairDoSistema(final HttpServletRequest request) {
		mav.clear();
		mav.setViewName("redirect:/");
		request.getSession().invalidate();
		return mav;
	}
}
