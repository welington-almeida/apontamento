package br.com.porto.controlesinternos.apontamento.dao.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="GRUPO")
public class GrupoEntity {
	
	@Id @GeneratedValue
	@Column(name="CODIGO",nullable=false,unique=true)
	private long codigo;
	
	@Column(name="NOME",nullable=false,unique=true)
	private String nome;
	
	@Column(name="TIPO",nullable=false)
	private String tipo;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "grupo")
	private List<DemandaEntity> demandas;
	/**
	 * @return the codigo
	 */
	public long getCodigo() {
		return codigo;
	}

	/**
	 * @param codigo the codigo to set
	 */
	public void setCodigo(long codigo) {
		this.codigo = codigo;
	}

	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}

	/**
	 * @param nome the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * @return the tipo
	 */
	public String getTipo() {
		return tipo;
	}

	/**
	 * @param tipo the tipo to set
	 */
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public List<DemandaEntity> getDemandas() {
		return demandas;
	}

	public void setDemandas(List<DemandaEntity> demandas) {
		this.demandas = demandas;
	}

	

	
}
