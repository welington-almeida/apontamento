<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">



<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1.0" />
<link
	href="<c:url value="/resources/visual/v.1/css/ps-lib.core-min.css" />"
	rel="stylesheet" type="text/css" media="screen" />
<link
	href="<c:url value="/resources/visual/v.1/css/ps-lib-iconGlyphs-min.css" />"
	rel="stylesheet" type="text/css" media="screen" />
<!--[if lt IE 9]> 
                <script src="<c:url value="/resources/visual/v.1/js/plugins/html5-3.6-respond-1.1.0.min.js" />"></script> 
            <![endif]-->


<script
	src="<c:url value="/resources/visual/v.1/js/vendor/jquery-1.9.1.min.js" />"></script>
<script
	src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js" />"></script>
<script
	src="<c:url value="/resources/visual/v.1/js/vendor/visualizacoes.js" />"></script>
<script
	src="<c:url value="/resources/visual/v.1/js/vendor/calendario.js" />"></script>
<meta charset="UTF-8">

<title>Visualizar Funcionários</title>
</head>

<body>
	<!-- CABEÇALHO -->
	<c:out value="${usuario.codigo}"></c:out>
	<c:out value="${usuario.nome}"></c:out>
	<c:out value="${usuario.email}"></c:out>
	<c:out value="${usuario.perfil}"></c:out>
	<c:out value="${usuario.acesso}"></c:out>
	<header class="ps-site-top ps-site-bgWhite">
		<div class="ps-container">
			<div class="ps-mod4 ps-sm-mod2">
				<a href="#" title="Porto Seguro"><span class="ps-logo"></span></a>
			</div>
			<div class="ps-mod4 ps-sm-mod9">
				<ul
					class="ps-menu ps-menu-mobile ps-menu-allCaps ps-menu-horizontal"
					data-mobilewithouttext="true">
					<li><a href="#" class="ps-menu-hasLevel">Apontamentos</a>
						<ul>
							<!-- <li><a href="<c:url value="/apontamento/inserir/" />">Novo
									Apontamento</a></li>
							<li><a href="<c:url value="/meusApontamentos" />">Meus
									Apontamentos</a></li>
									 -->
									 
						<li><a href="#">Novo
									Apontamento</a></li>
							<li><a href="#">Meus
									Apontamentos</a></li>
						
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Visualizar</a>
						<ul>
							<li><a href="<c:url value = "/grupo/" />">Grupos</a></li>
							<li><a href="<c:url value = "/demanda/" />">Demandas</a></li>
							<li><a href="<c:url value = "/atividade/" />">Atividades</a></li>
							<c:if test="${usuarioLogado.perfil.codigo == '3'}">
								<li><a href="<c:url value = "/apontamentos/" />">Apontamentos</a></li>
							</c:if>
						</ul></li>
					<c:if test="${usuarioLogado.perfil.codigo == '3'}">
					
					<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
							<ul>
								<li><a href="#">Por Funcionário</a></li>
								<li><a href="#">Por Grupo</a></li>
								<li><a href="#">Por Demanda</a></li>
								<li><a href="#">Por Atividade</a></li>
							</ul></li>
							
					</c:if>
					<li><a href="" class="ps-menu-hasLevel">Usuário</a>
						<ul>
					
							<li style= "text-align: center">${usuarioLogado.nome}</li>
							<br />
							<c:if test="${usuarioLogado.perfil.codigo == '3'}">
								<li><a href="<c:url value = "/usuarios/" />">Atualizar
										Usuários</a></li>
							</c:if>
							<li><a href="<c:url value = "/usuario/alterarSenha" />">Redefinir
									Senha</a></li>
							
							<li><a class="ps-menu-hasLevel" href="<c:url value = "/logout" />">Sair</a></li>
						</ul></li>						
				</ul>
				
			</div>
		</div>
	</header>

	<!------------------------------------ CORPO ------------------------------------------->
	</br>
	<div class="ps-container">
		<div class="ps-row">
			<div class="ps-mod8 ps-sm-mod12">
				<table class="ps-table ps-datagrid" data-pagesize="5"
					data-filtering="true">
					<h1 style="text-align: center">Funcionários</h1>
					<!------------------------------------ CABEÃALHO TABELA ------------------------------------------->
					<thead>
						</br>
						<tr>
							<th class="ps-sm-mod2" data-type="text"
								data-itemtemplate="PropostaTemplate">ID Funcionário</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Nome</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">E-mail</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Perfil de Acesso</th>

							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Status</th>
						</tr>
					</thead>

					<!------------------------------------ CABEÃALHO FILTROS------------------------------------------->
<!-- 					<tr class="jsgrid-filter-row"> -->
<!-- 						<td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;"> -->
<!-- 							<div> -->
<!-- 								</br> </br> <input type="text" class="ps-frm-entry" -->
<!-- 									placeholder="Filtrar por ID" value=""> -->
<!-- 							</div> -->
<!-- 						</td> -->
<!-- 						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left" -->
<!-- 							style="width: auto;"> -->
<!-- 							<div class="ps-frm-select"> -->
<!-- 								<select> -->
<!-- 									<option value="">Nome</option> -->
<%-- 									<c:forEach items="${usuarios}" var="usuario"> --%>
<%-- 										<option value="1"><c:out value="{usuario.nome}" /></option> --%>

