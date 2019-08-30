$(document).ready(function(){

	$("#modal1").on('hidden.bs.modal', function (e) {
		$("#modal1 iframe").attr("src", $("#modal1 iframe").attr("src"));
	});

	$("#modal2").on('hidden.bs.modal', function (e) {
		$("#modal2 iframe").attr("src", $("#modal2 iframe").attr("src"));
	});

//wow.js on scroll animations initialization
// wow = new WOW(
// {
// 	animateClass: 'animated',
// 	mobile: false,
// 	offset: 50
// }
// );
// wow.init();


//parallax effect initialization
$('.hero').parallax("50%", 0.3);

//Nice scroll initialization
$("html").niceScroll({
	scrollspeed: 50,
	autohidemode : false,
	cursorwidth : 8,
	cursorborderradius: 8,
	cursorborder : "0",
	background : "rgba(48, 48, 48, .4)",
	cursorcolor : '#1f1f1f',
	zindex : 999
});


// calculator logic

$('[data-toggle="tooltip"]').tooltip({ container: 'body' });


$('input').on('keyup', performCalculations);

function FV(rate, nper, pmt, pv, type) {
	if(pv == undefined){
		pv = 0;
	}
	if(type == undefined){
		type = 0;
	}
	var pow = Math.pow(1 + rate, nper),
	fv;
	if (rate) {
		fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
	} else {
		fv = -1 * (pv + pmt * nper);
	}
	return fv.toFixed(2);
}

function NPER (Rate, Pmt, PV, FV, Type) {

	FV=FV || 0; // default value of 0;
	Type=Type || 0; // default value of 0;

	var totalIncomeFromFlow;
	var sumOfPvAndPayment;
	var currentValueOfPvAndPayment;

	if (Rate == 0 && Pmt == 0) {
		console.warn("Invalid Pmt argument");
		return null;
	}
	else if (Rate == 0)
		return (- (PV + FV) / Pmt);
	else if (Rate <= -1) {
		console.warn("Invalid Pmt argument");
		return null;
	}

	totalIncomeFromFlow = (Pmt / Rate);
	if (Type == 1) {
		totalIncomeFromFlow *= (1 + Rate);
	}

	sumOfPvAndPayment = (-FV + totalIncomeFromFlow);
	currentValueOfPvAndPayment = (PV + totalIncomeFromFlow);
	if ((sumOfPvAndPayment < 0) && (currentValueOfPvAndPayment < 0)) {
		sumOfPvAndPayment = -sumOfPvAndPayment;
		currentValueOfPvAndPayment = 0-currentValueOfPvAndPayment;
	}
	else if ((sumOfPvAndPayment <= 0) || (currentValueOfPvAndPayment <= 0)) {
		console.warn("NPer cannot be calculated");
		return null;
	}

	totalInterestRate = sumOfPvAndPayment / currentValueOfPvAndPayment;
	return Math.log(totalInterestRate) / Math.log(Rate + 1);
}

$('.money').number(true, 0);
$('.percentage').number(true, 2);

function performCalculations(){
	console.log('performCalculations');

$('#warning').hide();
	// Require at least $1 in dollar inputs
	if($(this).hasClass('money') && $(this).val()<1){
		$(this).val(1);
	}

	var H5 = parseFloat($('#H5').val());
	var H6 = parseFloat($('#H6').val());
	var H7 = parseFloat($('#H7').val());
	var H8 = parseFloat($('#H8').val());
	var H9 = parseFloat($('#H9').val())/100;
	var H10 = parseFloat($('#H10').val())/100;

	// validation
	var error = false;
	// Require Withdrawal Rate is < Expected Return
	if(H10>H9){
		$('#H10, #H9').closest('.input-group').addClass('has-error');
		$('#warning').text('Withdrawal Rate must be less than Expected Return').show();
		error = true;
	}else{

		$('#H10, #H9').closest('.input-group').removeClass('has-error');
	}

	// calculations
	var H13 = H8/H10;
	var H12 = NPER(H9, -1*H7, -1*H6, H13, 0)+H5;

	if(isFinite(H12) && H12 > 60){
		console.log(H12);
		if(!error){

		$('#warning').text('Unable to retire before 60').show();
		}
	}

$('#H12').text($.number(H12,2));
$('#H13').text('$ '+$.number(H13,0));

}


performCalculations();

});