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

	public int somarHorasAtividadesByDemanda(List<Atividade> atividadesUsuario);

	public List<Atividade> listarByDemanda(Long codigoDemanda);

	public List<Apontamento> listarPorDataEDemanda(Long codigoDemanda, Long codigoUsuario);

	public List<Atividade> listarAtividadesNaoApontadas(Long codigoDemanda, Long codigoUsuario);
}
