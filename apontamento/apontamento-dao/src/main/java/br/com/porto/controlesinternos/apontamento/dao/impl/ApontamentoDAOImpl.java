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
import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;


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



@SuppressWarnings("unchecked")
@Override
public List<ApontamentoEntity> meusApontamentos(long funcionario) {
	UsuarioEntity usuarioEntity = new UsuarioEntity();
	usuarioEntity.setCodigo(funcionario);
	Query query = entityManager.createQuery("select a from ApontamentoEntity as a where a.funcionario = :codigoUsuario")
			.setParameter("codigoUsuario", usuarioEntity);
	
	List<ApontamentoEntity> meusApontamentos = query.getResultList();
	if (meusApontamentos != null && !meusApontamentos.isEmpty()) {
		return meusApontamentos;
	}
	return null;
}

@Override
public List<ApontamentoEntity> meusApontamentos(UsuarioEntity funcionario) {
	// TODO Auto-generated method stub
	return null;
}

@Override
public List<ApontamentoEntity> meusApontamentosByDemanda(long codigo, int codigoDemanda) {
	UsuarioEntity usuarioEntity = new UsuarioEntity();
	usuarioEntity.setCodigo(codigo);
	DemandaEntity demandaEntity = new DemandaEntity();
	demandaEntity.setCodigoDemanda(codigoDemanda);
	//não encontrou a propriedade de atividade em Apontamento
	Query query = entityManager.createQuery("select a from ApontamentoEntity as a, DemandaEntity as d, AtividadeEntity as at where a.funcionario = :codigoUsuario and d = :codigoDemanda and at.demanda = d and a.atividade = at")
			.setParameter("codigoUsuario", usuarioEntity)
			.setParameter("codigoDemanda", demandaEntity);
	
	List<ApontamentoEntity> meusApontamentos = query.getResultList();
	if (meusApontamentos != null && !meusApontamentos.isEmpty()) {
		return meusApontamentos;
	}
	return null;
}

}
