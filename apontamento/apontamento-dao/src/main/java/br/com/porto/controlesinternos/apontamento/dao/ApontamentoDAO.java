package br.com.porto.controlesinternos.apontamento.dao;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;


public interface ApontamentoDAO {
	
public void inserir(ApontamentoEntity apontamento);
	
	public void alterar(ApontamentoEntity apontamento);
	
	public void deletar(ApontamentoEntity apontamento);
	
	public ApontamentoEntity selecionarPorCodigo(long codigo);
	
	public ApontamentoEntity selecionarPorFuncionario(String funcionario);

	public List<ApontamentoEntity> listar();
	
	public List<ApontamentoEntity> meusApontamentos(long codigo);
}