<%-- 									</c:forEach> --%>
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</td> -->
<!-- 						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left" -->
<!-- 							style="width: auto;"> -->
<!-- 							<div class="ps-frm-select"> -->
<!-- 								<select> -->
<!-- 									<option value="">E-mail</option> -->
<%-- 									<c:forEach items="${usuarios}" var="usuario"> --%>
<%-- 										<option value="1"><c:out value="{usuario.email}" /></option> --%>

<%-- 									</c:forEach> --%>
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</td> -->
<!-- 						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left" -->
<!-- 							style="width: auto;"> -->
<!-- 							<div class="ps-frm-select"> -->
<!-- 								<select> -->
<!-- 									<option value="">Perfil</option> -->
<%-- 									<c:forEach items="${usuarios}" var="usuario"> --%>
<%-- 										<option value="1"><c:out --%>
<%-- 												value="{usuario.perfil.descricao}" /></option> --%>

<%-- 									</c:forEach> --%>
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</td> -->
<!-- 						<td class="ps-hide ps-sm-show ps-sm-mod3 jsgrid-align-left" -->
<!-- 							style="width: auto;"> -->
<!-- 							<div class="ps-frm-select"> -->
<!-- 								<select> -->
<!-- 									<option value="">Status</option> -->
<%-- 									<c:forEach items="${usuarios}" var="usuario"> --%>
<%-- 										<option value="1"><c:out --%>
<%-- 												value="{usuario.acesso.descricao}" /></option> --%>

<%-- 									</c:forEach> --%>
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</td> -->

<!-- 					</tr> -->
					<tbody>
						<c:forEach items="${usuarios}" var="usuario">
							<tr>
								<td class="ps-heading-4 ps-light"><a href="#"
									onclick="editarUsuarioSelecionado('${usuario.codigo}', '${usuario.nome}', '${usuario.email}', '${usuario.perfil.codigo}', '${usuario.acesso.codigo}')"
									class="ps-open-modal" data-modal="#ModalLarge"
									data-modalbackdropstatic="false"
									data-modalkeyboarddisable="true"
									data-modalonshow="console.log('abrir modal')"
									data-modalonhide="console.log('fechar modal')"><c:out
											value="${usuario.codigo}" /></a><br /></td>
								<td><c:out value="${usuario.nome}" /></td>
								<td><c:out value="${usuario.email}" /></td>
								<td><c:out value="${usuario.perfil}" /></td>
								<td><c:out value="${usuario.acesso}" /></td>

							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="ps-modal" id="ModalLarge">
		<a href="javascript:;" class="ps-modal-close ps-modal-close-default"><span
			class="ps-ico ps-ico-sm ps-sm-ico-lg ps-ico-close"></span></a>
		<div class="ps-modal-container ps-sm-modal-large">
			<div class="ps-modal-title">Atualizar Funcionário</div>
			<div class="ps-modal-content">

				<br />
				<form name="" id="validateForm"
					action="/apontamento/usuario/alterar/" method="post">
					<input id="usuario.codigo" name="codigo" value="" type="hidden">
					<div class="ps-row">
						<div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
							<div class="ps-row">
								<div class="ps-mod8 ps-sm-mod8 ps-frm-row">
									<label class="ps-frm-lbl">Nome</label> <input id="usuario.nome"
										type="text" name="nome" class="ps-frm-entry"
										placeholder="Nome Funcionário" />
								</div>

							</div>
							</br>
							<div class="ps-row">
								<div class="ps-mod8 ps-sm-mod8 ps-frm-row">
									<label class="ps-frm-lbl">E-mail</label> <input
										id="usuario.email" type="text" value="" name="email"
										class="ps-frm-entry" placeholder="E-mail Funcionário" />
								</div>

							</div>


						</div>

						<div class="ps-mod8 ps-sm-mod6">
							<div class="ps-row">
								<div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
									<label class="ps-frm-lbl">Perfil de Acesso</label>
									<div class="ps-frm-select">
										<select id="usuario.perfil" value="" name="codigoPerfil">
											<option value="1">Usuário</option>
											<option value="2">Líder</option>
											<option value="3">Administrador</option>
										</select>
									</div>
								</div>
							</div>
							</br>
							<div class="ps-row">
								<div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
									<label class="ps-frm-lbl">Status</label>
									<div class="ps-frm-select">
										<select id="usuario.acesso" value="" name="codigoAcesso">
											<option value="1">Ativo</option>
											<option value="2">Aprovação</option>
											<option value="3">Desativado</option>
										</select>
									</div>
								</div>

							</div>
						</div>
						<table>
							<tr>

								<td><input type="submit"
									class="ps-btn ps-btn-primary ps-btn-blue-dark"
									style="margin-left: 450px; width: 150px"
									data-validatescope="#validateForm" value="Atualizar"></td>

							</tr>
						</table>
					</div>
				</form>

			</div>
		</div>
	</div>
</body>
<script>
	function editarUsuarioSelecionado(codigo, nome, email, perfil, acesso) {

		document.getElementById('usuario.codigo').value = codigo;
		document.getElementById('usuario.nome').value = nome;
		document.getElementById('usuario.email').value = email;
		document.getElementById('usuario.perfil').value = perfil;
		document.getElementById('usuario.acesso').value = acesso;
	}
</script>
</html>