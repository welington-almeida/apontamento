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
                <script src="<c:url value="/resources/visual/v.1/js/plugins/html5-3.6-respond-1.1.0.min.js" />"></script> 
            <![endif]-->


    <script src="<c:url value="/resources/visual/v.1/js/vendor/jquery-1.9.1.min.js" />"></script>
    <script src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js"/>"></script>
    <meta charset="UTF-8">

    <title>VisualizaÃ§Ã£o</title>
</head>

<body>
    <!-- CABEÃALHO -->
    <c:out value="${grupo.codigo}"></c:out>
    <c:out value="${grupo.nome}"></c:out>
    <c:out value="${grupo.tipo}"></c:out>
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
                            <li><a href="#">Visualizar Apontamentos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="ps-menu-hasLevel">Visualizar</a>
                        <ul>
                            <li><a href="#">Grupos</a></li>
                            <li><a href="#">Demandas</a></li>
                            <li><a href="#">Atividades</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="ps-menu-hasLevel">RelatÃ³rios</a>
                        <ul>
                            <li><a href="#">Por FuncionÃ¡rio</a></li>
                            <li><a href="#">Por Grupo</a></li>
                            <li><a href="#">Por Demanda</a></li>
                            <li><a href="#">Por Atividade</a></li>
                        </ul>

                    </li>
                    <li>
                        <a href="#">AtualizaÃ§Ã£o de UsuÃ¡rios</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <!-- CORPO -->
    </br>
    <div class="ps-container">
        <div class="ps-row">
            <div class="ps-mod8 ps-sm-mod12">
                <table class="ps-table ps-datagrid" data-pagesize="5" data-filtering="true">
                    <thead>

                        <tr>
                            <th class="ps-sm-mod2" data-type="text" data-itemtemplate="PropostaTemplate">Proposta</th>
                            <th class="ps-sm-mod3" data-type="text" data-itemtemplate="NomeTemplate">Nome</th>
                            <th class="ps-hide ps-sm-show ps-sm-mod3" data-type="select" data-items="produtos"
                                data-valuefield="id" data-textfield="Name" data-sorter="number">Produto</th>
                            <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="text" data-sorting="false">SUSEP</th>
                            <th class="ps-hide ps-sm-show ps-sm-mod2" data-type="text" data-sorter="date">Recebida em
                            </th>
                            <th class="ps-sm-mod2" data-itemtemplate="StatusTemplate" data-type="select"
                                data-items="reqStatus" data-valuefield="id" data-textfield="Name" data-sorter="number">
                                Status</th>
                        </tr>
                    </thead>
                    <tr class="jsgrid-filter-row">
                        <td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                            <div>
                                <input type="text" class="ps-frm-entry" placeholder="Filtrar Proposta" value="">
                            </div>
                        </td>
                        <td class="ps-sm-mod3 jsgrid-align-left" style="width: auto;">
                            <div>
                                <input type="text" class="ps-frm-entry" placeholder="Filtrar Nome" value="">
                            </div>
                        </td>
                        <td class="ps-hide ps-sm-show ps-sm-mod3 jsgrid-align-left" style="width: auto;">
                            <div class="ps-frm-select">
                                <select>
                                    <option value="">Filtrar</option>
                                    <option value="1">RE/FianÃ§a/Transporte</option>
                                    <option value="2">AutomÃ³vel</option>
                                    <option value="3">Vida e previdÃªncia</option>
                                </select>
                            </div>
                        </td>
                        <td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                            <div>
                                <input type="text" class="ps-frm-entry" placeholder="Filtrar SUSEP" value="">
                            </div>
                        </td>
                        <td class="ps-hide ps-sm-show ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                            <div>
                                <input type="text" class="ps-frm-entry" placeholder="Filtrar Recebida em" value="">
                            </div>
                        </td>
                        <td class="ps-sm-mod2 jsgrid-align-left" style="width: auto;">
                            <div class="ps-frm-select">
                                <select>
                                    <option value="">Filtrar</option>
                                    <option value="1">Emitida</option>
                                    <option value="2">Em anÃ¡lise</option>
                                    <option value="3">Aguardando posiÃ§Ã£o</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tbody>


                        <!--Para JSON, depois que tivermos a conexÃ£o com o banco-->
                        <!--<tbody data-source="[Seu serviÃ§o JSON]" data-method="get"></tbody>
                        </table>-->


                        <!--No campo data-source, preencher o endereÃ§o do serviÃ§o JSON que irÃ¡ devolver todos os itens da em formato de array.


                            Definir o mÃ©todo de consulta no campo data-method: GET ou POST.
