package br.com.porto.controlesinternos.apontamento.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.porto.controlesinternos.apontamento.service.ColaboradorService;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ColaboradorServiceImpl implements ColaboradorService {
	
	//@Inject
	//private Object colaboradorDAO;

//	@Override
	public List<Object> listarColaboradores(){
		List<Object> colaboradores = new ArrayList<Object>();
		//List<Object> entitys = usuarioDAO.listarUsuarios();
//		if(entitys != null && !entitys.isEmpty()) {
//			for(UsuarioEntity entity : entitys) {
//				usuarios.add(parserService.convertToModel(entity));
//			}
//		}
		return colaboradores;
	}	
}
