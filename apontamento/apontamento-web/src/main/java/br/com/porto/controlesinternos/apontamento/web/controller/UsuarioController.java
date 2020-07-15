package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.service.UsuarioService;

@Controller
public class UsuarioController {

	@Inject
	private UsuarioService usuarioService;

	private final ModelAndView mav = new ModelAndView();

	@RequestMapping(value = "/usuarios/", method = RequestMethod.GET)
	public ModelAndView listar() {
		mav.clear();
		mav.setViewName("usuarios");
		List<Usuario> usuarios = usuarioService.listar();
		mav.addObject("usuarios", usuarios);
		return mav;
	}

	@RequestMapping(value = "/usuarios/novo", method = RequestMethod.GET)
	public ModelAndView novoUsuario(@ModelAttribute("msg")String msg) {
		mav.clear();
		mav.addObject("msg", msg);
		mav.setViewName("novoUsuario");
		return mav;
	}

	@RequestMapping(value = "/usuario/alterarSenha", method = RequestMethod.GET)
	public ModelAndView alterarSenha(@ModelAttribute("msg")String msg) {
		mav.clear();
		mav.addObject("msg", msg);
		mav.setViewName("alterarSenha");
		return mav;
	}

	@RequestMapping(value = "/usuario/inserir", method = RequestMethod.POST)
	public ModelAndView inserir(@ModelAttribute Usuario usuario, String senha, String confirmacaoSenha) {
		mav.clear();
		if (senha.equals(confirmacaoSenha)) {
			boolean retorno = usuarioService.inserir(usuario);
			if (retorno) {
				System.out.println("Incluido com sucesso...");
				mav.addObject("msg", "Usuario cadastrado com sucesso");
				mav.setViewName("redirect:/usuarios/novo");
			} else {
				System.out.println("Usuário existente");
				mav.addObject("msg", "Usuario ja existe");
				mav.setViewName("redirect:/usuarios/novo");

			}
		}else {
			mav.addObject("msg", "Erro ao iserir usuario");
			mav.setViewName("redirect:/usuarios/novo");
		}
		return mav;
	}

	@RequestMapping(value = "/usuario/alterar", method = RequestMethod.POST)
	public ModelAndView alterar(@ModelAttribute Usuario usuario) {
		mav.clear();

		boolean retorno = usuarioService.alterar(usuario);
		if (retorno) {
			System.out.println("Alterado com sucesso...");
			mav.setViewName("redirect:/usuarios/");
		} else {
			System.out.println("Erro ao Alterar Usuario...");
		}
		return mav;
	}

	@RequestMapping(value = "/usuario/redefinirSenha", method = RequestMethod.POST)
	public ModelAndView redefinirSenha(@ModelAttribute Usuario usuario, String senhaBanco, String senhaAtual,
			String novaSenha, String senha2) {
		mav.clear();
		if (senhaBanco.equals(senhaAtual)) {
			if (novaSenha.equals(senha2)) {
				boolean retorno = usuarioService.alterarSenha(usuario, novaSenha);
				if (retorno) {
					System.out.println("Alterado com sucesso...");
					mav.addObject("msg", "Senha alterada com sucesso");
					mav.setViewName("redirect:/usuario/alterarSenha");
				} else {
					System.out.println("Erro ao Alterar Usuario...");
				}

			} else {
				System.out.println("Senha não alterada");
				mav.addObject("msg", "Digite a nova senha duas vezes igualmente");
				mav.setViewName("redirect:/usuario/alterarSenha");
			}
		}else {
			mav.addObject("msg", "Senha atual incorreta");
			mav.setViewName("redirect:/usuario/alterarSenha");
		}
		return mav;

	}

	@RequestMapping(value = "/usuario/selecionar/{codigo}", method = RequestMethod.GET)
	public ModelAndView selecionar(@PathVariable("codigo") long codigoUsuario) {
		mav.clear();
		mav.setViewName("index");
		Usuario usuario = usuarioService.selecionar(codigoUsuario);
		mav.addObject("usuario", usuario);
		return mav;
	}

	@RequestMapping(value = "/usuario/deletar", method = RequestMethod.DELETE)
	public ModelAndView deletar(@RequestBody long codigoUsuario) {
		mav.clear();
		mav.setViewName("index");
		boolean retorno = usuarioService.deletar(codigoUsuario);
		if (retorno) {
			System.out.println("Deletado com sucesso...");
		} else {
			System.out.println("Erro ao Deletar Usuario...");
		}
		return mav;
	}
}
