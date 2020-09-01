package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.DemandaDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
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

	@Override
	public DemandaEntity selecionarPorCodigo(int codigo) {
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
	
	public Long horasTotaisDemanda(Long codigoDemanda) {
		return codigoDemanda;
	}

	@Override
	public List<DemandaEntity> listarDemandasUsuario(long codigoUsuario) {
		UsuarioEntity funcionario = new UsuarioEntity();
		funcionario.setCodigo(codigoUsuario);

		Query query =  this.entityManager.createQuery("SELECT distinct d FROM ApontamentoEntity as a, AtividadeEntity as at, DemandaEntity as d "
				+ "where a.funcionario = :funcionario "
				+ "and a.atividade = at "
				+ "and at.demanda = d").setParameter("funcionario", funcionario);
		List<DemandaEntity> demandasEntity = query.getResultList();
		return demandasEntity;
	}


	@Override
	public Long somaHorasApontadasDemanda(DemandaEntity demandaEntity) {
		String sql = "Select SUM(a.horasApontadas) as horasApontadas "
				+ "from AtividadeEntity as a, DemandaEntity as d where a.demanda = d and d = :demanda";
		Query query = entityManager.createQuery(sql).setParameter("demanda", demandaEntity);
		Long horasApontadas = (Long) query.getSingleResult();
		
		
		return horasApontadas;	
	}
	
	@Override
	public void atualizarHorasApontadasDemanda(DemandaEntity demandaEntity) {
		Long horasApontadas = somaHorasApontadasDemanda(demandaEntity);
		
		String sql = "update DemandaEntity as d set d.horasApontadas = :minutosApontadosDemanda where d.codigoDemanda = :codigoDemanda";
		Query query = entityManager.createQuery(sql)
				.setParameter("minutosApontadosDemanda", horasApontadas)
				.setParameter("codigoDemanda", demandaEntity.getCodigoDemanda());
		
		query.executeUpdate();
	}
	
}
