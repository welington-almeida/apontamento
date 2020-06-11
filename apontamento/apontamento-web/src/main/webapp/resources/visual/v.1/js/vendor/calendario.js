function setDataVolta() {
	if(psLib.IsMobile)
    	$('#dataVolta').next("input").attr("min",$("#dataIda").next("input").val());
	else
		$('#dataVolta').datepicker("setDate", this.value).datepicker("option", "minDate", this.value);
}

function setDataIda() {
	if(psLib.IsMobile) 
		$('#dataIda').next("input").attr("max",$("#dataVolta").next("input").val());
	else
		$('#dataIda').datepicker("option", "maxDate", this.value);
}