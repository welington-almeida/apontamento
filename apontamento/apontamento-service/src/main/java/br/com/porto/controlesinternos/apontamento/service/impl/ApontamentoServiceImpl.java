package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.ApontamentoDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.ApontamentoEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.AtividadeEntity;
import br.com.porto.controlesinternos.apontamento.dao.entity.UsuarioEntity;
import br.com.porto.controlesinternos.apontamento.model.Apontamento;
import br.com.porto.controlesinternos.apontamento.model.Atividade;
import br.com.porto.controlesinternos.apontamento.model.Usuario;
import br.com.porto.controlesinternos.apontamento.service.ApontamentoService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ApontamentoServiceImpl implements ApontamentoService {

	@Inject
	private ApontamentoDAO apontamentoDAO;

	@Override
	public boolean inserir(Apontamento apontamento) {
		boolean retorno = false;
		if (apontamento != null) {
			if (!(apontamento.getFuncionario() != null && apontamento.getFuncionario().getCodigo() != 0
					&& apontamento.getGrupo() != null && apontamento.getGrupo().getCodigo() != 0
					&& apontamento.getDemanda() != null && apontamento.getDemanda().getCodigoDemanda() != 0
					&& apontamento.getAtividade() != null && apontamento.getDataApontamento() != null
					&& apontamento.getHorasApontadas() != null)) {

				ApontamentoEntity apontamentoEntity = new ApontamentoEntity();
				apontamentoEntity.setCodigo(apontamento.getCodigo());
				UsuarioEntity usuarioEntity = new UsuarioEntity();
				usuarioEntity.setCodigo(apontamento.getFuncionario().getCodigo());
				apontamentoEntity.setFuncionario(usuarioEntity);
				AtividadeEntity atividadeEntity = new AtividadeEntity();
				atividadeEntity.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
				apontamentoEntity.setAtividade(atividadeEntity);
				apontamentoEntity.setData(apontamento.getDataApontamento());
				apontamentoEntity.setHoras(apontamento.getHorasApontadas());

				apontamentoDAO.inserir(apontamentoEntity);
				retorno = true;

			}
		}
		return retorno;
	}

	@Override
	public Apontamento selecionar(long codigo) {
		ApontamentoEntity apontamentoEntity = apontamentoDAO.selecionarPorCodigo(codigo);
		Apontamento apontamento = null;
		if (apontamentoEntity != null) {
			apontamento = new Apontamento();

			apontamentoEntity.setCodigo(apontamento.getCodigo());
			UsuarioEntity usuarioEntity = new UsuarioEntity();
			usuarioEntity.setCodigo(apontamento.getFuncionario().getCodigo());
			apontamentoEntity.setFuncionario(usuarioEntity);
			AtividadeEntity atividadeEntity = new AtividadeEntity();
			atividadeEntity.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
			apontamentoEntity.setAtividade(atividadeEntity);
			apontamentoEntity.setData(apontamento.getDataApontamento());
			apontamentoEntity.setHoras(apontamento.getHorasApontadas());

		}
		return apontamento;

	}

	@Override
	public boolean alterar(Apontamento apontamento) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deletar(long codigo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Apontamento> listar() {
		List<ApontamentoEntity> apontamentosEntities = apontamentoDAO.listar();
		List<Apontamento> apontamentos = new ArrayList<Apontamento>();
		if (apontamentosEntities != null && !apontamentosEntities.isEmpty()) {
			for (ApontamentoEntity entity : apontamentosEntities) {
				Apontamento apontamento = new Apontamento();
				apontamento.setCodigo(entity.getCodigo());
				Usuario usuario = new Usuario();
				usuario.setCodigo(apontamento.getFuncionario().getCodigo());
				apontamento.setFuncionario(usuario);
				Atividade atividade = new Atividade();
				atividade.setCodigoAtividade(apontamento.getAtividade().getCodigoAtividade());
				apontamento.setAtividade(atividade);
				apontamento.setDataApontamento(entity.getData());
				apontamento.setHorasApontadas(entity.getHoras());
			}
		}
		return apontamentos;

	}
}
