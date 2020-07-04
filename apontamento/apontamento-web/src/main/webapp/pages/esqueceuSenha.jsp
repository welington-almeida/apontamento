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
    <script src="<c:url value="/resources/visual/v.1/js/min/ps-lib.core-min.js" />"></script>
    <script src="<c:url value="/resources/visual/v.1/js/min/ps-lib.full-min.js" />"></script>

    <meta charset="UTF-8">

	<title>Esqueci minha senha</title>
</head>

<body style="background: #fff;">
	<header class="ps-site-top ps-site-bgWhite">
		<div class="ps-container">
			<div class="ps-mod4 ps-sm-mod3">
				<a href="<c:url value = "/login" />" title="Porto Seguro"><span class="ps-logo"></span></a>
			</div>
	</header>

	<div class="ps-site-container" style="padding-bottom: 50px;">

		<section>

			<div class="ps-sm-mod4 ps-sm-lspan1 lp-chat-frm" style="align-content: center;">
				</br>
				</br>
				<h4 class="ps-heading-4 ps-light">Esqueci minha senha</h4>
				</br>
				<form name="" id="validateForm">
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">
							<input type="email" name="email" class="ps-frm-entry ps-frm-valid"
								placeholder="Digite seu E-mail">
						</div>
					</div>
					<div class="ps-row ps-frm-row">
						<div class="ps-mod8 ps-sm-mod12">
							<a href="javascript:;" class="ps-btn ps-btn-primary ps-btn-blue-dark ps-frm-validate"
								data-validatescope="#validateForm"
								data-validatesuccess="alert('Campos vÃÂ¡lidos')"><span></span>Redefinir
								Senha</a>
						</div>
						</br>
						</br>
						</br>
						<div class="ps-mod8 ps-sm-mod12">
							<a href="<c:url value = "/login" />" class="ps-btn ps-btn-primary ps-btn-blue-dark"
								data-validatescope="#validateForm"><span></span>Voltar</a>
						</div>
					</div>
				</form>
			</div>

		</section>

		<footer class="ps-site-foot">
			<div class="ps-container">
				<div class="ps-mod8 ps-sm-mod5 ps-md-mod4">
					Ã <span class="ps-currentYear">2020</span> Porto Seguro Todos
					os direitos reservados.
				</div>

			</div>
		</footer>
	</div>

</body>

</html>