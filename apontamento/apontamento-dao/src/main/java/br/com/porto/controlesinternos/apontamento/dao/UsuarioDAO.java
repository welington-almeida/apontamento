package br.com.porto.controlesinternos.apontamento.dao;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;

public interface UsuarioDAO {
	
	public void inserir(UsuarioEntity usuario);
	
	public void alterar(UsuarioEntity usuario);
	
	public void deletar(UsuarioEntity usuario);
	
	public UsuarioEntity selecionarPorCodigo(long codigo);
	
	public UsuarioEntity selecionarPorNome(String nome);

	public List<UsuarioEntity> listar();
	
	public UsuarioEntity existeUsuario(String email, String senha);
}
