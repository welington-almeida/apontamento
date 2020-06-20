package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.GrupoDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public class GrupoDAOImpl implements GrupoDAO {

	@PersistenceContext
	private EntityManager entityManager;

	
	public void inserir(GrupoEntity grupo) {
		entityManager.persist(grupo);

	}

	
	public void alterar(GrupoEntity grupo) {
		entityManager.merge(grupo);

	}

	
	public void deletar(GrupoEntity codigoGrupo) {
		entityManager.remove(codigoGrupo);

	}

	
	public GrupoEntity selecionarPorCodigo(long codigo) {

		Query query = entityManager.createQuery("select g from GrupoEntity as g where g.codigo = :codigoParam")
				.setParameter("codigoParam", codigo);

		
		List<GrupoEntity> grupos = query.getResultList();
		if (grupos != null && !grupos.isEmpty()) {
			return grupos.get(0);
		}
		return null;
	}

	
	public GrupoEntity selecionarPorNome(String nome) {
		// TODO Auto-generated method stub
		return null;
	}

	
	public List<GrupoEntity> listar() {
		Query query = entityManager.createQuery("select g from GrupoEntity as g");
		return query.getResultList();
	}
	
	@Override
	public Long horasTotaisDemandasAtivas(long codigoGrupo) {
		String consulta  = ("select sum(d.horasApontadas) as horasApontadas from GrupoEntity as g, DemandaEntity as d where "
				+ "g.codigo = d.grupo and g.codigo=:codigoGrupo");
		Query query = entityManager.createQuery(consulta).setParameter("codigoGrupo", codigoGrupo);
		Long resultado = (Long) query.getSingleResult();
		if(resultado == null){
			resultado = 0L;
		}
		return resultado;
	}
}
