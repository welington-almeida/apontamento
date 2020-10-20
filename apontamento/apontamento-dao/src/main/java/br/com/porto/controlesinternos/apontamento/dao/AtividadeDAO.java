package br.com.porto.controlesinternos.apontamento.dao;

import java.sql.Time;
import java.util.List;

import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;

public interface AtividadeDAO {

	public void inserir(AtividadeEntity atividade);
	
	public void alterar(AtividadeEntity atividade);
	
	public void deletar(AtividadeEntity atividade);
	
	public List<AtividadeEntity> listar();
	
	public AtividadeEntity selecionarPorCodigo(long codigo);
	
	public AtividadeEntity selecionarPorNome(String nome);

	public void atualizarHorasApontadasAtividade(AtividadeEntity atividade);

	public Long somaHorasApontadasAtividade(AtividadeEntity atividadeEntity);
	
	public List<AtividadeEntity> listarByDemanda(Long codigoDemanda);

	public List<ApontamentoEntity> listarPorDataEDemanda(Long codigoDemanda, Long codigoUsuario);

	public List<AtividadeEntity> listarAtividadesNaoApontadas(Long codigoDemanda, Long codigoUsuario);


}
