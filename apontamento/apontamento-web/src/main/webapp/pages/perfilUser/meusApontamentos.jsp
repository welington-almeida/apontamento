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

<title>Meus apontamentos</title>
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
							<li><a href="#">Novo Apontamento</a></li>
							<li><a href="#">Meus Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Visualizar</a>
						<ul>
							<li><a href="#">Grupos</a></li>
							<li><a href="#">Demandas</a></li>
							<li><a href="#">Atividades</a></li>
							<li><a href="#">Apontamentos</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
						<ul>
							<li><a href="#">Por Funcionário</a></li>
							<li><a href="#">Por Grupo</a></li>
							<li><a href="#">Por Demanda</a></li>
							<li><a href="#">Por Atividade</a></li>
						</ul></li>
					<li><a href="#" class="ps-menu-hasLevel">UsuÃ¡rio</a>
						<ul>
							<li><a href="#">Redefinir Senha</a></li>
							<li><a href="#">Atualizar Usuário</a></li>

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
					<h1 style="text-align: center">Meus Apontamentos</h1>
					<!------------------------------------ CABEÃALHO TABELA ------------------------------------------->
					<thead>
						</br>
						<tr>
							<th class="ps-sm-mod2" data-type="text"
								data-itemtemplate="PropostaTemplate">ID Apontamento</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Grupo</th>
							<th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Demanda</th>
							<th class="ps-hide ps-sm-show ps-sm-mod3" data-type="select"
								data-items="produtos" data-valuefield="id" data-textfield="Name"
								data-sorter="number">Atividade</th>
							<th class="ps-hide ps-sm-show ps-sm-mod3" data-type="text"
								data-sorting="false">Data</th>
							<th class="ps-hide ps-sm-show ps-sm-mod3" data-type="text"
								data-sorter="date">Horas Apontadas</th>

						</tr>
					</thead>

					<!------------------------------------ CABEÃALHO FILTROS------------------------------------------->
					<tr class="jsgrid-filter-row">
						<td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
							<div>
								</br>
								</br> <input type="text" class="ps-frm-entry"
									placeholder="Filtrar por ID" value="">
							</div>
						</td>
						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left"
							style="width: auto;">
							<div class="ps-frm-select">
								<select>
									<option value="">Selecione</option>
									<option value="1">Compliance</option>
									<option value="2">Controles Internos</option>
									<option value="3">Prevenção a Lavagem de Dinheiro</option>
								</select>
							</div>
						</td>
						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left"
							style="width: auto;">
							<div class="ps-frm-select">
								<select>
									<option value="">Selecione</option>
									<option value="1">Demanda 1</option>
									<option value="2">Demanda 2</option>
									<option value="3">Demanda 3</option>
								</select>
							</div>
						</td>
						<td class="ps-hide ps-sm-show ps-sm-mod3 jsgrid-align-left"
							style="width: auto;">
							<div class="ps-frm-select">
								<select>
									<option value="">Selecione</option>
									<option value="1">Atividade A</option>
									<option value="2">Atividade B</option>
									<option value="3">Atividade C</option>
								</select>
							</div>
						</td>
						<td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left"
							style="width: auto;">
							<div>
								</br>
								</br> <input type="date" style="text-align: center" name="test"
									class="ps-frm-entry" placeholder="dd/mm/aaaa" id="dataIda" />

							</div>
						</td>

						<td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
							<div>
								</br>
								</br> <input style="width: auto;" type="time" name="horas"
									min="00:10" max="23:59" class="ps-frm-entry ps-frm-valid">
							</div>
						</td>
					</tr>
					<tbody>


						<tr>
							<td class="ps-heading-4 ps-light"><a href="javascript:;"
								class="ps-open-modal" data-modal="#ModalLarge"
								data-modalbackdropstatic="false"
								data-modalkeyboarddisable="true"
								data-modalonshow="console.log('abrir modal')"
								data-modalonhide="console.log('fechar modal')">10-10001</a><br />
							</td>
							<td>Compliance</td>
							<td>Demanda 1</td>
							<td>Atividade 3</td>
							<td>18/05/2020</td>
							<td>02:00</td>
						</tr>
						<tr>
							<td class="ps-heading-4 ps-light"><a href="javascript:;"
								class="ps-open-modal" data-modal="#ModalLarge"
								data-modalbackdropstatic="false"
								data-modalkeyboarddisable="true"
								data-modalonshow="console.log('abrir modal')"
								data-modalonhide="console.log('fechar modal')">10-10002</a><br />
							</td>
							<td>Controles Internos</td>
							<td>Demanda 2</td>
							<td>Atividade 1</td>
							<td>13/05/2020</td>
							<td>01:10</td>
						</tr>
						<tr>
							<td class="ps-heading-4 ps-light"><a href="javascript:;"
								class="ps-open-modal" data-modal="#ModalLarge"
								data-modalbackdropstatic="false"
								data-modalkeyboarddisable="true"
								data-modalonshow="console.log('abrir modal')"
								data-modalonhide="console.log('fechar modal')">10-10003</a><br />
							</td>
							<td>PrevenÃ§Ã£o a Lavagem de Dinheiro</td>
							<td>Demanda 3</td>
							<td>Atividade 2</td>
							<td>06/04/2020</td>
							<td>00:30</td>
						</tr>
						<tr>
							<td class="ps-heading-4 ps-light"><a href="javascript:;"
								class="ps-open-modal" data-modal="#ModalLarge"
								data-modalbackdropstatic="false"
								data-modalkeyboarddisable="true"
								data-modalonshow="console.log('abrir modal')"
								data-modalonhide="console.log('fechar modal')">10-10004</a><br />
							</td>
							<td>AdministraÃ§Ã£o</td>
							<td>Demanda 1</td>
							<td>Atividade 1</td>
							<td>02/03/2020</td>
							<td>01:30</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="ps-modal" id="ModalLarge">
		<a href="javascript:;" class="ps-modal-close ps-modal-close-default"><span
			class="ps-ico ps-ico-sm ps-sm-ico-lg ps-ico-close"></span></a>
		<div class="ps-modal-container ps-sm-modal-large">
			<div class="ps-modal-title">Atualizar Apontamento</div>
			<div class="ps-modal-content">

				<br />

				<div class="ps-row">
					<div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
						<div class="ps-row">
							<div class="ps-mod8 ps-sm-mod8 ps-frm-row">
								<label class="ps-frm-lbl">Grupo</label>
								<div class="ps-frm-select">
									<select name="test">
										<option>Selecione</option>
										<option>OpÃ§Ã£o 1</option>
										<option>OpÃ§Ã£o 2</option>
										<option>OpÃ§Ã£o 3</option>
									</select>
								</div>
							</div>

						</div>
						<div class="ps-row">
							<div class="ps-mod8 ps-sm-mod8 ps-frm-row">
								<label class="ps-frm-lbl">Demanda</label>
								<div class="ps-frm-select">
									<select name="test">
										<option>Selecione</option>
										<option>OpÃ§Ã£o 1</option>
										<option>OpÃ§Ã£o 2</option>
										<option>OpÃ§Ã£o 3</option>
									</select>
								</div>
							</div>

						</div>

						<div class="ps-row">
							<div class="ps-mod8 ps-sm-mod8 ps-frm-row">
								<label class="ps-frm-lbl">Atividade</label>
								<div class="ps-frm-select">
									<select name="test">
										<option>Selecione</option>
										<option>OpÃ§Ã£o 1</option>
										<option>OpÃ§Ã£o 2</option>
										<option>OpÃ§Ã£o 3</option>
									</select>
								</div>
							</div>

						</div>
					</div>
					<div class="ps-mod8 ps-sm-mod6">
						<div class="ps-row">
							<div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
								<label class="ps-frm-lbl">Data do Apontamento</label> <input
									type="date" name="test" class="ps-frm-entry"
									placeholder="dd/mm/aaaa" id="dataIda" />
							</div>
						</div>
						<div class="ps-row">
							<div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
								<label class="ps-frm-lbl">Quantidade de Horas</label> <input
									style="width: 200px" type="time" name="horas" min="00:10"
									max="23:59" class="ps-frm-entry ps-frm-valid"
									placeholder="Horas">
							</div>
						</div>

					</div>
				</div>
				<table>
					<tr>

						<td><a href="javascript:;"
							style="margin-left: 450px; width: 150px;"
							class="ps-btn ps-btn-primary ps-btn-ico ps-frm-validate"
							data-validatescope="validateForm1"
							data-validatesuccess="alert('Campos vÃ¡lidos')"> <span
								class="ps-ico ps-ico-add"></span> Atualizar
						</a></td>

					</tr>
				</table>
			</div>

		</div>
	</div>

	<footer class="ps-site-foot">
		<div class="ps-container">
			<div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
				Ã <span class="ps-currentYear">2020</span> Porto Seguro Todos os
				direitos reservados.
			</div>

		</div>
	</footer>


</body>

</html>