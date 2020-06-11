package br.com.porto.controlesinternos.apontamento.dao.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;


@Entity
@Table(name="ATIVIDADE")
public class AtividadeEntity {

	@Id @GeneratedValue
	@Column(name="CODIGO_ATIVIDADE", nullable=false, unique=true)
	private Long codigoAtividade;
	
	@ManyToOne
	@JoinColumn(name="CODIGO_DEMANDA")
	private DemandaEntity demanda;
	
	@Column(name="NOME_ATIVIDADE", nullable=false, unique=false)
	private String nomeAtividade;
	
	@Column(name="HORAS_ESTIMADAS", nullable=false, unique=false)
	private Long horasEstimadas;
	
	@Column(name="HORAS_APONTADAS", nullable=false, unique=false)
	private Long horasApontadas;
	
	@Column(name="DATA_ABERTURA", nullable=false, unique=false)
	private Date dataAbertura;
	
	@Column(name="DATA_FINALIZACAO", nullable=false, unique=false)
	private Date dataFinalizacao;
	
	@Column(name="STATUS", nullable=false, unique=false)
	private EnumStatus status;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "atividade")
	private List<ApontamentoEntity> apontamentos;
	

	@ManyToOne
	@JoinColumn(name="AUTOR_ENCERRAMENTO")
//	@Column(name="CODIGO_USUARIO", nullable=false, unique=false)
	private UsuarioEntity autorEncerramento;

	
	public List<ApontamentoEntity> getApontamentos() {
		return apontamentos;
	}

	public void setApontamentos(List<ApontamentoEntity> apontamentos) {
		this.apontamentos = apontamentos;
	}
	
	public Long getCodigoAtividade() {
		return codigoAtividade;
	}

	public void setCodigoAtividade(Long codigoAtividade) {
		this.codigoAtividade = codigoAtividade;
	}

	public DemandaEntity getDemanda() {
		return demanda;
	}

	public void setDemanda(DemandaEntity demanda) {
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

	public UsuarioEntity getAutorEncerramento() {
		return autorEncerramento;
	}

	public void setAutorEncerramento(UsuarioEntity autorEncerramento) {
		this.autorEncerramento = autorEncerramento;
	}
}
