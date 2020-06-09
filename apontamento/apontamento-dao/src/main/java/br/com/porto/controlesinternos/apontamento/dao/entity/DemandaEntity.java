package br.com.porto.controlesinternos.apontamento.dao.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;

@Entity
@Table(name="DEMANDA")
public class DemandaEntity {

	@Id @GeneratedValue
	@Column(name="CODIGO_DEMANDA", nullable=false, unique=true)
	private int codigoDemanda;
	
	@Column(name="DESCRICAO", nullable=false, unique=false)
	private String descricao;
	
	@ManyToOne
	@JoinColumn(name="CODIGO_GRUPO")
	private GrupoEntity grupo;	
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd-MM-yyyy")
	@Column(name="DATA_ABERTURA", nullable=false, unique=false)
	private Date dataAbertura;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd-MM-yyyy")
	@Column(name="DATA_FINALIZACAO", nullable=false, unique=false)
	private Date dataFinalizacao;
	
	@Column(name="STATUS", nullable=false, unique=false)
	private EnumStatus status;
	
	@Column(name="HORAS_APONTADAS", nullable=false, unique=false)
	private Long horasApontadas;
	 
	@Column(name="HORAS_ESTIMADAS", nullable=false, unique=false)
	private Long horasEstimadas;
	
	@ManyToOne
	@JoinColumn(name="AUTOR_ENCERRAMENTO")
//	@Column(name="AUTOR_ENCERRAMENTO", nullable=false, unique=false)
	private UsuarioEntity autorEncerramento;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "demanda")
	private List<AtividadeEntity> atividades;

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

	public GrupoEntity getGrupo() {
		return grupo;
	}

	public void setGrupo(GrupoEntity grupo) {
		this.grupo = grupo;
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

	public Long getHorasApontadas() {
		return horasApontadas;
	}

	public void setHorasApontadas(Long horasApontadas) {
		this.horasApontadas = horasApontadas;
	}

	public Long getHorasEstimadas() {
		return horasEstimadas;
	}

	public void setHorasEstimadas(Long horasEstimadas) {
		this.horasEstimadas = horasEstimadas;
	}

	public UsuarioEntity getAutorEncerramento() {
		return autorEncerramento;
	}

	public void setAutorEncerramento(UsuarioEntity autorEncerramento) {
		this.autorEncerramento = autorEncerramento;
	}

	public List<AtividadeEntity> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<AtividadeEntity> atividades) {
		this.atividades = atividades;
	}

	
	
}
