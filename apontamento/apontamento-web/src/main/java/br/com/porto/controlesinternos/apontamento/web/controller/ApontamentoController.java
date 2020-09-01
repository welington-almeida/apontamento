package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.model.Apontamento;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.service.ApontamentoService;
import br.com.porto.controlesinternos.apontamento.service.AtividadeService;
import br.com.porto.controlesinternos.apontamento.service.DemandaService;

@Controller
public class ApontamentoController {

	@Inject
	private ApontamentoService apontamentoService;
	
	@Inject
	private AtividadeService atividadeService;
	
	@Inject
	private DemandaService demandaService;

	private final ModelAndView mav = new ModelAndView();

	@RequestMapping(value = "/apontamentos/", method = RequestMethod.GET)
	public ModelAndView listar() {
		mav.clear();
		mav.setViewName("apontamentos");
		List<Apontamento> apontamentos = apontamentoService.listar();
		mav.addObject("apontamentos", apontamentos);
		return mav;
	}

	@RequestMapping(value = "/apontamento/inserir/", method = RequestMethod.POST)
	public ModelAndView inserir(int[] codigoAtividade, String[] apontamentos, String[] dataAtual, int[] codigoApontamento) {
		mav.clear();
		mav.setViewName("redirect:/novoApontamento");
		boolean retorno = apontamentoService.inserir(codigoAtividade, apontamentos, dataAtual, codigoApontamento);
		if (retorno) {
			System.out.println("Incluido com sucesso...");
		} else {
			System.out.println("Erro ao Incluir Apontamento(s)...");
		}
		return mav;
	}

	@RequestMapping(value = "/apontamento/alterar", method = RequestMethod.PUT)
	public ModelAndView alterar(@RequestBody Apontamento apontamento) {
		mav.clear();
		mav.setViewName("redirect:/meusApontamentos");
		boolean retorno = apontamentoService.alterar(apontamento);
		if (retorno) {
			System.out.println("Alterado com sucesso...");
		} else {
			System.out.println("Erro ao Alterar Apontamento...");
		}
		return mav;
	}

	@RequestMapping(value = "/apontamento/selecionar/{codigo}", method = RequestMethod.GET)
	public ModelAndView selecionar(@PathVariable("codigo") long codigoApontamento) {
		mav.clear();
		mav.setViewName("index");
		Apontamento apontamento = apontamentoService.selecionar(codigoApontamento);
		mav.addObject("apontamento", apontamento);
		return mav;
	}

	@RequestMapping(value = "/apontamento/meusApontamentos", method = RequestMethod.GET)
	public ModelAndView listarMeusApontamentos(@ModelAttribute Usuario usuario, HttpSession session, Long codigoDemanda) {
		mav.clear();
		if (session.getAttribute("usuarioLogado") != null) {
			Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
			List<String> datas = atividadeService.getDatas();
			mav.setViewName("novoApontamento");
			List<Apontamento> meusApontamentos = new ArrayList<Apontamento>();
			List<Atividade> atividadesUsuario = new ArrayList<Atividade>();
			List<Demanda> demandasUsuario = new ArrayList<Demanda>();
			if(codigoDemanda == null) {
//				meusApontamentos = apontamentoService.meusApontamentos(usuarioLogado.getCodigo());
				atividadesUsuario = atividadeService.listar();
			} else {
//				meusApontamentos = apontamentoService.meusApontamentosByDemanda(usuarioLogado.getCodigo(), codigoDemanda.intValue());
				atividadesUsuario = atividadeService.listarByDemanda(codigoDemanda.intValue());				
			}
			demandasUsuario = demandaService.listarDemandasUsuario(usuarioLogado.getCodigo());

			Long horasDemandas = new Long(atividadeService.somarHorasAtividadesByDemanda(atividadesUsuario)); 
			
			mav.addObject("horasSomadasDasAtividades", horasDemandas);
			mav.addObject("apontamentos", meusApontamentos);
			mav.addObject("atividades", atividadesUsuario);
			mav.addObject("demandas", demandasUsuario);
			
			mav.addObject("datas", datas);
		} else {
			mav.setViewName("redirect:/login");
		}
		return mav;
	}
	
	
//	@RequestMapping(value = "/apontamento/meusApontamentosByDemanda", method = RequestMethod.GET)
//	public ModelAndView listarMeusApontamentosByDemanda(@ModelAttribute Usuario usuario, HttpSession session, int codigoDemanda) {
//		mav.clear();
//		if (session.getAttribute("usuarioLogado") != null) {
//			Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");
//			List<String> datas = atividadeService.getDatas();
//			mav.setViewName("novoApontamento");
//
//			mav.addObject("apontamentos", meusApontamentos);
//			mav.addObject("atividades", atividadesUsuario);
//			mav.addObject("demandas", demandasUsuario);
//			mav.addObject("datas", datas);
//		} else {
//			mav.setViewName("redirect:/login");
//		}
//		return mav;
//	}

	@RequestMapping(value = "/apontamento/deletar", method = RequestMethod.DELETE)
	public ModelAndView deletar(@RequestBody long codigoApontamento) {
		mav.clear();
		mav.setViewName("index");
		boolean retorno = apontamentoService.deletar(codigoApontamento);
		if (retorno) {
			System.out.println("Excluído com sucesso...");
		} else {
			System.out.println("Erro ao Excluir Apontamento...");
		}
		return mav;
	}
	
	
}
