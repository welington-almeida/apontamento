package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.DemandaEntity;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Demanda;

public interface DemandaService {

	public boolean inserir(Demanda demanda);

	public Demanda selecionarPorCodigo(long codigo);

	public void alterar(Demanda demanda);

	public void deletar(long codigo);

	public List<Demanda> listar();
}
