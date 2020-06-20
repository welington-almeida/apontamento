<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">



<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
    <link href="<c:url value="/resources/visual/v.1/css/ps-lib.core-min.css" />" rel="stylesheet" type="text/css" media="screen" />
    <link href="<c:url value="/resources/visual/v.1/css/ps-lib-iconGlyphs-min.css" />" rel="stylesheet" type="text/css" media="screen" />
    <!--[if lt IE 9]> 
                <script src="<c:url value="/resources/visual/v.1/js/plugins/html5-3.6-respond-1.1.0.min.js" /> "></script> 
            <![endif]-->


    <script src="<c:url value="/resources/visual/v.1/js/vendor/jquery-1.9.1.min.js" />" ></script>
    <script src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js" /> "></script>
    <script src="<c:url value="/resources/visual/v.1/js/vendor/visualizacoes.js" />"></script>
    <script src="<c:url value="/resources/visual/v.1/js/vendor/calendario.js"/> "></script>
    <meta charset="UTF-8">

    <title>Visualizar Atividades</title>
</head>

<body>
    <!-- CABEÃALHO -->
    <c:out value="${grupo.codigo}"></c:out>
    <c:out value="${grupo.nome}"></c:out>
    <c:out value="${grupo.tipo}"></c:out>
    <!--<jsp:useBean id="atividade" class="br.com.porto.controlesinternos.apontamento.model.Atividade"/> -->
    <jsp:useBean id="demanda" class="br.com.porto.controlesinternos.apontamento.model.Demanda"/>
    <jsp:useBean id="demandaDAO" class="br.com.porto.controlesinternos.apontamento.dao.impl.DemandaDAOImpl"/>
    
    <header class="ps-site-top ps-site-bgWhite">
        <div class="ps-container">
            <div class="ps-mod4 ps-sm-mod2">
                <a href="inicio.html" title="Porto Seguro"><span class="ps-logo"></span></a>
            </div>
            <div class="ps-mod4 ps-sm-mod9">
                <ul class="ps-menu ps-menu-mobile ps-menu-allCaps ps-menu-horizontal" data-mobilewithouttext="true">
                    <li>
                        <a href="#" class="ps-menu-hasLevel">Apontamentos</a>
                        <ul>
                            <li><a href="#">Novo Apontamento</a></li>
                            <li><a href="#">Meus Apontamentos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="ps-menu-hasLevel">Visualizar</a>
                        <ul>
                            <li><a href="#">Grupos</a></li>
                            <li><a href="#">Demandas</a></li>
                            <li><a href="#">Atividades</a></li>
                            <li><a href="#">Apontamentos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="ps-menu-hasLevel">Relatórios</a>
                        <ul>
                            <li><a href="#">Por Funcionário</a></li>
                            <li><a href="#">Por Grupo</a></li>
                            <li><a href="#">Por Demanda</a></li>
                            <li><a href="#">Por Atividade</a></li>
                        </ul>

                    </li>
                    <li>
                        <a href="#" class="ps-menu-hasLevel">Usuário</a>
                        <ul>
                            <li><a href="#">Redefinir Senha</a></li>
                            <li><a href="#">Atualizar Usuários</a></li>

                        </ul>

                    </li>

                </ul>
            </div>
        </div>
    </header>

    <!------------------------------------ CORPO ------------------------------------------->
    </br>
    <div class="ps-container">
        <div class="ps-mod4 ps-sm-mod9">
            <table>
                <tr>
                    <td>
                        <h1 style="text-align: center; width: 100px;">Atividades</h1>
                    </td>
                    <td>
                        <a style="margin-left: 635px; width: 200px;"
                            class="ps-open-modal ps-btn ps-btn-primary ps-btn-ico"
                            style="margin-left: 25px; width: 200px;" data-modal="#ModalLarge2"
                            data-modalbackdropstatic="false" data-modalkeyboarddisable="true"
                            data-modalonshow="console.log('abrir modal')"
                            data-modalonhide="console.log('fechar modal')"><span class="ps-ico ps-ico-remove"></span>
                            .   Encerrar Atividade</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="ps-open-modal ps-btn ps-btn-primary ps-btn-ico"
                            style="margin-left: 25px; width: 200px;" data-modal="#ModalLarge"
                            data-modalbackdropstatic="false" data-modalkeyboarddisable="true"
                            data-modalonshow="console.log('abrir modal')"
                            data-modalonhide="console.log('fechar modal')"><span class="ps-ico ps-ico-add"></span>
                            Nova Atividade</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="ps-mod8 ps-sm-mod12">
            <table class="ps-table ps-datagrid" data-pagesize="5" data-filtering="true">
                <!------------------------------------ CABEÇALHO TABELA ------------------------------------------->
                <thead>
                    </br>
                    <tr>
                        <th class="ps-sm-mod2" data-type="text" data-itemtemplate="PropostaTemplate">ID Atividade
                        </th>
                        <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select" data-items="produtos"
                            data-valuefield="id" data-textfield="Name" data-sorter="number">Nome</th>
                        <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select" data-items="produtos"
                            data-valuefield="id" data-textfield="Name" data-sorter="number">Nome da Demanda
                            Pertencente
                        </th>
                        <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select" data-items="produtos"
                            data-valuefield="id" data-textfield="Name" data-sorter="number">Nome do Grupo
                            Pertencente
                        </th>
                        <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="select" data-items="produtos"
                            data-valuefield="id" data-textfield="Name" data-sorter="number">Horas Totais
                        </th>


                    </tr>
                </thead>

                <!------------------------------------ CABEÇALHO FILTROS------------------------------------------->
                <tr class="jsgrid-filter-row">
                    <td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                        <div>
                            </br></br>
                            <input style="text-align: center" type="text" class="ps-frm-entry"
                                placeholder="Filtrar por ID" value="">
                        </div>
                    </td>
                    <td style="text-align: center" class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
                        <div class="ps-frm-select">
                            <select>
                                <option value="">Atividade</option>
                                <option value="1">Atividade 1</option>
                                <option value="2">Atividade 2</option>
                                <option value="3">Atividade 3</option>
                            </select>
                        </div>
                    </td>

                    <td style="text-align: center" class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
                        <div class="ps-frm-select">
                            <select>
                                <option value="">Demanda</option>
                                <option value="1">Demanda 1</option>
                                <option value="2">Demanda 2</option>
                                <option value="3">Demanda 3</option>
                            </select>
                        </div>
                    </td>
                    <td style="text-align: center" class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left">
                        <div class="ps-frm-select">
                            <select>
                                <option value="">Grupo</option>
                                <option value="1">Compliance</option>
                                <option value="2">Controles Internos</option>
                                <option value="3">Prevenção a Lavagem de Dinheiro</option>
                                <option value="4">Administração</option>
                            </select>
                        </div>
                    </td>
                    <td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                        <div>
                            </br></br>

                            <input style="-ms-grid-column-align: center; text-align: center;" type="time" name="horas"
                                min="00:10" max="23:59" class="ps-frm-entry ps-frm-valid">
                        </div>
                    </td>
                </tr>
                <tbody>
                    <c:forEach items="${atividades}" var="atividade">
                    <tr>
                        <td class="ps-heading-4 ps-light"><a href="#">${atividade.codigoAtividade}</a></td>
                        <td>${atividade.nomeAtividade}</td>
                        <td>${atividade.demanda.descricao}</td>
                        <td>${atividade.demanda.grupo.nome}</td>
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
                Nova Atividade
            </div>
            <div class="ps-modal-content">


                <div class="ps-row">
                    <div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
                        <form action="/apontamento/atividade/inserir" name="" id="validateForm" method="POST">
                            <div class="ps-row ps-frm-row">
                                <div class="ps-mod8 ps-sm-mod12">
                                    <label class="ps-frm-lbl">Nome da Atividade</label>
                                    <input type="text" name="nomeAtividade" class="ps-frm-entry ps-frm-valid"
                                        placeholder="Nome">
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row">
                                    <label class="ps-frm-lbl">Demanda Pertencente</label>
                                    <div class="ps-frm-select">
                                        <select name="demanda.codigoDemanda">
                                        <c:forEach items="${demandas}" var="demanda">
												<option value="${demanda.codigoDemanda}">${demanda.descricao}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="ps-row">
                                    <div class="ps-mod8 ps-sm-mod8 ps-frm-row">
                                        <label class="ps-frm-lbl">Grupo Pertencente</label>
                                        <select name="grupo.codigo"> 
                                       <c:forEach items="${grupos}" var="grupo" >
                                        <option value="${grupo.codigo}">${grupo.nome}</option>
                                        </c:forEach>
                                        </select>
                                           
                                    </div>

                                </div>

                                <div class="ps-row ps-frm-row">
                                    <div class="ps-mod8 ps-sm-mod12">
                                        <label class="ps-frm-lbl">Horas Estimadas</label>
                                        <input type="number" name="horasEstimadas"
                                            class="ps-frm-entry ps-frm-valid" placeholder="Estimativa de Horas"
                                            value="0">
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Criar Atividade" class="ps-btn ps-btn-primary ps-btn-blue-dark" style="width: 200px;"
                                data-validatescope="#validateForm"/>

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
            <div class="ps-modal-title">
                Encerrar Atividade
            </div>
            <div class="ps-modal-content">
                <div class="ps-row">
                    <div class="ps-mod8 ps-sm-mod6" style="text-align: center;">
                        <form action="/apontamento/atividade/deletar" name="" id="validateForm" method="POST">
                            <div class="ps-frm-select">
                                <select name="codigoAtividade">
                                <c:forEach items="${atividades}" var="atividade">
                                
                                    <option value="${atividade.codigoAtividade}">${atividade.codigoAtividade}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            </br>
                            <input type="submit" value="Encerrar Atividade" class="ps-btn ps-btn-primary ps-btn-blue-dark" style="width: 200px;"
                                data-validatescope="#validateForm"/>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>

    <footer class="ps-site-foot">
        <div class="ps-container">
            <div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
                À <span class="ps-currentYear">2020</span> Porto Seguro Todos
                os direitos reservados.
            </div>

        </div>
    </footer>


</body>

</html>