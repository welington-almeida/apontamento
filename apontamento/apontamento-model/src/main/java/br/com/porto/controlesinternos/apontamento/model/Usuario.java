package br.com.porto.controlesinternos.apontamento.model;

import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumStatus;
import br.com.porto.controlesinternos.apontamento.model.enumeracoes.EnumPerfilUsuario;

public class Usuario {

	private long codigo;

	private String nome;

	private String email;
	
	private EnumPerfilUsuario perfil;
	
	private String senha;
	
	private EnumStatus acesso;

	public EnumPerfilUsuario getPerfil() {
		return perfil;
	}

	public void setPerfil(EnumPerfilUsuario perfil) {
		this.perfil = perfil;
	}

	public EnumStatus getAcesso() {
		return acesso;
	}

	public void setAcesso(EnumStatus acesso) {
		this.acesso = acesso;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
}
