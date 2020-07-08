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

//		Long minutosSobradosApontadosAtividade = TimeUnit.SECONDS.toMinutes(horasApontadasEmSegundos) % TimeUnit.SECONDS.toHours(horasApontadasEmSegundos);
//		Long horas = TimeUnit.SECONDS.toHours(horasApontadasEmSegundos);
		
		String sql = "update AtividadeEntity as a set a.horasApontadas = :minutosApontadosAtividade where a.codigoAtividade = :codigoAtividade";
		Query query = entityManager.createQuery(sql)
				.setParameter("minutosApontadosAtividade", minutosApontadosAtividade)
				.setParameter("codigoAtividade", atividadeEntity.getCodigoAtividade());
		
		query.executeUpdate();
	}
}
