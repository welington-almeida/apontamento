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

<title>Início</title>
</head>


<body>

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
					<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
						<ul>
							<li><a href="#">Por Funcionário</a></li>
							<li><a href="#">Por Grupo</a></li>
							<li><a href="#">Por Demanda</a></li>
							<li><a href="#">Por Atividade</a></li>
						</ul></li>
					<li><a href="#">Atualização de Usuários</a></li>
				</ul>
			</div>
		</div>
	</header>
	</br>
	</br>
	</div>


	<div>
		<h1 style="text-align: center">Selecione uma opção abaixo:</h1>
	</div>
	</br>
	</br>
	</br>
	</br>

	<div class="ps-container">

		<div>
			<table class="ps-table ps-table-grid">
				<tbody>
					<tr>
						<th style="border: white;"><span
							class="ps-ico ps-ico-md ps-glyph ps-ico-time"></span><br />
							<h3 class="ps-heading-4 ps-light">
								<a href="#">Apontar Horas</a>
							</h3></th>
						<td style="border: white;"><span
							class="ps-ico ps-ico-md ps-glyph ps-ico-male"></span><br />
							<h3 class="ps-heading-4 ps-light">
								<a href="#">Usuário</a>
							</h3></td>
					</tr>
					<tr>
						<td style="border: white;"></td>
						<td style="border: white;"></td>
					</tr>
					<tr>
						<th style="border: white;"><span
							class="ps-ico ps-ico-md ps-glyph ps-ico-monitor-analytics"></span><br />
							<h3 class="ps-heading-4 ps-light">
								<a href="#">Relatórios</a>
							</h3></th>
						<td style="border: white;"><span
							class="ps-ico ps-ico-md ps-glyph ps-ico-magnifi-glass"></span><br />
							<h3 class="ps-heading-4 ps-light">
								<a href="#">Visualizar</a>
							</h3></td>
					</tr>
				</tbody>
			</table>
		</div>

	</div>



</body>

</html>