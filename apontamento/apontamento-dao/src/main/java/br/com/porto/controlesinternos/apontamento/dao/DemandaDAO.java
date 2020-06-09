package br.com.porto.controlesinternos.apontamento.dao;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;

public interface DemandaDAO {
	
	public void inserir(DemandaEntity demandaEntity);
	
	public void alterar(DemandaEntity demanda);
	
	public void deletar(DemandaEntity demanda);
	
	Object selecionaPorDescricao(String descricao);

	DemandaEntity selecionarPorCodigo(long codigo);
	
	public List<DemandaEntity> listar();
}
