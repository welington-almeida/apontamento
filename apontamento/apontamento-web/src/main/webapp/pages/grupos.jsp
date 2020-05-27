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
	src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js"/>"></script>
<meta charset="UTF-8">

<title>VisualizaÃ§Ã£o</title>
</head>

<body>
	<!-- CABEÃALHO -->
	<header class="ps-site-top ps-site-bgWhite">
		<div class="ps-container">
			<div class="ps-mod4 ps-sm-mod2">
				<a href="inicio.html" title="Porto Seguro"><span class="ps-logo"></span></a>
			</div>
			<div class="ps-mod4 ps-sm-mod9">
				<ul
					class="ps-menu ps-menu-mobile ps-menu-allCaps ps-menu-horizontal"
					data-mobilewithouttext="true">
					<li><a href="#" class="ps-menu-hasLevel">Apontamentos</a>
						<ul>
							<li><a href="#">Novo Apontamento</a></li>
							<li><a href="#">Visualizar Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Visualizar</a>
						<ul>
							<li><a href="#">Grupos</a></li>
							<li><a href="#">Demandas</a></li>
							<li><a href="#">Atividades</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">RelatÃ³rios</a>
						<ul>
							<li><a href="#">Por FuncionÃ¡rio</a></li>
							<li><a href="#">Por Grupo</a></li>
							<li><a href="#">Por Demanda</a></li>
							<li><a href="#">Por Atividade</a></li>
						</ul></li>
					<li><a href="#">AtualizaÃ§Ã£o de UsuÃ¡rios</a></li>
				</ul>
			</div>
		</div>
	</header>

	<!-- CORPO -->
	</br>
	<div class="ps-container">
		<div class="ps-row">
			<div class="ps-mod8 ps-sm-mod12">
				<table class="ps-table ps-datagrid" data-pagesize="5"
					data-filtering="true">
					<thead>
						<tr>
							<th class="ps-sm-mod3" data-type="text">Codigo</th>
							<th class="ps-sm-mod3" data-type="text">Nome</th>
							<th class="ps-sm-mod3" data-type="text">Tipo</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${grupos}" var="grupo">
							<tr>
								<td><c:out value="${grupo.codigo}" /></td>
								<td><c:out value="${grupo.nome}" /></td>
								<td><c:out value="${grupo.tipo}" /></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>

</html>