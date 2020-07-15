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

<title>Redefinir Senha</title>
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
	<div class="ps-site-container" style="padding-bottom: 50px;">

		<section>

			<div class="ps-sm-mod4 ps-sm-lspan1 lp-chat-frm" style="align-content: center;">
				<br />
				<br />
				<c:if test="${not empty msg}"><div style="color: blue;">${msg}</div></c:if>
				<h4 class="ps-heading-4 ps-light">Redefinir Senha</h4>
				<br />
				<form name="" id="validateForm"
					action="/apontamento/usuario/redefinirSenha" method="post">
					<input id="" name="codigo" value="${usuarioLogado.codigo}" type="hidden">
					<input id="" name="email" value="${usuarioLogado.email}" type="hidden">
					<input id="" name="senhaBanco" value="${usuarioLogado.senha}" type="hidden">
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">
							<input type="password" name="senhaAtual" class="ps-frm-entry ps-frm-valid"
								placeholder="Senha Atual">
						</div>
					</div>
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">
							<input id="" type="password" name="novaSenha" class="ps-frm-entry ps-frm-valid"
								placeholder="Nova Senha">
						</div>
					</div>
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">
							<input type="password" name="senha2" class="ps-frm-entry ps-frm-valid"
								placeholder="Digite a Nova senha novamente">
						</div>
					</div>
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">								
								<input type="submit"
									class="ps-btn ps-btn-primary ps-btn-blue-dark"
									data-validatescope="#validateForm" value="Redefinir Senha"></td>
						</div>

					</div>
				</form>
			</div>

		</section>

		<footer class="ps-site-foot">
			<div class="ps-container">
				<div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
					À <span class="ps-currentYear">2020</span> Porto Seguro Todos
					os direitos reservados.
				</div>

			</div>
		</footer>
	</div>

</body>

</html>