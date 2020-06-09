package br.com.porto.controlesinternos.apontamento.model;

import java.util.Date;

import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;

public class Atividade {
	
	private Long codigoAtividade;
	private Demanda demanda;
	private String nomeAtividade;
	private Long horasEstimadas;
	private Long horasApontadas;
	private Date dataAbertura;
	private Date dataFinalizacao;
	private EnumStatus status;
	private Usuario autorEncerramento;
	
	public Long getCodigoAtividade() {
		return codigoAtividade;
	}
	public void setCodigoAtividade(Long codigoAtividade) {
		this.codigoAtividade = codigoAtividade;
	}
	public Demanda getDemanda() {
		return demanda;
	}
	public void setDemanda(Demanda demanda) {
		this.demanda = demanda;
	}
	public String getNomeAtividade() {
		return nomeAtividade;
	}
	public void setNomeAtividade(String nomeAtividade) {
		this.nomeAtividade = nomeAtividade;
	}
	public Long getHorasEstimadas() {
		return horasEstimadas;
	}
	public void setHorasEstimadas(Long horasEstimadas) {
		this.horasEstimadas = horasEstimadas;
	}
	public Long getHorasApontadas() {
		return horasApontadas;
	}
	public void setHorasApontadas(Long horasApontadas) {
		this.horasApontadas = horasApontadas;
	}
	public Date getDataAbertura() {
		return dataAbertura;
	}
	public void setDataAbertura(Date dataAbertura) {
		this.dataAbertura = dataAbertura;
	}
	public Date getDataFinalizacao() {
		return dataFinalizacao;
	}
	public void setDataFinalizacao(Date dataFinalizacao) {
		this.dataFinalizacao = dataFinalizacao;
	}
	public EnumStatus getStatus() {
		return status;
	}
	public void setStatus(EnumStatus status) {
		this.status = status;
	}
	public Usuario getAutorEncerramento() {
		return autorEncerramento;
	}
	public void setAutorEncerramento(Usuario autorEncerramento) {
		this.autorEncerramento = autorEncerramento;
	}
}
