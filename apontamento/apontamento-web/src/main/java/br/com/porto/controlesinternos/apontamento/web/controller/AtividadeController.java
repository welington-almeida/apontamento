
package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Grupo;
import br.com.porto.controlesinternos.apontamento.service.AtividadeService;
import br.com.porto.controlesinternos.apontamento.service.DemandaService;
import br.com.porto.controlesinternos.apontamento.service.GrupoService;

@Controller
public class AtividadeController {

	@Inject
	private AtividadeService atividadeService;
	
	@Inject
	private DemandaService demandaService;
	
	@Inject GrupoService grupoService;
	
	private final ModelAndView mav = new ModelAndView();
	
	
	@RequestMapping(value="/atividade/", method=RequestMethod.GET)
	public ModelAndView listar() {
		mav.clear();
		mav.setViewName("visualizarAtividades");
		ArrayList<Atividade> atividades = (ArrayList<Atividade>) atividadeService.listar();
		ArrayList<Demanda> demandas = (ArrayList<Demanda>) demandaService.listar();
		ArrayList<Grupo> grupos = (ArrayList<Grupo>) grupoService.listar();
		mav.addObject("atividades", atividades);
		mav.addObject("demandas", demandas);
		mav.addObject("grupos", grupos);
		
		return mav;
		
	}
	@RequestMapping(value="/atividade/inserir", method=RequestMethod.POST)
	public ModelAndView inserir(@ModelAttribute Atividade atividade) {
		mav.clear();
		mav.setViewName("redirect:/atividade/");
		boolean retorno = atividadeService.inserir(atividade);
		if(retorno) {
			System.out.println("Atividade Incluída com Sucesso.");
		} else {
			System.out.println("Falha ao incluir atividade. ");
		}
		
		return mav;
	}
	
	@RequestMapping(value="/atividade/selecionar/{codigo}", method=RequestMethod.GET)
	public ModelAndView selecionarPorCodigo(@ModelAttribute Atividade atividade) {
		mav.clear();
		mav.setViewName("index");
		Atividade atividadeSelecionada = atividadeService.selecionar(atividade.getCodigoAtividade());
		mav.addObject("Atividade", atividadeSelecionada);
		return mav;
	}
	
	@RequestMapping(value="/atividade/alterar", method=RequestMethod.POST)
	public ModelAndView alterar(@RequestBody Atividade atividade) {
		mav.clear();
		mav.setViewName("redirect:/atividade/");
		atividadeService.alterar(atividade);
		
		return mav;
	}
	
	@RequestMapping(value="/atividade/deletar", method=RequestMethod.POST)
	public ModelAndView deletar(@ModelAttribute Atividade atividade) {
		mav.clear();
		mav.setViewName("redirect:/atividade/");
		boolean retorno = atividadeService.deletar(atividade.getCodigoAtividade());
		return mav;
	}

}