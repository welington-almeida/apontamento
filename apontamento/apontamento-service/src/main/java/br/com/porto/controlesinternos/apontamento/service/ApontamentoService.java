package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.Apontamento;

public interface ApontamentoService {
		
	public boolean inserir(Apontamento apontamento);
	
	public Apontamento selecionar(long codigo);
	
	public boolean alterar(Apontamento apontamento);
	
	public boolean deletar(long codigo);

	public List<Apontamento> listar();
	
}
