package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.Grupo;

public interface GrupoService {
	
	public boolean inserir(Grupo grupo);
	
	public Grupo selecionar(long codigo);
	
	public boolean alterar(Grupo grupo);
	
	public boolean deletar(long codigo);

	public List<Grupo> listar();

}
