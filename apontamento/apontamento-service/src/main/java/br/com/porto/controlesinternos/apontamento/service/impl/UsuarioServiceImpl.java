package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import br.com.porto.controlesinternos.apontamento.dao.UsuarioDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
import br.com.porto.controlesinternos.apontamento.service.UsuarioService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class UsuarioServiceImpl implements UsuarioService {
	
	@Inject
	private UsuarioDAO usuarioDAO;

	
	@Override
	public boolean inserir(Usuario usuario) {
		boolean retorno = false;
		if (usuario != null) {
			if (usuario.getNome() != null && !usuario.getNome().isEmpty() && usuario.getEmail() != null
					&& !usuario.getEmail().isEmpty() && usuario.getSenha() != null && !usuario.getSenha().isEmpty() && 
					usuario.getPerfil() != null && !usuario.getPerfil().isEmpty()) {
				Object registroExistente = usuarioDAO.selecionarPorNome(usuario.getNome());
				if (registroExistente == null) {

					UsuarioEntity usuarioEntity = new UsuarioEntity();
					usuarioEntity.setCodigo(usuario.getCodigo());
					usuarioEntity.setNome(usuario.getNome());
					usuarioEntity.setEmail(usuario.getEmail());
					usuarioEntity.setStatus(EnumStatus.APROVACAO);
					usuarioEntity.setPerfil(usuario.getPerfil());
					usuarioEntity.setSenha(usuario.getSenha());

					usuarioDAO.inserir(usuarioEntity);
					retorno = true;
				}
			}
		}
		return retorno;
	}

	@Override
	public Usuario selecionar(long codigo) {
		UsuarioEntity usuarioEntity = usuarioDAO.selecionarPorCodigo(codigo);
		Usuario usuario = null;
		if (usuarioEntity != null) {
			usuario = new Usuario();
			usuario.setCodigo(usuarioEntity.getCodigo());
			usuario.setNome(usuarioEntity.getNome());
			usuario.setEmail(usuarioEntity.getEmail());
			usuario.setSenha(usuarioEntity.getSenha());
		}
		return usuario;
	}

	@Override
	public boolean alterar(Usuario usuario) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deletar(long codigo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Usuario> listar() {
		List<UsuarioEntity> usuariosEntities = usuarioDAO.listar();
		List<Usuario> usuarios = new ArrayList<Usuario>();
		if (usuariosEntities != null && !usuariosEntities.isEmpty()) {
			for (UsuarioEntity entity : usuariosEntities) {
				Usuario usuario = new Usuario();

				usuario.setCodigo(entity.getCodigo());
				usuario.setNome(entity.getNome());
				usuario.setEmail(entity.getEmail());
				usuario.setSenha(entity.getSenha());
				usuarios.add(usuario);
			}
		}
		return usuarios;
	}

}
