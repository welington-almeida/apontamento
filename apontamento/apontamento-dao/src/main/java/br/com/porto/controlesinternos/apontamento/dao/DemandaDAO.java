package br.com.porto.controlesinternos.apontamento.dao;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.model.Demanda;

public interface DemandaDAO {
	
	public void inserir(DemandaEntity demandaEntity);
	
	public void alterar(DemandaEntity demanda);
	
	public void deletar(DemandaEntity demanda);
	
	Object selecionaPorDescricao(String descricao);

	DemandaEntity selecionarPorCodigo(int codigo);
	
	public List<DemandaEntity> listar();
	
	public Long horasTotaisDemanda(Long codigoDemanda);

	public List<DemandaEntity> listarDemandasUsuario(long codigoUsuario);

	public void atualizarHorasApontadasDemanda(DemandaEntity demandaEntity);

	public Long somaHorasApontadasDemanda(DemandaEntity demandaEntity);
}