Se certificar que todas as colunas estÃ£o com o parÃ¢metro data-name preenchidos conforme cada campo do JSON. Por exemplo:
    Modelo do JSON 
{
    [
        "Campo1": "Campo 1 - linha 1",
        "Campo2": "Campo 2 - linha 1"
    ],
    [
        "Campo1": "Campo 1 - linha 2",
        "Campo2": "Campo 2 - linha 2"
    ]
  }
  

  <th [...] data-name="Campo1">Campo 1</th>
  <th [...] data-name="Campo2">Qualquer nome de campo</th>-->


                        <tr>
                            <td class="ps-heading-4 ps-light"><a href="javascript:;" class="ps-open-modal"
                                    data-modal="#ModalLarge" data-modalbackdropstatic="false"
                                    data-modalkeyboarddisable="true" data-modalonshow="console.log('abrir modal')"
                                    data-modalonhide="console.log('fechar modal')">65-36027222</a><br />
                            </td>
                            <td>NORMA NOGUEIRA PEREIRA</td>
                            <td>1</td>
                            <td>S5005J</td>
                            <td>18/05/2014</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>20-20962040</td>
                            <td>MARCIA CURY</td>
                            <td>2</td>
                            <td>S5005J</td>
                            <td>18/04/2015</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>12-22988317</td>
                            <td>AIRTON CIRO STRIANI</td>
                            <td>2</td>
                            <td>S5005J</td>
                            <td>18/05/2015</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>65-36075699</td>
                            <td>FRANCISCA GUILHERME ZANELLA</td>
                            <td>1</td>
                            <td>S5005J</td>
                            <td>19/05/2015</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>12-47011206</td>
                            <td>MARCOS EDUARDO PAGLIANTI</td>
                            <td>1</td>
                            <td>S5005J</td>
                            <td>19/05/2015</td>
                            <td>1</td>
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
            <div class="ps-modal-title">
                [tÃ­tulo]
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
                                            CPF InvÃ¡lido.
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
                                            CNPJ InvÃ¡lido.
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
                                    <label class="ps-frm-lbl">MÃ¡scara dinÃ¢mica</label>
                                    <input type="text" name="test" class="ps-frm-entry ps-frm-mask" data-mask="aaa-9999"
                                        placeholder="Insira uma data vÃ¡lida" />
                                </div>
                            </div>
                        </div>
                        <div class="ps-mod8 ps-sm-mod6">
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Somente nÃºmeros</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-number"
                                        placeholder="Somente nÃºmeros" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Sem caracteres especiais</label>
                                    <input type="text" name="test" class="ps-frm-entry ps-frm-cleanup"
                                        data-cleanuptext="allowNumbers" placeholder="Somente nÃºmeros" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Telefone res.</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-phone"
                                        data-onlynumber="false" placeholder="DDD + NÃºmero" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Telefone celular</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-celPhone"
                                        data-onlynumber="false" placeholder="DDD + NÃºmero" />
                                </div>
                            </div>
                            <div class="ps-row">
                                <div class="ps-mod8 ps-sm-mod8 ps-frm-row ps-frm-valid">
                                    <label class="ps-frm-lbl">Data</label>
                                    <input type="tel" name="test" class="ps-frm-entry ps-frm-date"
                                        placeholder="Insira uma data vÃ¡lida" />
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
            <div class="ps-modal-foot">
                [rodapÃ©]
            </div>
        </div>
    </div>



</body>

</html>