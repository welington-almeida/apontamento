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

<title>Visualizar Apontamentos</title>
</head>

<body>
	<!-- CABEÃÂALHO -->
	<c:out value="${apontamento.codigo}"></c:out>
	<c:out value="${apontamento.funcionario}"></c:out>
	<c:out value="${apontamento.grupo}"></c:out>
	<c:out value="${apontamento.demanda}"></c:out>
	<c:out value="${apontamento.atividade}"></c:out>
	<c:out value="${apontamento.dataApontamento}"></c:out>
	<c:out value="${apontamento.horasApontadas}"></c:out>
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
							<li><a href="<c:url value="/apontamento/inserir/" />">Novo Apontamento</a></li>
							<li><a href="<c:url value="/apontamento/meusApontamentos/" />">Meus Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Visualizar</a>
						<ul>
							<li><a href="<c:url value = "/grupo/" />">Grupos</a></li>
							<li><a href="<c:url value = "/demanda/" />">Demandas</a></li>
							<li><a href="<c:url value = "/atividade/" />">Atividades</a></li>
							<li><a href="<c:url value = "/apontamentos/" />">Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
						<ul>
							<li><a href="#">Por Funcionário</a></li>
							<li><a href="#">Por Grupo</a></li>
							<li><a href="#">Por Demanda</a></li>
							<li><a href="#">Por Atividade</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Usuário</a>
						<ul>
							<li><a href="#">Redefinir Senha</a></li>
							<li><a href="<c:url value = "/usuarios/" />">Atualizar Usuário</a></li>

						</ul></li>

				</ul>
			</div>
		</div>
	</header>

	<!------------------------------------ CORPO ------------------------------------------->

	<div class="ps-container">
		<div class="ps-row">
			<div class="ps-mod8 ps-sm-mod12">
				<table class="ps-table ps-datagrid" data-pagesize="5"
					data-filtering="true">
					<h1 style="text-align: center">Apontamentos</h1>
					<!------------------------------------ CABEÃALHO TABELA ------------------------------------------->
					<thead>
						</br>
						<tr>
							<th class="ps-sm-mod2" data-type="text"
								data-itemtemplate="PropostaTemplate">ID Apontamento</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Funcionário(a)</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Grupo</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Demanda</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Atividade</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Data Apontamento</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Horas Apontadas</th>


						</tr>
					</thead>

					<!------------------------------------ CABEÃALHO FILTROS------------------------------------------->
					<tr class="jsgrid-filter-row">
						<td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
							<div>
								</br>
								</br> <input style="text-align: center" type="text"
									class="ps-frm-entry" placeholder="Filtrar por ID"
									value="${apontamento.codigo}">
							</div>
						</td>
						<td style="text-align: center"
							class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
							<div class="ps-frm-select">
								<select name=funcionarioSelecionadoFiltrar>
									<c:forEach items="${apontamentos}" var="apontamento">
										<option value="${apontamento.codigo}">${apontamento.nome}</option>

									</c:forEach>
								</select>
							</div>
						</td>
						<td style="text-align: center"
							class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
							<div class="ps-frm-select">
								<select name=grupoSelecionadoFiltrar>
									<c:forEach items="${apontamentos}" var="apontamento">
										<option value="${apontamento.codigo}">${apontamento.grupo}</option>
									</c:forEach>
								</select>
							</div>
						</td>
						<td style="text-align: center"
							class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
							<div class="ps-frm-select">
								<select name=demandaSelecionadaFiltrar>
									<c:forEach items="${apontamentos}" var="apontamento">
										<option value="${apontamento.codigo}">${apontamento.demanda}</option>
									</c:forEach>
								</select>
							</div>
						</td>
						<td style="text-align: center"
							class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
							<div class="ps-frm-select">
								<select name=atividadeSelecionadaFiltrar>
									<c:forEach items="${apontamentos}" var="apontamento">
										<option value="${apontamento.codigo}">${apontamento.atividade}</option>
									</c:forEach>
								</select>
							</div>
						</td>
						<td></br>
						</br> <input type="text" name="test"
							class="ps-frm-entry ps-frm-calendar"
							data-calendardefaultdate="+1D" data-calendarmindate="-1M"
							data-calendarmaxdate="+45D" data-calendarselect="setDataVolta()"
							placeholder="dd/mm/aaaa" style="text-align: center;" id="dataIda" />

						</td>


						<td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
							<div>
								</br>
								</br> <input
									style="-ms-grid-column-align: center; text-align: center;"
									type="time" name="horas" min="00:10" max="23:59"
									class="ps-frm-entry ps-frm-valid">
							</div>
						</td>
					</tr>
					<tbody>

						<c:forEach items="${apontamentos}" var="apontamento">

							<tr>
								<td>${apontamento.codigo}</td>
								<td>${apontamento.funcionario}</td>
								<td>${apontamento.grupo}</td>
								<td>${apontamento.demanda}</td>
								<td>${apontamento.atividade}</td>
								<td>${apontamento.dataApontamento}</td>
								<td>${apontamento.horasApontadas}</td>
							</tr>

						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<footer class="ps-site-foot">
		<div class="ps-container">
			<div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
				À <span class="ps-currentYear">2020</span> Porto Seguro Todos os
				direitos reservados.
			</div>

		</div>
	</footer>


</body>

</html>