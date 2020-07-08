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
	src="<c:url value="/resources/visual/v.1/js/min/ps-lib.full-min.js" />"></script>

<meta charset="UTF-8">

<title>Novo Apontamento</title>
</head>

<body>
	<!-- CABEÃALHO -->
	<c:out value="${apontamento.codigo}"></c:out>
	<c:out value="${apontamento.funcionario}"></c:out>
	<c:out value="${apontamento.grupo}"></c:out>
	<c:out value="${apontamento.demanda}"></c:out>
	<c:out value="${apontamento.atividade}"></c:out>
	<c:out value="${apontamento.dataApontamento}"></c:out>
	<c:out value="${apontamento.horasApontadas}"></c:out>
	<c:out value="${atividade.codigoAtividade}"></c:out>
	<c:out value="${atividade.nomeAtividade}"></c:out>
	<c:out value="${atividade.horasApontadas}"></c:out>
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
							<li><a href="<c:url value="/apontamentos/" />">Novo
									Apontamento</a></li>
							<li><a
								href="<c:url value="/apontamento/meusApontamentos/" />">Meus
									Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Visualizar</a>
						<ul>
							<li><a href="<c:url value = "/grupo/" />">Grupos</a></li>
							<li><a href="<c:url value = "/demanda/" />">Demandas</a></li>
							<li><a href="<c:url value = "/atividade/" />">Atividades</a></li>
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
							<li><a href="#">Atualizar Usuário</a></li>

						</ul></li>

				</ul>
			</div>
		</div>
	</header>

	<!----------------------------------------------- CORPO ------------------------------------->
	</br>

	<div class="ps-container">

		<div class="ps-mod4 ps-sm-mod9">
			<table>
				<tr>
					<td>
						<h1 style="text-align: center; width: 300px;">Novo
							Apontamento</h1>
					</td>
					<td><a style="margin-left: 400px; width: 200px;"
						class="ps-btn ps-btn-primary ps-btn-ico"> <span
							class="ps-ico ps-ico-trashcan"></span> Limpar
					</a></td>
				</tr>
			</table>
		</div>

	</div>
	</br>
	<div class="ps-container" style="margin-left: 50px">
		<div class="ps-row">
			<div class="ps-mod8 ps-sm-mod12"></div>

			<form action=<c:url value="/apontamento/inserir/"/> method="POST">
				<table class="ps-table">

					<div class="ps-frm-select">
						<select>
							<option value="">Selecione A Demanda</option>
							<c:forEach items="${demandas}" var="demanda">
								<option value="${demanda.codigoDemanda}">${demanda.descricao}</option>
							</c:forEach>
						</select>
					</div>
					<thead>

						`
						<tr>
							<th>Nome Atividade</th>
							<c:forEach items="${datas}" var="data">
								<th class="ps-sm-mod2" data-type="text">${data}</th>
							</c:forEach>
							<th class="ps-sm-mod2" data-type="text">Total mês atual</th>

						</tr>
					</thead>

					<c:forEach items="${atividades}" var="atividade">
						<input type="hidden" name="codigoAtividade" value="${atividade.codigoAtividade}">
						<tr>
							<td>${atividade.nomeAtividade},${atividade.codigoAtividade}</td>
							<c:forEach items="${datas}" var="data" varStatus="posicao">
								<td><c:choose>
										<c:when test="${not empty atividade.horasApontadas}">
											<input type="time" name="apontamentos"></td>

								</c:when>
								<c:otherwise>
									<input type="time" name="apontamentos"
										value="00:00">
									</td>
								</c:otherwise>
								</c:choose>
							</c:forEach>
							<td></td>
						</tr>
					</c:forEach>


					<tr>
						<td><label>Horas Totais Apontadas</label></td>
						<td></td>

					</tr>

					<tr>
						<td><label>Horas Apontadas Senior</label></td>

						<td></td>

					</tr>
				</table>
				<input type="submit" style="margin-left: 20px; width: 200px;"
					class="ps-btn ps-btn-primary ps-btn-ico" value="Inserir">
			</form>

		</div>
	</div>
	</div>
	<!--  <footer class="ps-site-foot">
		<div class="ps-container">
			<div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
				À <span class="ps-currentYear">2020</span> Porto Seguro Todos os
				direitos reservados.
			</div>

		</div>
	</footer>
	-->
	</div>


</body>

</html>