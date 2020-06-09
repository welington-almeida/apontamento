package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.ApontamentoDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;


@Repository
@Transactional(propagation = Propagation.MANDATORY)
public class ApontamentoDAOImpl implements ApontamentoDAO {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public void inserir(ApontamentoEntity apontamento) {
		entityManager.persist(apontamento);
		
	}

	@Override
	public void alterar(ApontamentoEntity apontamento) {
		entityManager.merge(apontamento);
		
	}

	@Override
	public void deletar(ApontamentoEntity apontamento) {
		entityManager.remove(apontamento);
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public ApontamentoEntity selecionarPorCodigo(long codigo) {
		Query query = entityManager.createQuery("select a from ApontamentoEntity as a where a.codigo = :codigoParam")
				.setParameter("codigoParam", codigo);

		
		List<ApontamentoEntity> apontamentos = query.getResultList();
		if (apontamentos != null && !apontamentos.isEmpty()) {
			return apontamentos.get(0);
		}
		return null;
	}

	@Override
	public ApontamentoEntity selecionarPorFuncionario(String funcionario) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ApontamentoEntity> listar() {
		Query query = entityManager.createQuery("select a from ApontamentoEntity as a");
		return query.getResultList();
	}

}
