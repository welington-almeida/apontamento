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
							<li><a href="/visualizarGrupos">Grupos</a></li>
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
	</br></br>
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
								<td class="ps-heading-4 ps-light"><a href="javascript:;" class="ps-open-modal"
                                    data-modal="#ModalLarge" data-modalbackdropstatic="false"
                                    data-modalkeyboarddisable="true" data-modalonshow="console.log('abrir modal')"
                                    data-modalonhide="console.log('fechar modal')"><c:out value="${grupo.codigo}" /></a></td>
								<td><c:out value="${grupo.nome}" /></td>
								<td><c:out value="${grupo.tipo}" /></td>
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
            <div class="ps-modal-title">
               [Título]
            </div>
            <div class="ps-modal-content">

                <br />
                
                    <div class="ps-row">
                        <div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row">
                                    <label class="ps-frm-lbl">CPF</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-cpf"
                                        placeholder="Preencha o CPF" data-onerror="#cpfError" />
                                </div>
                                <div class="ps-mod8 ps-sm-mod4 ps-frm-row" id="cpfError" style="display: none;">
                                    <label class="ps-frm-lbl">&#160;</label>
                                    <div class="ps-popover ps-popover-error">
                                        <div class="ps-popover-ctt ps-popover-ctt-icon">
                                            <span class="ps-ico ps-ico-alert"></span>
                                            CPF Inválido.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row">
                                    <label class="ps-frm-lbl">
                                        CNPJ
                                    </label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-cnpj"
                                        placeholder="Preencha o CNPJ" data-onerror="#cnpjError" />
                                </div>
                                <div class="ps-mod8 ps-sm-mod4 ps-frm-row" id="cnpjError" style="display: none;">
                                    <label class="ps-frm-lbl">&#160;</label>
                                    <div class="ps-popover ps-popover-error">
                                        <div class="ps-popover-ctt ps-popover-ctt-icon">
                                            <span class="ps-ico ps-ico-alert"></span>
                                            CNPJ Inválido.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod12 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">E-mail</label>
                                    <input type="email" name="test" class="ps-frm-entry ps-frm-email"
                                        placeholder="Preencha o e-mail" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">CEP</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-zipcode"
                                        placeholder="Insira o CEP" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Máscara dinâmica</label>
                                    <input type="text" name="test" class="ps-frm-entry ps-frm-mask" data-mask="aaa-9999"
                                        placeholder="Insira uma data válida" />
                                </div>
                            </div>
                        </div>
                        <div class="ps-mod8 ps-sm-mod6">
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Somente números</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-number"
                                        placeholder="Somente números" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Sem caracteres especiais</label>
                                    <input type="text" name="test" class="ps-frm-entry ps-frm-cleanup"
                                        data-cleanuptext="allowNumbers" placeholder="Somente números" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Telefone res.</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-phone"
                                        data-onlynumber="false" placeholder="DDD + Número" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Telefone celular</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-celPhone"
                                        data-onlynumber="false" placeholder="DDD + Número" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Data</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-date"
                                        placeholder="Insira uma data válida" />
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
            <div class="ps-modal-foot">
                [rodapé]
            </div>
        </div>
    </div>
</body>

</html>