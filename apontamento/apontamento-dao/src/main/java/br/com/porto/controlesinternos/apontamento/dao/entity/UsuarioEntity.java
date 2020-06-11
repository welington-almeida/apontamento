package br.com.porto.controlesinternos.apontamento.dao.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumPerfilUsuario;

@Entity
@Table(name="USUARIO")
public class UsuarioEntity {
	
	@Id @GeneratedValue
	@Column(name="CODIGO",nullable=false,unique=true)
	private long codigo;
	
	@Column(name="NOME",nullable=false)
	private String nome;
	
	@Column(name="EMAIL",nullable=false,unique=true)
	private String email;

	@Column(name="PERFIL",nullable=false)
	private EnumPerfilUsuario perfil;
	
	@Column(name="STATUS",nullable=false)
	private EnumStatus status;

	@Column(name="SENHA",nullable=false)
	private String senha;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "funcionario")
	private List<ApontamentoEntity> apontamentos;
	
	
	public List<ApontamentoEntity> getApontamentos() {
		return apontamentos;
	}

	public void setApontamentos(List<ApontamentoEntity> apontamentos) {
		this.apontamentos = apontamentos;
	}

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
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param tipo the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	public EnumPerfilUsuario getPerfil() {
		return perfil;
	}

	public void setPerfil(EnumPerfilUsuario perfil) {
		this.perfil = perfil;
	}
	
	public EnumStatus getStatus() {
		return status;
	}

	public void setStatus(EnumStatus status) {
		this.status = status;
	}

	/**
	 * @return the senha
	 */
	public String getSenha() {
		return senha;
	}

	/**
	 * @param tipo the senha to set
	 */
	public void setSenha(String senha) {
		this.senha = senha;
	}
}
