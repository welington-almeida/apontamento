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

import br.com.porto.controlesinternos.apontamento.model.Apontamento;

import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.service.ApontamentoService;


@Controller
public class ApontamentoController {
	
	@Inject
	private ApontamentoService apontamentoService;
	
	private final ModelAndView mav = new ModelAndView();
	
	@RequestMapping(value="/apontamentos/",method=RequestMethod.GET)
	public ModelAndView listar(){
		mav.clear();
		mav.setViewName("index");
		List<Apontamento> apontamentos = apontamentoService.listar();
		mav.addObject("apontamentos", apontamentos);
		return mav;
	}
	
	@RequestMapping(value="/apontamento/inserir",method=RequestMethod.POST)
	public ModelAndView inserir(@RequestBody Apontamento apontamento){
		mav.clear();
		mav.setViewName("novoApontamento");
		boolean retorno = apontamentoService.inserir(apontamento);
		if(retorno){
			System.out.println("Incluido com sucesso...");
		}
		else{
			System.out.println("Erro ao Incluir Apontamento(s)...");
		}
		return mav;
	}
	
	@RequestMapping(value="/apontamento/alterar",method=RequestMethod.PUT)
	public ModelAndView alterar(@RequestBody Apontamento apontamento){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = apontamentoService.alterar(apontamento);
		if(retorno){
			System.out.println("Alterado com sucesso...");
		}
		else{
			System.out.println("Erro ao Alterar Apontamento...");
		}
		return mav;
	}
	
	@RequestMapping(value="/apontamento/selecionar/{codigo}",method=RequestMethod.GET)
	public ModelAndView selecionar(@PathVariable("codigo") long codigoApontamento){
		mav.clear();
		mav.setViewName("index");
		Apontamento apontamento = apontamentoService.selecionar(codigoApontamento);
		mav.addObject("apontamento", apontamento);
		return mav;
	}
	
	@RequestMapping(value="/apontamento/meusApontamentos/",method=RequestMethod.POST)
	public ModelAndView listarMeusApontamentos(@ModelAttribute Usuario usuario){
		mav.clear();		
		if(usuario.getCodigo() > 0) {
		mav.setViewName("index");
		List<Apontamento> meusApontamentos = apontamentoService.meusApontamentos(usuario.getCodigo());
		mav.addObject("meusApontamentos", meusApontamentos);
		}
		else {
			mav.setViewName("redirect:/meusApontamentos/");
		}
		return mav;
	}
	
	@RequestMapping(value="/apontamento/deletar",method=RequestMethod.DELETE)
	public ModelAndView deletar(@RequestBody long codigoApontamento){
		mav.clear();
		mav.setViewName("index");
		boolean retorno = apontamentoService.deletar(codigoApontamento);
		if(retorno){
			System.out.println("Excluído com sucesso...");
		}
		else{
			System.out.println("Erro ao Excluir Apontamento...");
		}
		return mav;
	}
}


