package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;

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
}
