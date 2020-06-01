package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
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
	
	@RequestMapping(value="/usuarios/",method=RequestMethod.GET)
	public ModelAndView listar(){
		mav.clear();
		mav.setViewName("index");
		List<Usuario> usuarios = usuarioService.listar();
		mav.addObject("usuarios", usuarios);
		return mav;
	}
	
	@RequestMapping(value="/usuario/inserir",method=RequestMethod.POST)
	public ModelAndView inserir(@RequestBody Usuario usuario){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = usuarioService.inserir(usuario);
		if(retorno){
			System.out.println("Incluido com sucesso...");
		}
		else{
			System.out.println("Erro ao Incluir Usuario...");
		}
		return mav;
	}
	
	@RequestMapping(value="/usuario/alterar",method=RequestMethod.PUT)
	public ModelAndView alterar(@RequestBody Usuario usuario){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = usuarioService.alterar(usuario);
		if(retorno){
			System.out.println("Alterado com sucesso...");
		}
		else{
			System.out.println("Erro ao Alterar Usuario...");
		}
		return mav;
	}
	
	@RequestMapping(value="/usuario/selecionar/{codigo}",method=RequestMethod.GET)
	public ModelAndView selecionar(@PathVariable("codigo") long codigoUsuario){
		mav.clear();
		mav.setViewName("index");
		Usuario usuario = usuarioService.selecionar(codigoUsuario);
		mav.addObject("usuario", usuario);
		return mav;
	}
	
	@RequestMapping(value="/usuario/deletar",method=RequestMethod.DELETE)
	public ModelAndView deletar(@RequestBody long codigoUsuario){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = usuarioService.deletar(codigoUsuario);
		if(retorno){
			System.out.println("Deletado com sucesso...");
		}
		else{
			System.out.println("Erro ao Deletar Usuario...");
		}
		return mav;
	}
}