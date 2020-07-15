package br.com.porto.controlesinternos.apontamento.web.controller;

import java.util.ArrayList;


import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Grupo;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumPerfilUsuario;
import br.com.porto.controlesinternos.apontamento.service.DemandaService;
import br.com.porto.controlesinternos.apontamento.service.GrupoService;

@Controller
public class DemandaController {

	@Inject
	DemandaService demandaService;

	@Inject
	GrupoService grupoService;

	private final ModelAndView mav = new ModelAndView();

	@RequestMapping(value = "/demanda/", method = RequestMethod.GET)
	public ModelAndView listar() {
		mav.clear();
		mav.setViewName("visualizarDemandas");
		ArrayList<Demanda> demandas = (ArrayList<Demanda>) demandaService.listar();
		ArrayList<Grupo> grupos = (ArrayList<Grupo>) grupoService.listar();
		mav.addObject("demandas", demandas);
		mav.addObject("grupos", grupos);

		return mav;
	}	

	@RequestMapping(value = "/demanda/inserir", method = RequestMethod.POST)
	public ModelAndView listar(@ModelAttribute Demanda demanda, HttpSession session) {
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
		if (usuario.getPerfil().getCodigo() == EnumPerfilUsuario.ADMINISTRADOR.getCodigo()
				|| usuario.getPerfil().getCodigo() == EnumPerfilUsuario.LIDER.getCodigo()) {
			mav.clear();
			mav.setViewName("redirect:/demanda/");
			boolean retorno = demandaService.inserir(demanda);
			if (retorno) {
				System.out.println("Demanda Incluída com sucesso.");
			} else {
				System.out.println("Falha ao incluir demanda.");
			}
		} else {
			mav.addObject("msg", "Demanda não inserida");
			mav.setViewName("redirect:/demanda/");
		}

		return mav;

	}

	@RequestMapping(value = "/demanda/selecionar/{codigo}", method = RequestMethod.GET)
	public ModelAndView selecionarPorCodigo(@PathVariable("codigo") int codigo) {
		mav.clear();
		mav.setViewName("visualizarDemandas");

		Demanda demanda = demandaService.selecionarPorCodigo(codigo);
		if (demanda != null) {
			System.out.println("Demanda encontrada!");
			mav.addObject("demanda", demanda);
		} else {
			System.out.println("Demanda não encontrada");
		}

		return mav;
	}

	@RequestMapping(value = "/demanda/alterar", method = RequestMethod.POST)
	public ModelAndView alterar(@ModelAttribute Demanda demanda) {
		mav.clear();
		mav.setViewName("redirect:/demanda/");
		demandaService.alterar(demanda);
		System.out.println("Demanda alterada.");
		return mav;

	}

	@RequestMapping(value = "/demanda/deletar/", method = RequestMethod.POST)
	public ModelAndView deletarDemanda(@ModelAttribute Demanda demanda) {
		mav.clear();
		mav.setViewName("redirect:/demanda/");
		boolean retorno = demandaService.deletar(demanda.getCodigoDemanda());
		if (retorno) {
			System.out.println("Deletado com sucesso...");
		} else {
			System.out.println("Erro ao Deletar Demanda...");
		}
		return mav;

	}
}
