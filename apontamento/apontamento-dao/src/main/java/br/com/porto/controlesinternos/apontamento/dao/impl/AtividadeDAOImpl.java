package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.AtividadeDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public class AtividadeDAOImpl implements AtividadeDAO {

	@PersistenceContext
	private EntityManager entityManager;

	public void inserir(AtividadeEntity atividade) {
		entityManager.persist(atividade);

	}

	public void alterar(AtividadeEntity atividade) {
		entityManager.merge(atividade);

	}

	public void deletar(AtividadeEntity atividade) {
		entityManager.remove(atividade);

	}

	public AtividadeEntity selecionarPorCodigo(long codigo) {

		Query query = entityManager.createQuery("select a from AtividadeEntity as a where a.codigoAtividade = :codigoParam")
				.setParameter("codigoParam", codigo);

		List<AtividadeEntity> atividades = query.getResultList();
		if (atividades != null && !atividades.isEmpty()) {
			return atividades.get(0);
		}
		return null;
	}

	public AtividadeEntity selecionarPorNome(String nome) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<AtividadeEntity> listar() {
		Query query = entityManager.createQuery("select a from AtividadeEntity as a");
		return query.getResultList();
	}

	@Override
	public Long somaHorasApontadasAtividade(AtividadeEntity atividadeEntity) {
		String sql = "Select SUM(TIME_TO_SEC(a.horasApontadas)) as horasApontadas "
				+ "from ApontamentoEntity as a where a.atividade = :atividade";
		Query query = entityManager.createQuery(sql).setParameter("atividade", atividadeEntity);
		Long horasApontadasEmSegundos= (Long) query.getSingleResult();
		
		
		return horasApontadasEmSegundos;	
	}
	
	@Override
	public void atualizarHorasApontadasAtividade(AtividadeEntity atividadeEntity) {
		
		Long horasApontadasEmSegundos = somaHorasApontadasAtividade(atividadeEntity);
		Long minutosApontadosAtividade = TimeUnit.SECONDS.toMinutes(horasApontadasEmSegundos);
		
		String sql = "update AtividadeEntity as a set a.horasApontadas = :minutosApontadosAtividade where a.codigoAtividade = :codigoAtividade";
		Query query = entityManager.createQuery(sql)
				.setParameter("minutosApontadosAtividade", minutosApontadosAtividade)
				.setParameter("codigoAtividade", atividadeEntity.getCodigoAtividade());
		
		query.executeUpdate();
	}

	@Override
	public List<AtividadeEntity> listarByDemanda(Long codigoDemanda) {
		DemandaEntity demandaEntity = new DemandaEntity();
		demandaEntity.setCodigoDemanda(codigoDemanda.intValue());
		Query query = entityManager.createQuery("select a from AtividadeEntity as a, DemandaEntity as d where a.demanda = d and d = :codigoDemanda");
		query.setParameter("codigoDemanda", demandaEntity);
		return query.getResultList();
	}
	
	@Override
	public List<AtividadeEntity> listarPorData(Long codigoAtividade) {
		int diaAtual = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		int primeiroDia = (diaAtual < 16 ? 1 : 16);
		int mes = Calendar.getInstance().get(Calendar.MONTH) + 1;
		int ano = Calendar.getInstance().get(Calendar.YEAR);
		int ultimoDia = (primeiroDia == 1 ? 15 : Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH));
		Query query = entityManager.createQuery("select a from ApontamentoEntity as a, DemandaEntity as d, AtividadeEntity as at"
				+ "where a = at.atividade and at.demanda = d "
				+ "and a.dataApontamento between '" + ano + "-" + mes +"-" + primeiroDia + "' AND '" + ano + "-" + mes + "-" + ultimoDia + "'");

		return query.getResultList();
//		select a.* from apontamento as a, demanda as d, atividade as at
//		where a.CODIGO_ATIVIDADE= at.CODIGO_ATIVIDADE
//		and at.CODIGO_DEMANDA = d.CODIGO_DEMANDA
//		and a.data_apontamento between '2020-08-13' AND '2020-08-15'
		}
}
