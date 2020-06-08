package br.com.porto.controlesinternos.apontamento.web.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.service.DemandaService;

@Controller
public class DemandaController {
	
	@Inject
	DemandaService demandaService;
	
	private final ModelAndView mav = new ModelAndView();

	@RequestMapping(value="/demanda/inserir", method=RequestMethod.POST)
	public ModelAndView listar(@RequestBody Demanda demanda) {
		mav.clear();
		mav.setViewName("index");
		boolean retorno = demandaService.inserir(demanda);
		if(retorno) {
			System.out.println("Demanda Incluída com sucesso.");
		} else {
			System.out.println("Falha ao incluir demanda.");
		}
		
		return mav;
		
	}
	
	@RequestMapping(value="/demanda/selecionar/{codigo}", method=RequestMethod.GET)
	public ModelAndView selecionarPorCodigo(@PathVariable("codigo") int codigo) {
		mav.clear();
		mav.setViewName("index");
		
		Demanda demanda = demandaService.selecionarPorCodigo(codigo);
		if(demanda != null) {
			System.out.println("Demanda encontrada!");
			mav.addObject("demanda", demanda);
		} else {
			System.out.println("Demanda não encontrada");
		}
		
		
		return mav;
	}
	
	@RequestMapping(value="/demanda/alterar", method=RequestMethod.PUT)
	public ModelAndView alterar(@RequestBody Demanda demanda) {
		mav.clear();
		mav.setViewName("index");
		demandaService.alterar(demanda);
		System.out.println("Demanda alterada.");
		return mav;
		
	}
	
	@RequestMapping(value="/demanda/deletar/{codigo}", method=RequestMethod.DELETE)
	public ModelAndView deletarDemanda(@PathVariable ("codigo") int codigo) {
		mav.clear();
		mav.setViewName("index");
//		Demanda demanda = demandaService.selecionarPorCodigo(codigo);
		demandaService.deletar(codigo);
		System.out.println("Demanda Deletada.");
		return mav;
		
	}
	
}
