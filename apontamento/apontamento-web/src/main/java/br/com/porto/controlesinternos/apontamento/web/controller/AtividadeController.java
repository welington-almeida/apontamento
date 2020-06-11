package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.service.AtividadeService;

@Controller
public class AtividadeController {

	@Inject
	private AtividadeService atividadeService;
	
	private final ModelAndView mav = new ModelAndView();
	
	
	@RequestMapping(value="/atividade/", method=RequestMethod.GET)
	public ModelAndView listar() {
		mav.clear();
		mav.setViewName("index");
		List<Atividade> atividades = atividadeService.listar();
		mav.addObject("atividades", atividades);
		
		return mav;
		
	}
	@RequestMapping(value="/atividade/inserir", method=RequestMethod.POST)
	public ModelAndView inserir(@RequestBody Atividade atividade) {
		mav.clear();
		mav.setViewName("index");
		boolean retorno = atividadeService.inserir(atividade);
		if(retorno) {
			System.out.println("Atividade Incluída com Sucesso.");
		} else {
			System.out.println("Falha ao incluir atividade. ");
		}
		
		return mav;
	}
	
	@RequestMapping(value="/atividade/selecionar/{codigo}", method=RequestMethod.GET)
	public ModelAndView selecionarPorCodigo(@PathVariable int codigo) {
		mav.clear();
		mav.setViewName("index");
		Atividade atividade = atividadeService.selecionar(codigo);
		mav.addObject("Atividade", atividade);
		return mav;
	}
	
	@RequestMapping(value="/atividade/alterar", method=RequestMethod.POST)
	public ModelAndView alterar(@RequestBody Atividade atividade) {
		mav.clear();
		mav.setViewName("index");
		atividadeService.alterar(atividade);
		
		return mav;
	}
	
	@RequestMapping(value="/atividade/deletar/{codigo}", method=RequestMethod.DELETE)
	public ModelAndView deletar(@PathVariable int codigo) {
		mav.clear();
		mav.setViewName("index");
		boolean retorno = atividadeService.deletar(codigo);
		return mav;
	}

}