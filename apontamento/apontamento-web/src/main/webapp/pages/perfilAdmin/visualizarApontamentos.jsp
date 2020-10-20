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

<title>Visualizar Apontamentos de Usuários</title>
</head>

<body>
	<!-- CABEÃÂALHO -->
	<c:out value="${grupo.codigo}"></c:out>
	<c:out value="${grupo.nome}"></c:out>
	<c:out value="${grupo.tipo}"></c:out>
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

							<li><a href="#">Novo Apontamento</a></li>
							<li><a href="#">Meus Apontamentos</a></li>

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

							<li style="text-align: center">${usuarioLogado.nome}</li>
							<br />
							<c:if test="${usuarioLogado.perfil.codigo == '3'}">
								<li><a href="<c:url value = "/usuarios/" />">Atualizar
										Usuários</a></li>
							</c:if>
							<li><a href="<c:url value = "/usuario/alterarSenha" />">Redefinir
									Senha</a></li>

							<li><a class="ps-menu-hasLevel"
								href="<c:url value = "/logout" />">Sair</a></li>
						</ul></li>
				</ul>

			</div>
		</div>
	</header>

	<!------------------------------------ CORPO ------------------------------------------->
	<br />
		<div class="ps-row">
			<div class="ps-mod8 ps-sm-mod12">
				<table class="ps-table ps-datagrid" data-pagesize="5"
					data-filtering="true">

					<!------------------------------------ CABEÃALHO TABELA ------------------------------------------->
					<thead>
						</br>
						<tr>
							<th class="ps-sm-mod2" data-type="text"
								data-itemtemplate="PropostaTemplate">Nome do Usuário</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Ação</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${usuarios}" var="usuario">
							<tr>
								<td>${usuario.nome}</td>
								
								<td>
								<form action=<c:url value="/apontamento/apontamentoUsuarioSelecionado/"/>
									method="POST">
									<input type="hidden" value="${usuario.codigo}" name="codigoUsuarioSelecionado">
									<input type="submit" value="Visualizar Demandas">
								</form>
								</td>

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
			<div class="ps-modal-title">Novo Grupo</div>
			<div class="ps-modal-content">



				<div class="ps-row">
					<div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
						<form name="" id="validateForm"
							action="/apontamento/grupo/inserir" method="POST">
							<div class="ps-row ps-frm-row">
								<div class="ps-mod8 ps-sm-mod12">
									<input type="text" name="nome"
										class="ps-frm-entry ps-frm-valid" placeholder="Nome do Grupo">
									<input type="text" name="tipo"
										class="ps-frm-entry ps-frm-valid" placeholder="Tipo">
								</div>
							</div>
							<input type="submit"
								class="ps-btn ps-btn-primary ps-btn-blue-dark"
								style="width: 200px;" data-validatescope="#validateForm"
								value="Criar Grupo">

						</form>

					</div>

				</div>
			</div>
		</div>
	</div>
	<div class="ps-modal" id="ModalLarge2">
		<a href="javascript:;" class="ps-modal-close ps-modal-close-default"><span
			class="ps-ico ps-ico-sm ps-sm-ico-lg ps-ico-close"></span></a>
		<div class="ps-modal-container ps-sm-modal-large">
			<div class="ps-modal-title">Desativar Grupo</div>
			<div class="ps-modal-content">
				<div class="ps-row">
					<div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
						<form action="/apontamento/grupo/deletar/" id="validateForm"
							method="POST">
							<div class="ps-frm-select">
								<select name="codigo">
									<c:forEach items="${grupos}" var="grupo">

										<option value="${grupo.codigo}">${grupo.nome}</option>
									</c:forEach>
								</select>
							</div>
							</br> <input type="submit"
								class="ps-btn ps-btn-primary ps-btn-blue-dark"
								style="width: 200px;" data-validatescope="#validateForm"
								value="Desativar Grupo">

						</form>

					</div>

				</div>
			</div>
		</div>
	</div>


	<script type="javascript">

function valorPadraoPesquisa(){
document.getElementById("#pesquisar").value = 0;
}
</script>
</body>

</html>