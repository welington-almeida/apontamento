package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.Demanda;

public interface DemandaService {

	public boolean inserir(Demanda demanda);

	public Demanda selecionarPorCodigo(int codigo);

	public void alterar(Demanda demanda);

	public boolean deletar(int codigo);

	public List<Demanda> listar();

	public List<Demanda> listarDemandasUsuario(long codigo);
}
