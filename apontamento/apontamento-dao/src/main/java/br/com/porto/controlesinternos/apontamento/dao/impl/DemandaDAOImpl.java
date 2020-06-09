package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.DemandaDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;
import br.com.porto.controlesinternos.apontamento.model.Demanda;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public class DemandaDAOImpl implements DemandaDAO {

	@PersistenceContext
	private EntityManager entityManager;

	public void inserir(DemandaEntity demandaEntity) {
		this.entityManager.persist(demandaEntity);
	}
	
	public void alterar(DemandaEntity demanda) {
		this.entityManager.merge(demanda);
	}
	
	public void deletar(DemandaEntity demanda) {
		this.entityManager.remove(demanda);
		
	}
	
	public Object selecionaPorDescricao(String descricao) {
		return null;
	}

	public DemandaEntity selecionarPorCodigo(long codigo) {
		Query query = entityManager.createQuery("select d from DemandaEntity as d where d.codigoDemanda = :codigoParam")
				.setParameter("codigoParam", codigo);

		List<DemandaEntity> demandas = query.getResultList();
		if (demandas != null && !demandas.isEmpty()) {
			return demandas.get(0);
		}
		return null;
	}

	public List<DemandaEntity> listar() {
		Query query = entityManager.createQuery("select d from DemandaEntity as d");
		return query.getResultList();
	}
	
}
