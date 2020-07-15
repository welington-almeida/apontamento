<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">



<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
    <link href="<c:url value="/resources/visual/v.1/css/ps-lib.core-min.css" />" 
    rel="stylesheet" type="text/css" media="screen" />
    <link href="<c:url value="/resources/visual/v.1/css/ps-lib-iconGlyphs-min.css" />" 
    rel="stylesheet" type="text/css" media="screen" />
    <!--[if lt IE 9]> 
                <script src="<c:url value="/resources/visual/v.1/js/plugins/html5-3.6-respond-1.1.0.min.js" />"></script> 
            <![endif]-->


    <script src="<c:url value="/resources/visual/v.1/js/vendor/jquery-1.9.1.min.js" />"></script>
    <script src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js" />" ></script>
    <script src="<c:url value="/resources/visual/v.1/js/vendor/visualizacoes.js" />"></script>
    <script src="<c:url value="/resources/visual/v.1/js/vendor/calendario.js" />" ></script>
    <meta charset="UTF-8">



    <title>Relatórios</title>
</head>


<body>

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
							<c:if test="${usuarioLogado.perfil.codigo} = 3">
								<li><a href="<c:url value = "/apontamentos/" />">Apontamentos</a></li>
							</c:if>
						</ul></li>
					<!-- <c:if test="${usuarioLogado.perfil.codigo} = 2">
						<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
							<ul>
								<li><a href="#">Por Funcionário</a></li>
								<li><a href="#">Por Grupo</a></li>
								<li><a href="#">Por Demanda</a></li>
								<li><a href="#">Por Atividade</a></li>
							</ul></li>
					</c:if>
					-->
					<li><a href="#" class="ps-menu-hasLevel">Relatórios</a>
							<ul>
								<li><a href="#">Por Funcionário</a></li>
								<li><a href="#">Por Grupo</a></li>
								<li><a href="#">Por Demanda</a></li>
								<li><a href="#">Por Atividade</a></li>
							</ul></li>
					<li><a href="" class="ps-menu-hasLevel">Usuário</a>
						<ul>
							<li><a href="<c:url value = "/usuario/alterarSenha" />">Redefinir
									Senha</a></li>
							<!-- <c:if test="${usuarioLogado.perfil.codigo} = 3">
								<li><a href="<c:url value = "/usuarios/" />">Atualizar
										Usuário</a></li>
							</c:if>
							-->
							<li><a href="<c:url value = "/usuarios/" />">Atualizar
										Usuário</a></li>
						</ul></li>
						
						<li><a href="<c:url value = "/logout" />">Sair</a></li>
				</ul>
				
			</div>
		</div>
	</header>
    </br>
    </br>
    </div>


    <div>
        <h1 style="text-align: center">RelatÃ³rios</h1>
    </div>
    </br></br>

    <div class="ps-container">
        <div>
            <div class="ps-mod6 ps-sm-mod6">
                <div class="ps-chart" data-charttype="bar" data-chartsource="function:barVar()">
                    <h2 style="text-align: center;">Horas Totais Demanda: Estimado x Apontado</h2>
                    </br>
                </div>
                <i>
                    <h3 style="text-align: center;">Horas totais das demandas ativas</h3>
                </i>
            </div>

            <div class="ps-mod6 ps-sm-mod6">
                <div class="ps-chart" data-charttype="doughnut" data-chartsource="doughnutVar"
                    data-chartconfig="doughnutConfig" data-chartheight="300">
                    <h2 style="text-align: center;">Horas totais por grupo</h2>
                    </br>
                </div>
            </div>
        </div>
    </div>
    <!-- GRÃFICO DE PIZZA FECHADO
    <div class="ps-mod8 ps-sm-mod6">
        <div class="ps-chart" data-charttype="pie" data-chartsource="pieVar" data-chartheight="300"></div>
    </div>
-->
   
</body>

</html>