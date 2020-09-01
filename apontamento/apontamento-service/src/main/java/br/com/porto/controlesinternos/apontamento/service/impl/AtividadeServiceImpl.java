package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.AtividadeDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.model.Apontamento;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;
import br.com.porto.controlesinternos.apontamento.model.Grupo;
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
		for (AtividadeEntity atividadeEntity : listaAtividadeEntity) {
			Atividade atividade = atividadeEntityToAtividade(atividadeEntity);
			listaAtividade.add(atividade);

		}
		return listaAtividade;
	}

	@Override
	public boolean inserir(Atividade atividade) {
		boolean retorno = false;
		if (atividade != null) {
			if (atividade.getNomeAtividade() != null && atividade.getDemanda() != null
					&& atividade.getHorasEstimadas() != null) {
				Object registroExistente = atividadeDAO.selecionarPorNome(atividade.getNomeAtividade());
				if (registroExistente == null) {
					AtividadeEntity atividadeEntity = atividadeToAtividadeEntity(atividade);
					atividadeEntity.setStatus(EnumStatus.ATIVO);

					this.atividadeDAO.inserir(atividadeEntity);
					retorno = true;
				}
			}
		}
		return retorno;
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

//		UsuarioEntity usuarioEntity = new UsuarioEntity();
//		usuarioEntity.setCodigo(atividade.getAutorEncerramento().getCodigo());
		atividadeEntity.setCodigoAtividade(atividade.getCodigoAtividade());
		atividadeEntity.setNomeAtividade(atividade.getNomeAtividade());
//		atividadeEntity.setAutorEncerramento(usuarioEntity);
		atividadeEntity.setAutorEncerramento(null);
		atividadeEntity.setDataAbertura(new Date(Calendar.getInstance().getTimeInMillis()));
		atividadeEntity.setDataFinalizacao(atividade.getDataFinalizacao());

		DemandaEntity demandaEntity = new DemandaEntity();
		demandaEntity.setCodigoDemanda(atividade.getDemanda().getCodigoDemanda());
		atividadeEntity.setDemanda(demandaEntity);

		atividadeEntity.setHorasApontadas(atividade.getHorasApontadas());
		atividadeEntity.setHorasEstimadas(atividade.getHorasEstimadas());
		atividadeEntity.setStatus(EnumStatus.ATIVO);

		return atividadeEntity;
	}

	public Atividade atividadeEntityToAtividade(AtividadeEntity atividadeEntity) {
		Atividade atividade = new Atividade();

		atividade.setCodigoAtividade(atividadeEntity.getCodigoAtividade());
		atividade.setNomeAtividade(atividadeEntity.getNomeAtividade());
		atividade.setAutorEncerramento(null);
		atividade.setDataAbertura(atividadeEntity.getDataAbertura());
		atividade.setDataFinalizacao(atividadeEntity.getDataFinalizacao());

		Demanda demanda = new Demanda();
		demanda.setCodigoDemanda(atividadeEntity.getDemanda().getCodigoDemanda());
		demanda.setDescricao(atividadeEntity.getDemanda().getDescricao());

		Grupo grupo = new Grupo();
		grupo.setCodigo(atividadeEntity.getDemanda().getGrupo().getCodigo());
		grupo.setNome(atividadeEntity.getDemanda().getGrupo().getNome());
		demanda.setGrupo(grupo);
		atividade.setDemanda(demanda);

		atividade.setHorasApontadas(atividadeEntity.getHorasApontadas()/60);
		atividade.setHorasEstimadas(atividadeEntity.getHorasEstimadas());
		atividade.setStatus(atividadeEntity.getStatus());
		
		List<Apontamento> listaApontamentos = new ArrayList<Apontamento>();
		for (ApontamentoEntity apontamentoEntity : atividadeEntity.getApontamentos()) {
			listaApontamentos.add(apontamentoEntityToApontamento(apontamentoEntity));
		}
		atividade.setApontamentos(listaApontamentos);

		return atividade;
	}

	public Apontamento apontamentoEntityToApontamento(ApontamentoEntity apontamentoEntity) {
		Apontamento apontamento = new Apontamento();
		apontamento.setCodigo(apontamentoEntity.getCodigo());
		apontamento.setHorasApontadas(apontamentoEntity.getHorasApontadas());
		Usuario usuario = new Usuario();
		usuario.setCodigo(apontamentoEntity.getFuncionario().getCodigo());
		apontamento.setFuncionario(usuario);
		apontamento.setDataApontamento(apontamentoEntity.getData());
		Atividade atividade = new Atividade();
		atividade.setCodigoAtividade(apontamentoEntity.getAtividade().getCodigoAtividade());
		apontamento.setAtividade(atividade);
		return apontamento;

	}

	@Override
	public List<String> getDatas() {

		int diaAtual = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		int i = (diaAtual < 16 ? 1 : 16);
		int ultimoDia = (i == 1 ? 15 : Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH));
		List<String> datas = new ArrayList<String>();
		while (i <= ultimoDia) {
			datas.add(i + "/" + (Calendar.getInstance().get(Calendar.MONTH) + 1));
			i++;
		}
		return datas;
	}

	@Override
	public List<Atividade> listarByDemanda(int codigoDemanda) {
		List<AtividadeEntity> listaAtividadeEntity = atividadeDAO.listarByDemanda(new Long(codigoDemanda));
		List<Atividade> listaAtividade = new ArrayList<Atividade>();
		for (AtividadeEntity atividadeEntity : listaAtividadeEntity) {
			Atividade atividade = atividadeEntityToAtividade(atividadeEntity);
			
			listaAtividade.add(atividade);

		}
		return listaAtividade;
	}
	
//	@Override
	public List<Apontamento> listarPorData(Long codigoAtividade){
		return null;
		
	}
//	@Override
//	public List<Atividade> listarByDemanda(int codigoDemanda) {
//		List<AtividadeEntity> listaAtividadeEntity = atividadeDAO.listarByDemanda(new Long(codigoDemanda));
//		List<Atividade> listaAtividade = new ArrayList<Atividade>();
//		for (AtividadeEntity atividadeEntity : listaAtividadeEntity) {
//			Atividade atividade = atividadeEntityToAtividade(atividadeEntity);
//			
//			listaAtividade.add(atividade);
//
//		}
//		return listaAtividade;
//	}
	
	@Override
	public int somarHorasAtividadesByDemanda(List<Atividade> atividadesUsuario) {
		int horasDemandas = 0;
		for(Atividade atividadeEntity: atividadesUsuario){
			horasDemandas += atividadeEntity.getHorasApontadas().intValue();
		}
		
		return horasDemandas;
	}
}
