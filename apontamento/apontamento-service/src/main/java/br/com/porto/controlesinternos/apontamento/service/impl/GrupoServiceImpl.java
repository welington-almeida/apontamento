package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.dao.GrupoDAO;
import br.com.porto.controlesinternos.apontamento.dao.entity.GrupoEntity;
import br.com.porto.controlesinternos.apontamento.model.Grupo;
import br.com.porto.controlesinternos.apontamento.service.GrupoService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GrupoServiceImpl implements GrupoService {
	
	@Inject
	private GrupoDAO grupoDAO;

	@Override
	public boolean inserir(Grupo grupo) {
		boolean retorno = false;
		if(grupo != null){
			if(grupo.getNome() != null && !grupo.getNome().isEmpty() && grupo.getTipo() != null && !grupo.getTipo().isEmpty()){
				 Object registroExistente = grupoDAO.selecionarPorNome(grupo.getNome());
				 if(registroExistente == null){
					 
					 GrupoEntity grupoEntity = new GrupoEntity();
					 grupoEntity.setCodigo(grupo.getCodigo());
					 grupoEntity.setNome(grupo.getNome());
					 grupoEntity.setTipo(grupo.getTipo());
					 
					 grupoDAO.inserir(grupoEntity);
					 retorno = true;
				 }
			}
		}
		return retorno;
	}

	@Override
	public Grupo selecionar(long codigo) {
		GrupoEntity grupoEntity = grupoDAO.selecionarPorCodigo(codigo);
		Grupo grupo = null;
		if(grupoEntity != null){
			grupo = new Grupo();
			grupo.setCodigo(grupoEntity.getCodigo());
			grupo.setNome(grupoEntity.getNome());
			grupo.setTipo(grupoEntity.getTipo());
		}
		return grupo;
	}

	@Override
	public boolean alterar(Grupo grupo) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deletar(long codigo) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public List<Grupo> listar() {
		List<GrupoEntity> gruposEntities = grupoDAO.listar();
		List<Grupo> grupos = new ArrayList<Grupo>();
		if(gruposEntities != null && !gruposEntities.isEmpty()){
			for(GrupoEntity entity : gruposEntities){
				Grupo grupo = new Grupo();
				
				grupo.setCodigo(entity.getCodigo());
				grupo.setNome(entity.getNome());
				grupo.setTipo(entity.getTipo());
				grupos.add(grupo);
			}
		}
		return grupos;
	}

}