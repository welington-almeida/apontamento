package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.model.Grupo;
import br.com.porto.controlesinternos.apontamento.service.GrupoService;

@Controller
public class GrupoController {
	
	@Inject
	private GrupoService grupoService;
	
	private final ModelAndView mav = new ModelAndView();
	
	@RequestMapping(value="/grupo/",method=RequestMethod.GET)
	public ModelAndView listar(){
		mav.clear();
		mav.setViewName("index");
		List<Grupo> grupos = grupoService.listar();
		mav.addObject("grupos", grupos);
		return mav;
	}
	
	@RequestMapping(value="/grupo/inserir",method=RequestMethod.POST)
	public ModelAndView inserir(@RequestBody Grupo grupo){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = grupoService.inserir(grupo);
		if(retorno){
			System.out.println("Incluido com sucesso...");
		}
		else{
			System.out.println("Erro ao Incluir Grupo...");
		}
		return mav;
	}
	
	@RequestMapping(value="/grupo/alterar",method=RequestMethod.POST)
	public ModelAndView alterar(@RequestBody Grupo grupo){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = grupoService.alterar(grupo);
		if(retorno){
			System.out.println("Grupo alterado com sucesso...");
		}
		else{
			System.out.println("Erro ao alterar Grupo...");
		}
		return mav;
	}
	
	@RequestMapping(value="/grupo/selecionar/{codigo}",method=RequestMethod.GET)
	public ModelAndView selecionar(@PathVariable("codigo") long codigoGrupo){
		mav.clear();
		mav.setViewName("index");
		Grupo grupo = grupoService.selecionar(codigoGrupo);
		mav.addObject("grupo", grupo);
		return mav;
	}
	
	@RequestMapping(value="/grupo/deletar/{codigo}",method=RequestMethod.DELETE)
	public ModelAndView deletar(@PathVariable ("codigo") int codigo){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = grupoService.deletar(codigo);
		if(retorno){
			System.out.println("Deletado com sucesso...");
		}
		else{
			System.out.println("Erro ao Deletar Grupo...");
		}
		return mav;
	}
}
