package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;
import br.com.porto.controlesinternos.apontamento.model.Usuario;

public interface UsuarioService {
	
	public boolean inserir(Usuario usuario);
	
	public Usuario selecionar(long codigo);
	
	public boolean alterar(Usuario usuario);
	
	public boolean deletar(long codigo);

	public List<Usuario> listar();

}
