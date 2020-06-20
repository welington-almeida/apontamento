package br.com.porto.controlesinternos.apontamento.model.enumeracoes;

public enum EnumPerfilUsuario {
	USER(1, "USER"), LIDER(2, "LIDER"), ADMINISTRADOR(3, "ADMINISTRADOR");

	private int codigo;
	private String descricao;

	EnumPerfilUsuario(int codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public static EnumPerfilUsuario buscarPerfil(int codigo) {
		for(EnumPerfilUsuario perfil:EnumPerfilUsuario.values()) {
			if (codigo == perfil.getCodigo()) {
				return perfil;
			}
		}
	return null;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

}