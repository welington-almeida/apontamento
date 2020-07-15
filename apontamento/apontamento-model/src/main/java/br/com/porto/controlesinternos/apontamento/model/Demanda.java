package br.com.porto.controlesinternos.apontamento.model;

import java.util.Date;
import java.util.List;

import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;

public class Demanda {

	private int codigoDemanda;
	private String descricao;
	private Grupo grupo;
	private Long horasEstimadas;
	private Long horasApontadas;
	private Date dataAbertura;
	private Date dataFinalizacao;
	private EnumStatus status;
	private Usuario autorEncerramento;
	private List<Atividade> atividades;
	private Long horasTotaisDemanda;
	
	public int getCodigoDemanda() {
		return codigoDemanda;
	}
	public void setCodigoDemanda(int codigoDemanda) {
		this.codigoDemanda = codigoDemanda;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Grupo getGrupo() {
		return grupo;
	}
	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}
	public Long getHorasEstimadas() {
		return horasEstimadas;
	}
	public void setHorasEstimadas(Long horasEstimadas) {
		this.horasEstimadas = horasEstimadas;
	}
	public Date getDataAbertura() {
		return dataAbertura;
	}
	public void setDataAbertura(Date dataAbertura) {
		this.dataAbertura = dataAbertura;
	}
	public EnumStatus getStatus() {
		return status;
	}
	public void setStatus(EnumStatus status) {
		this.status = status;
	}
	public Date getDataFinalizacao() {
		return dataFinalizacao;
	}
	public void setDataFinalizacao(Date dataFinalizacao) {
		this.dataFinalizacao = dataFinalizacao;
	}
	public Long getHorasApontadas() {
		return horasApontadas;
	}
	public void setHorasApontadas(Long horasApontadas) {
		this.horasApontadas = horasApontadas;
	}
	
	public Usuario getAutorEncerramento() {
		return autorEncerramento;
	}
	public void setAutorEncerramento(Usuario autorEncerramento) {
		this.autorEncerramento = autorEncerramento;
	}
	public List<Atividade> getAtividades() {
		return atividades;
	}
	public void setAtividades(List<Atividade> atividades) {
		this.atividades = atividades;
	}
	public Long getHorasTotaisDemanda() {
		return horasTotaisDemanda;
	}
	public void setHorasTotaisDemanda(Long horasTotaisDemanda) {
		this.horasTotaisDemanda = horasTotaisDemanda;
	}
	
	
	
}
