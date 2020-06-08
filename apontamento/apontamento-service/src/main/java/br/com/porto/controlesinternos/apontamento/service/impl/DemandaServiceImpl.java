package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.DemandaDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Grupo;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.service.DemandaService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class DemandaServiceImpl implements DemandaService {

	@Inject
	DemandaDAO demandaDAO;

	@Override
	public boolean inserir(Demanda demanda) {
		boolean retorno = false;
		if (demanda != null) {
			if (demanda.getStatus() != null && demanda.getAtividades() != null && demanda.getAutorEncerramento() != null
					&& demanda.getDataAbertura() != null && demanda.getDataFinalizacao() != null
					&& demanda.getDescricao() != null && demanda.getGrupo() != null
					&& demanda.getHorasApontadas() != null && demanda.getHorasEstimadas() != null) {
				Object registroExistente = demandaDAO.selecionaPorDescricao(demanda.getDescricao());
				if (registroExistente == null) {
					DemandaEntity demandaEntity = new DemandaEntity();
					// List<AtividadeEntity> atividadesEntity = new ArrayList<AtividadeEntity>();
					List<AtividadeEntity> atividadesEntity = null;

					// for(Atividade atividade : demanda.getAtividades()) {
					// AtividadeEntity atividadeEntity = new AtividadeEntity();
					// atividadeEntity.setNomeAtividade(atividade.getNomeAtividade());
					// atividadesEntity.add(atividadeEntity);
					// }

					demandaEntity.setAtividades(atividadesEntity);

					UsuarioEntity usuarioEntity = new UsuarioEntity();
					usuarioEntity.setCodigo(demanda.getAutorEncerramento().getCodigo());
					demandaEntity.setAutorEncerramento(usuarioEntity);
					demandaEntity.setDataAbertura(demanda.getDataAbertura());
					demandaEntity.setDataFinalizacao(demanda.getDataFinalizacao());
					demandaEntity.setDescricao(demanda.getDescricao());

					GrupoEntity grupoEntity = new GrupoEntity();
					grupoEntity.setCodigo(demanda.getGrupo().getCodigo());
					demandaEntity.setGrupo(grupoEntity);
					demandaEntity.setHorasEstimadas(demanda.getHorasEstimadas());
					demandaEntity.setHorasApontadas(demanda.getHorasApontadas());
					demandaEntity.setStatus(demanda.getStatus());

					demandaDAO.inserir(demandaEntity);

					retorno = false;
				}
			}
		}
		return retorno;
	}

	@Override
	public Demanda selecionarPorCodigo(int codigo) {
		Demanda demanda = new Demanda();
		DemandaEntity demandaEntity = demandaDAO.selecionarPorCodigo(codigo);
		
		if(demandaEntity != null) {
		List<Atividade> listaAtividades = new ArrayList<Atividade>();
		
		for(AtividadeEntity atividadeEntity:demandaEntity.getAtividades()) {
			Atividade atividade = new Atividade();
			atividade.setCodigoAtividade(atividadeEntity.getCodigoAtividade());
			atividade.setNomeAtividade(atividadeEntity.getNomeAtividade());
			
			listaAtividades.add(atividade);
		}
		
		demanda.setAtividades(listaAtividades);
		
		Usuario usuario = new Usuario();
		usuario.setNome(demandaEntity.getAutorEncerramento().getNome());
		demanda.setAutorEncerramento(usuario);
		demanda.setCodigoDemanda(demandaEntity.getCodigoDemanda());
		demanda.setDataAbertura(demandaEntity.getDataAbertura());
		demanda.setDataFinalizacao(demandaEntity.getDataFinalizacao());
		demanda.setDescricao(demandaEntity.getDescricao());
		
		Grupo grupo = new Grupo();
		grupo.setCodigo(demandaEntity.getGrupo().getCodigo());
		grupo.setNome(demandaEntity.getGrupo().getNome());
		grupo.setTipo(demandaEntity.getGrupo().getTipo());
		demanda.setGrupo(grupo);
		
		demanda.setHorasApontadas(demandaEntity.getHorasApontadas());
		demanda.setHorasEstimadas(demandaEntity.getHorasEstimadas());
		demanda.setStatus(demandaEntity.getStatus());
		}
		return demanda;
	}

	@Override
	public void alterar(Demanda demanda) {
		DemandaEntity demandaEntity = new DemandaEntity();
		
		
		List<AtividadeEntity> listaAtividades = new ArrayList<AtividadeEntity>();
		
		for(Atividade atividade:demanda.getAtividades()) {
			AtividadeEntity atividadeEntity = new AtividadeEntity();
			atividadeEntity.setCodigoAtividade(atividade.getCodigoAtividade());
			atividadeEntity.setNomeAtividade(atividade.getNomeAtividade());
			
			listaAtividades.add(atividadeEntity);
		}
		demandaEntity.setAtividades(listaAtividades);
		
		UsuarioEntity usuarioEntity = new UsuarioEntity();
		usuarioEntity.setCodigo(demanda.getAutorEncerramento().getCodigo());
		usuarioEntity.setEmail(demanda.getAutorEncerramento().getEmail());
		usuarioEntity.setNome(demanda.getAutorEncerramento().getNome());
		usuarioEntity.setPerfil(demanda.getAutorEncerramento().getPerfil());
		
		demandaEntity.setAutorEncerramento(usuarioEntity);
		usuarioEntity.setNome(demandaEntity.getAutorEncerramento().getNome());
		demandaEntity.setCodigoDemanda(demanda.getCodigoDemanda());
		demandaEntity.setDataAbertura(demanda.getDataAbertura());
		demandaEntity.setDataFinalizacao(demanda.getDataFinalizacao());
		demandaEntity.setDescricao(demanda.getDescricao());
		
		
		GrupoEntity grupoEntity = new GrupoEntity();
		grupoEntity.setCodigo(demanda.getGrupo().getCodigo());
		grupoEntity.setNome(demanda.getGrupo().getNome());
		grupoEntity.setTipo(demanda.getGrupo().getTipo());
		
		demandaEntity.setGrupo(grupoEntity);
		
		
		
		demandaEntity.setHorasApontadas(demanda.getHorasApontadas());
		demandaEntity.setHorasEstimadas(demanda.getHorasEstimadas());
		demandaEntity.setStatus(demanda.getStatus());
		
		this.demandaDAO.alterar(demandaEntity);
	}

	@Override
	public void deletar(int codigo) {
		DemandaEntity demanda = demandaDAO.selecionarPorCodigo(codigo);
		demandaDAO.deletar(demanda);
	}

	@Override
	public List<Demanda> listar() {
		// TODO Auto-generated method stub
		return null;
	}

}
