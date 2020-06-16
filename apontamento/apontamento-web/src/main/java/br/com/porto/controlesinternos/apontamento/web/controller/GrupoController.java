package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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
		mav.setViewName("visualizarGrupos");
		List<Grupo> grupos = grupoService.listar();
		mav.addObject("grupos", grupos);
		return mav;
	}
	
	@RequestMapping(value="/grupo/pesquisar/",method=RequestMethod.POST)
	public ModelAndView pesquisar(Grupo grupo){
		mav.clear();

		if(grupo.getCodigo() > 0 ) {
			mav.setViewName("visualizarGrupos");
			Grupo grupoPesquisado = grupoService.selecionar(grupo.getCodigo());
			if(grupoPesquisado == null) {
				mav.setViewName("redirect:/grupo/");
			}
			List<Grupo> grupos = new ArrayList<Grupo>();
			grupos.add(grupoPesquisado);
			mav.addObject("grupos", grupos);
			
		} else {
			mav.setViewName("redirect:/grupo/");
		}
		
		return mav;
	}
	
	@RequestMapping(value="/grupo/inserir",method=RequestMethod.POST)
	public ModelAndView inserir (@ModelAttribute Grupo grupo){
		mav.clear();
		mav.setViewName("redirect:/grupo/");
		boolean retorno = grupoService.inserir(grupo);
		if(retorno){
			System.out.println("Incluido com sucesso...");
		}
		else{
			System.out.println("Erro ao Incluir Grupo...");
		}
		return mav;
	}
	
	@RequestMapping(value="/grupo/alterar",method=RequestMethod.PUT)
	public ModelAndView alterar(@ModelAttribute Grupo grupo){
		mav.clear();
		mav.setViewName("visualizarGrupos");
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
	
	@RequestMapping(value="/grupo/deletar/",method=RequestMethod.POST)
	public ModelAndView deletar(@ModelAttribute Grupo grupo){
		mav.clear();
		mav.setViewName("redirect:/grupo/");
		boolean retorno = grupoService.deletar(grupo.getCodigo());
		if(retorno){
			System.out.println("Deletado com sucesso...");
		}
		else{
			System.out.println("Erro ao Deletar Grupo...");
		}
		return mav;
	}
}
