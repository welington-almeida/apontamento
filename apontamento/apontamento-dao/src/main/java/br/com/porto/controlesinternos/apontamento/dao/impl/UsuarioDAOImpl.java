package br.com.porto.controlesinternos.apontamento.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.UsuarioDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
@Qualifier(value = "usuarioDaoIMPL")
@Repository
@Transactional(propagation = Propagation.MANDATORY)
public class UsuarioDAOImpl implements UsuarioDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public void inserir(UsuarioEntity usuario) {
		entityManager.persist(usuario);

	}

	@Override
	public void alterar(UsuarioEntity usuario) {
		entityManager.merge(usuario);

	}

	@Override
	public void deletar(UsuarioEntity usuario) {
		entityManager.remove(usuario);

	}

	@SuppressWarnings("unchecked")
	@Override
	public UsuarioEntity selecionarPorCodigo(long codigo) {

		Query query = entityManager.createQuery("select u from UsuarioEntity as u where u.codigo = :codigoParam")
				.setParameter("codigoParam", codigo);

		
		List<UsuarioEntity> usuarios = query.getResultList();
		if (usuarios != null && !usuarios.isEmpty()) {
			return usuarios.get(0);
		}
		return null;
	}

	@Override
	public UsuarioEntity selecionarPorNome(String nome) {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UsuarioEntity> listar() {
		Query query = entityManager.createQuery("select u from UsuarioEntity as u");
		return query.getResultList();
	}
}
