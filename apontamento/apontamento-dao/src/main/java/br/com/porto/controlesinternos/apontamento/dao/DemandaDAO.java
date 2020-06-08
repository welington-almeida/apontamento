package br.com.porto.controlesinternos.apontamento.dao;

import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;

public interface DemandaDAO {
	
	Object selecionaPorDescricao(String descricao);

	void inserir(DemandaEntity demandaEntity);
	
	DemandaEntity selecionarPorCodigo(int codigo);
	
	void deletar(DemandaEntity demanda);

	void alterar(DemandaEntity demanda);

}
