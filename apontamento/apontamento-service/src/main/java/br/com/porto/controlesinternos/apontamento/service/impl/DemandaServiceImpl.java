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
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
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
			if (demanda.getAtividades() != null && demanda.getAutorEncerramento() != null
					&& demanda.getDataAbertura() != null && demanda.getDataFinalizacao() != null
					&& demanda.getDescricao() != null && demanda.getGrupo() != null
					&& demanda.getHorasApontadas() != null && demanda.getHorasEstimadas() != null) {
				Object registroExistente = demandaDAO.selecionaPorDescricao(demanda.getDescricao());
				if (registroExistente == null) {
					DemandaEntity demandaEntity = demandaToDemandaEntity(demanda);
					demandaEntity.setStatus(EnumStatus.APROVACAO);
					demandaDAO.inserir(demandaEntity);
					retorno = true;
				}
			}
		}
		return retorno;
	}

	@Override
	public void alterar(Demanda demanda) {
		DemandaEntity demandaEntity = demandaToDemandaEntity(demanda);		
		this.demandaDAO.alterar(demandaEntity);
	}

	@Override
	public void deletar(long codigo) {
		DemandaEntity demandaEntity = demandaDAO.selecionarPorCodigo(codigo);
		demandaDAO.deletar(demandaEntity);
	}

	@Override
	public Demanda selecionarPorCodigo(long codigo) {
		Demanda demanda = new Demanda();
		DemandaEntity demandaEntity = demandaDAO.selecionarPorCodigo(codigo);
		
		if(demandaEntity != null) {
			demandaEntityToDemanda(demandaEntity);
		}
		return demanda;
	}
	
	@Override
	public List<Demanda> listar() {
		List<DemandaEntity> listaDemandaEntity = this.demandaDAO.listar();
		List<Demanda> listaDemanda = new ArrayList<Demanda>();
		
		for(DemandaEntity demandaEntity: listaDemandaEntity) {
			
			listaDemanda.add(demandaEntityToDemanda(demandaEntity));
		}
		return listaDemanda;
	}

	public Demanda demandaEntityToDemanda(DemandaEntity demandaEntity) {
		Demanda demanda = new Demanda();
		List<Atividade> atividades = new ArrayList<Atividade>();
		for(AtividadeEntity atividadeEntity: demandaEntity.getAtividades()) {
			atividades.add(atividadeEntityToAtividade(atividadeEntity));
		}
		demanda.setAtividades(atividades);
		Usuario usuario = new Usuario();
		usuario.setCodigo(demandaEntity.getAutorEncerramento().getCodigo());
		demanda.setAutorEncerramento(usuario);
		demanda.setCodigoDemanda(demandaEntity.getCodigoDemanda());
		demanda.setDataAbertura(demandaEntity.getDataAbertura());
		demanda.setDataFinalizacao(demandaEntity.getDataFinalizacao());
		demanda.setDescricao(demandaEntity.getDescricao());
		demanda.setGrupo(grupoEntityToGrupo(demandaEntity.getGrupo()));
		demanda.setHorasApontadas(demandaEntity.getHorasApontadas());
		demanda.setHorasEstimadas(demanda.getHorasEstimadas());
		demanda.setStatus(demanda.getStatus());
		return demanda;
	}
	
	public DemandaEntity demandaToDemandaEntity(Demanda demanda) {
		DemandaEntity demandaEntity = new DemandaEntity();
		demandaEntity.setCodigoDemanda(demanda.getCodigoDemanda());
		List<AtividadeEntity> atividadesEntity = null;
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
		demandaEntity.setStatus(EnumStatus.APROVACAO);
		return demandaEntity;
	}
	
	public Grupo grupoEntityToGrupo(GrupoEntity grupoEntity) {
		Grupo grupo = new Grupo();
		grupo.setCodigo(grupoEntity.getCodigo());
		grupo.setNome(grupoEntity.getNome());
		grupo.setTipo(grupoEntity.getTipo());
		
		return grupo;
		
	}
	
	public Atividade atividadeEntityToAtividade(AtividadeEntity atividadeEntity) {
		Atividade atividade = new Atividade();
			
			Usuario usuario= new Usuario();
			usuario.setCodigo(atividadeEntity.getAutorEncerramento().getCodigo());
			atividade.setAutorEncerramento(usuario);
			atividade.setDataAbertura(atividadeEntity.getDataAbertura());
			atividade.setDataFinalizacao(atividadeEntity.getDataFinalizacao());
			
			Demanda demanda = new Demanda();
			demanda.setCodigoDemanda(atividadeEntity.getDemanda().getCodigoDemanda());
			atividade.setDemanda(demanda);
			
			atividade.setHorasApontadas(atividadeEntity.getHorasApontadas());
			atividade.setHorasEstimadas(atividadeEntity.getHorasEstimadas());
			atividade.setStatus(atividadeEntity.getStatus());
			
			return atividade;
		}
	


}
