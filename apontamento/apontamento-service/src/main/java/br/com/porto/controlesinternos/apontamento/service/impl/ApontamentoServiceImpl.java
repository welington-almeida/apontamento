package br.com.porto.controlesinternos.apontamento.service.impl;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.ApontamentoDAO;
import br.com.porto.controlesinternos.apontamento.dao.AtividadeDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
import br.com.porto.controlesinternos.apontamento.model.Apontamento;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
import br.com.porto.controlesinternos.apontamento.service.ApontamentoService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ApontamentoServiceImpl implements ApontamentoService {

	@Inject
	private ApontamentoDAO apontamentoDAO;
	
	@Inject
	private AtividadeDAO atividadeDAO;

	@Override
	public boolean inserir(Apontamento apontamento) {
		boolean retorno = false;
		if (apontamento != null) {
			if (!(apontamento.getFuncionario() != null && apontamento.getFuncionario().getCodigo() != 0
					&& apontamento.getGrupo() != null && apontamento.getGrupo().getCodigo() != 0
					&& apontamento.getDemanda() != null && apontamento.getDemanda().getCodigoDemanda() != 0
					&& apontamento.getAtividade() != null && apontamento.getDataApontamento() != null
					&& apontamento.getHorasApontadas() != null)) {

				ApontamentoEntity apontamentoEntity = new ApontamentoEntity();
				apontamentoEntity.setCodigo(apontamento.getCodigo());
				UsuarioEntity usuarioEntity = new UsuarioEntity();
				usuarioEntity.setCodigo(apontamento.getFuncionario().getCodigo());
				apontamentoEntity.setFuncionario(usuarioEntity);
				AtividadeEntity atividadeEntity = new AtividadeEntity();
				atividadeEntity.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
				apontamentoEntity.setAtividade(atividadeEntity);
				apontamentoEntity.setData(apontamento.getDataApontamento());
				apontamentoEntity.setHorasApontadas(apontamento.getHorasApontadas());

				apontamentoDAO.inserir(apontamentoEntity);
				retorno = true;

			}
		}
		return retorno;
	}

	@Override
	public Apontamento selecionar(long codigo) {
		ApontamentoEntity apontamentoEntity = apontamentoDAO.selecionarPorCodigo(codigo);
		Apontamento apontamento = null;
		if (apontamentoEntity != null) {
			apontamento = new Apontamento();

			apontamentoEntity.setCodigo(apontamento.getCodigo());
			UsuarioEntity usuarioEntity = new UsuarioEntity();
			usuarioEntity.setCodigo(apontamento.getFuncionario().getCodigo());
			apontamentoEntity.setFuncionario(usuarioEntity);
			AtividadeEntity atividadeEntity = new AtividadeEntity();
			atividadeEntity.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
			apontamentoEntity.setAtividade(atividadeEntity);
			apontamentoEntity.setData(apontamento.getDataApontamento());
			apontamentoEntity.setHorasApontadas(apontamento.getHorasApontadas());

		}
		return apontamento;

	}

	@Override
	public boolean alterar(Apontamento apontamento) {
		ApontamentoEntity apontamentoEntity = new ApontamentoEntity();
		
		apontamentoEntity.setCodigo(apontamento.getCodigo());
		AtividadeEntity atividade = new AtividadeEntity();
		atividade.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
		apontamentoEntity.setAtividade(atividade);
		apontamentoEntity.setData(apontamento.getDataApontamento());
		apontamentoEntity.setHorasApontadas(apontamento.getHorasApontadas());
		
		apontamentoDAO.alterar(apontamentoEntity);
		
		return false;
	}

	@Override
	public boolean deletar(long codigo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Apontamento> listar() {
		List<ApontamentoEntity> apontamentosEntities = apontamentoDAO.listar();
		List<Apontamento> apontamentos = new ArrayList<Apontamento>();
		if (apontamentosEntities != null && !apontamentosEntities.isEmpty()) {
			for (ApontamentoEntity entity : apontamentosEntities) {
				Apontamento apontamento = new Apontamento();
				apontamento.setCodigo(entity.getCodigo());
				Usuario usuario = new Usuario();
				usuario.setCodigo(apontamento.getFuncionario().getCodigo());
				apontamento.setFuncionario(usuario);
				Atividade atividade = new Atividade();
				atividade.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
				apontamento.setAtividade(atividade);
				apontamento.setDataApontamento(entity.getData());
				apontamento.setHorasApontadas(entity.getHorasApontadas());
			}
		}
		return apontamentos;

	}

	@Override
	public List<Apontamento> meusApontamentos(long codigo) {
		//UsuarioEntity funcionario = new UsuarioEntity();
		//funcionario.setCodigo(codigo);
		List<ApontamentoEntity> listaApontamentos = apontamentoDAO.meusApontamentos(codigo);
		List<Apontamento> meusApontamentos = new ArrayList<Apontamento>();
		
		if (listaApontamentos != null) {

			for (ApontamentoEntity apontamentoEntity : listaApontamentos) {
				Apontamento apontamento = new Apontamento();
				apontamento.setCodigo(apontamentoEntity.getCodigo());

				Usuario usuario = new Usuario();
				usuario.setCodigo(apontamentoEntity.getFuncionario().getCodigo());
				apontamento.setFuncionario(usuario);

				Atividade atividade = new Atividade();
				atividade.setCodigoAtividade(apontamentoEntity.getAtividade().getCodigoAtividade());
				apontamento.setAtividade(atividade);

				apontamento.setDataApontamento(apontamentoEntity.getData());
				apontamento.setHorasApontadas(apontamentoEntity.getHorasApontadas());

				meusApontamentos.add(apontamento);
			}
		}
		return meusApontamentos;
	}
	
	@Override
	public void atualizarHorasApontadas(Long codigoAtividade, Long codigoDemanda) {
		AtividadeEntity atividadeEntity = new AtividadeEntity();
		atividadeEntity.setCodigoAtividade(codigoAtividade);
		atividadeDAO.atualizarHorasApontadasAtividade(atividadeEntity);
		// demandaDAO.atualizarHorasApontadasDemanda(codigoDemanda);

	}


	@Override
	public boolean inserir(int[] listaCodigoAtividades, String[] apontamentos) {
		boolean retorno = false;
		int posicaoFinal = 15;
		int posicaoInicial = 0;
		int contador = 0;
		for (int codigoAtividade : listaCodigoAtividades) {
			
			
			for(posicaoInicial = contador; posicaoInicial < posicaoFinal; posicaoInicial++ ) {
				String[] horas = apontamentos[posicaoInicial].split(":");
				Long hora = new Long(horas[0]);
				Long minutos = new Long(horas[1]);

				ApontamentoEntity apontamentoEntity = new ApontamentoEntity();
				apontamentoEntity.setHorasApontadas(Time.valueOf(LocalTime.of(hora.intValue(), minutos.intValue())));
				Calendar dataAtual = Calendar.getInstance();
				apontamentoEntity.setData(dataAtual);
				AtividadeEntity atividadeEntity = new AtividadeEntity();
				atividadeEntity.setCodigoAtividade(new Long(codigoAtividade));
				apontamentoEntity.setAtividade(atividadeEntity);
				UsuarioEntity funcionario = new UsuarioEntity();
				funcionario.setCodigo(1);
				apontamentoEntity.setFuncionario(funcionario);
				apontamentoDAO.inserir(apontamentoEntity);
				
			}
			posicaoFinal+=15;
			contador+=15;
			
			atualizarHorasApontadas(new Long(codigoAtividade), 0l);
			retorno = true;
			
		}
		return retorno;
	}

	public Apontamento apontamentoEntityToApontamento(ApontamentoEntity apontamentoEntity){
		Apontamento apontamento = new Apontamento();
		apontamento.setCodigo(apontamentoEntity.getCodigo());
		apontamento.setHorasApontadas(apontamentoEntity.getHorasApontadas());
		Usuario usuario = new Usuario();
		usuario.setCodigo(apontamentoEntity.getFuncionario().getCodigo());
		apontamento.setFuncionario(usuario);
		
		return apontamento;
		
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
		atividadeEntity.setStatus(EnumStatus.APROVACAO);
		
		return atividadeEntity;
	}

}
