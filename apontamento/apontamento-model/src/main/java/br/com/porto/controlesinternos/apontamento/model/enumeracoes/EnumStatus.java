package br.com.porto.controlesinternos.apontamento.model.enumeracoes;

public enum EnumStatus {
	ATIVO(1, "Ativo"), APROVACAO(2, "Aprovacao"), DESATIVADO(3, "Desativado");

	private int codigo;
	private String descricao;

	EnumStatus(int codigo, String descricao) {
		this.codigo = codigo;
		this.descricao = descricao;
	}

	public static EnumStatus buscarStatus(int codigo) {
		for(EnumStatus status:EnumStatus.values()) {
			if (codigo == status.getCodigo()) {
				return status;
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


