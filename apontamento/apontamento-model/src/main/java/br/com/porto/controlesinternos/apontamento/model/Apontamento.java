package br.com.porto.controlesinternos.apontamento.model;

import java.util.Calendar;

public class Apontamento {
	
	private long codigo;
	
	private Usuario funcionario;
	
	private Grupo grupo;
	
	private Demanda demanda;
	
	private Atividade atividade;
	
	private Calendar dataApontamento;
	
	private Calendar horasApontadas;

	public long getCodigo() {
		return codigo;
	}

	public void setCodigo(long codigo) {
		this.codigo = codigo;
	}

	public Usuario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Usuario funcionario) {
		this.funcionario = funcionario;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public Demanda getDemanda() {
		return demanda;
	}

	public void setDemanda(Demanda demanda) {
		this.demanda = demanda;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public Calendar getDataApontamento() {
		return dataApontamento;
	}

	public void setDataApontamento(Calendar dataApontamento) {
		this.dataApontamento = dataApontamento;
	}

	public Calendar getHorasApontadas() {
		return horasApontadas;
	}

	public void setHorasApontadas(Calendar horasApontadas) {
		this.horasApontadas = horasApontadas;
	}
	
	
}
