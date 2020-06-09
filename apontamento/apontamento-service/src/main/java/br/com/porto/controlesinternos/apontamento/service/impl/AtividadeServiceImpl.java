package br.com.porto.controlesinternos.apontamento.service.impl;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.AtividadeDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
import br.com.porto.controlesinternos.apontamento.service.AtividadeService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AtividadeServiceImpl implements AtividadeService {
	
	@Inject
	AtividadeDAO atividadeDAO;

	public List<Atividade> listar() {
		List<AtividadeEntity> listaAtividadeEntity = atividadeDAO.listar();
		List<Atividade> listaAtividade = new ArrayList<Atividade>();
		for(AtividadeEntity atividadeEntity:listaAtividadeEntity) {
			listaAtividade.add(atividadeEntityToAtividade(atividadeEntity));
		}
		return listaAtividade;
	}
	
	
	@Override
	public boolean inserir(Atividade atividade) {
		AtividadeEntity atividadeEntity = atividadeToAtividadeEntity(atividade);
		
		this.atividadeDAO.inserir(atividadeEntity);
		return false;
	}

	@Override
	public boolean alterar(Atividade atividade) {
		AtividadeEntity atividadeEntity = atividadeToAtividadeEntity(atividade);
		this.atividadeDAO.alterar(atividadeEntity);
		return true;
	}
	
	@Override
	public Atividade selecionar(long codigo) {
		AtividadeEntity atividadeEntity = this.atividadeDAO.selecionarPorCodigo(codigo);
		Atividade atividade = atividadeEntityToAtividade(atividadeEntity);
		return atividade;
	}
	
	@Override
	public boolean deletar(long codigo) {
		AtividadeEntity atividadeEntity = this.atividadeDAO.selecionarPorCodigo(codigo);
		this.atividadeDAO.deletar(atividadeEntity);
		return true;
	}

	private AtividadeEntity atividadeToAtividadeEntity(Atividade atividade) {
		AtividadeEntity atividadeEntity = new AtividadeEntity();
		
		UsuarioEntity usuarioEntity = new UsuarioEntity();
		usuarioEntity.setCodigo(atividade.getAutorEncerramento().getCodigo());
		atividadeEntity.setCodigoAtividade(atividade.getCodigoAtividade());
		atividadeEntity.setNomeAtividade(atividade.getNomeAtividade());
		atividadeEntity.setAutorEncerramento(usuarioEntity);
		atividadeEntity.setDataAbertura(atividade.getDataAbertura());
		atividadeEntity.setDataFinalizacao(atividade.getDataFinalizacao());
		
		DemandaEntity demandaEntity = new DemandaEntity();
		demandaEntity.setCodigoDemanda(atividade.getDemanda().getCodigoDemanda());
		atividadeEntity.setDemanda(demandaEntity);
		
		atividadeEntity.setHorasApontadas(atividade.getHorasApontadas());
		atividadeEntity.setHorasEstimadas(atividade.getHorasEstimadas());
		atividadeEntity.setStatus(EnumStatus.APROVACAO);
		
		return atividadeEntity;
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
