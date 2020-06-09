package br.com.porto.controlesinternos.apontamento.dao.entity;


import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

import br.com.porto.controlesinternos.apontamento.model.Atividade;

public class ApontamentoEntity {
	
	@Id @GeneratedValue
	@Column(name="CODIGO_APONTAMENTO",nullable=false,unique=true)
	private long codigo;
	
	@ManyToOne
	@JoinColumn(name="CODIGO_USUARIO")
	@Column(name="FUNCIONARIO",nullable=false)
	private UsuarioEntity funcionario;

	@ManyToOne
	@JoinColumn(name="CODIGO_ATIVIDADE")
	@Column(name="ATIVIDADE",nullable=false)
	private Atividade atividade;
	
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	@Column(name="DATA_APONTAMENTO",nullable=false)
	private Calendar data;
	
	@DateTimeFormat(pattern = "HH:mm")
	@Column(name="HORAS_APONTADAS", nullable=false)
	private Calendar horas;

	public long getCodigo() {
		return codigo;
	}

	public void setCodigo(long codigo) {
		this.codigo = codigo;
	}

	public UsuarioEntity getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(UsuarioEntity funcionario) {
		this.funcionario = funcionario;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public Calendar getData() {
		return data;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public Calendar getHoras() {
		return horas;
	}

	public void setHoras(Calendar horas) {
		this.horas = horas;
	}
	
	
}
