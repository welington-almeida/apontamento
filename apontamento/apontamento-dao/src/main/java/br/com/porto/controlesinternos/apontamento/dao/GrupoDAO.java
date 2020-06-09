package br.com.porto.controlesinternos.apontamento.dao;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;

public interface GrupoDAO {
	
	public void inserir(GrupoEntity grupo);
	
	public void alterar(GrupoEntity grupo);
	
	public void deletar(GrupoEntity codigoGrupo);
	
	public GrupoEntity selecionarPorCodigo(long codigo);
	
	public GrupoEntity selecionarPorNome(String nome);

	public List<GrupoEntity> listar();
}
