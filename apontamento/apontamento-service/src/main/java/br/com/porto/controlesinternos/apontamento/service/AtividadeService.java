package br.com.porto.controlesinternos.apontamento.service;

import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.Apontamento;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Grupo;

public interface AtividadeService {

	public boolean inserir(Atividade atividade);
	
	public Atividade selecionar(long codigo);
	
	public boolean alterar(Atividade atividade);
	
	public boolean deletar(long codigoAtividade);

	public List<Atividade> listar();

	public List<String> getDatas();

	public List<Atividade> listarByDemanda(int intValue);

	public int somarHorasAtividadesByDemanda(List<Atividade> atividadesUsuario);

	public List<Apontamento> listarPorData(Long codigoAtividade);
}
