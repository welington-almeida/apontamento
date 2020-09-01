package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.Apontamento;

public interface ApontamentoService {

	public boolean inserir(Apontamento apontamento);

	public Apontamento selecionar(long codigo);

	public boolean alterar(Apontamento apontamento);

	public boolean deletar(long codigo);

	public List<Apontamento> listar();

	public List<Apontamento> meusApontamentos(long codigo);

	void atualizarHorasApontadas(Long codigoAtividade, Long codigoDemanda);

	boolean inserir(int[] listaCodigoAtividades, String[] apontamentos, String[] datas, int[] codigoApontamento);

	public List<Apontamento> meusApontamentosByDemanda(long codigo, int codigoDemanda);

}