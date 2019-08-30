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

$('[data-toggle="tooltip"]').tooltip();


$('#tab1 input').on('keyup', performCalculations1);
$('#tab2 input').on('keyup', performCalculations2);

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

		  $('.number').number(true, 2);

		  function performCalculations1(){
		  	console.log('performCalculations1');

		  	var $me = $(this);

		  	if($me.attr('id') == 'calc1_deferredBalance' || $me.attr('id') == 'calc1_deferredContributions' ){

		  		if($me.val() <= 0){
		  			$me.val(1);
		  		}

		  	}


		  	
		  	var currentAge = parseFloat($('#calc1_currentAge').val());
		  	var deferredBalance = parseFloat($('#calc1_deferredBalance').val());
		  	var deferredContributions = parseFloat($('#calc1_deferredContributions').val());
		  	var taxableBalance = parseFloat($('#calc1_taxableBalance').val());
		  	var taxableContributions = parseFloat($('#calc1_taxableContributions').val());
		  	var expensesAtFire = parseFloat($('#calc1_expensesAtFire').val());
		  	var yearlyReturn = parseFloat($('#calc1_yearlyReturn').val())/100;
		  	var safeWithdrawalRate = parseFloat($('#calc1_safeWithdrawalRate').val())/100;

		  	console.log('values are: ', currentAge, deferredBalance, deferredContributions, taxableBalance, taxableContributions, expensesAtFire, yearlyReturn, safeWithdrawalRate);

			//output parameters
			var fireAge = 0;
			var deferredBalanceAtFire = 0;
			var taxableBalanceAtFire = 0;
			var deferredStartAge = 0;
			var taxableBalanceAtDeferredAge = 0;
			var deferredBalanceAtDeferredAge = 0;


			deferredBalanceAtDeferredAge = expensesAtFire / safeWithdrawalRate;

			fireAge = currentAge;
			var longTermAge = 60;//hardcode

			while(fireAge < longTermAge){
				fireAge += 0.25;

				deferredBalanceAtFire = parseFloat(FV(yearlyReturn,fireAge-currentAge, -1*deferredContributions,-1*deferredBalance));
				deferredStartAge =  NPER(yearlyReturn, 0, -1*deferredBalanceAtFire, deferredBalanceAtDeferredAge, 0 )+ fireAge;


				taxableBalanceAtFire = parseFloat(FV(yearlyReturn, (fireAge - currentAge ), -1*taxableContributions, -1*taxableBalance));
				taxableBalanceAtDeferredAge = parseFloat(FV(yearlyReturn, (deferredStartAge - fireAge) ,expensesAtFire, -1*taxableBalanceAtFire, 1));

				if(taxableBalanceAtDeferredAge >= 0 ){//|| taxableBalanceAtDeferredAge >=0){
	console.log('loop break');
	break;
}

}

if(taxableBalanceAtDeferredAge <0){
	// $('#calc1_fireAge').text('Unable to achive FIRE before 60');
	$('#warning').slideDown();
}else{
	$('#warning').slideUp();
}

$('#calc1_fireAge').text($.number(fireAge,2));
$('#calc1_deferredBalanceAtDeferredAge').text('$ '+$.number(deferredBalanceAtDeferredAge,2));
$('#calc1_deferredBalanceAtFire').text('$ '+$.number(deferredBalanceAtFire,2));
$('#calc1_taxableBalanceAtFire').text('$ '+$.number(taxableBalanceAtFire,2));
$('.deferredStartAge').text($.number(deferredStartAge,2));
$('#calc1_taxableBalanceAtDeferredAge').text('$ '+$.number(taxableBalanceAtDeferredAge,2));
$('#calc1_deferredBalanceAtDeferredAge').text('$ '+$.number(deferredBalanceAtDeferredAge,2));


}


function performCalculations2(){
	console.log('performCalculations2');

	var longTermAge = parseFloat($('#calc2_longTermAge').val());
	longTermAge = isNaN(longTermAge)? '': longTermAge;
	$('.longTermAge').text(longTermAge);

	var currentAge = parseFloat($('#calc2_currentAge').val());
	var startingBalance = parseFloat($('#calc2_startingBalance').val());
	var yearlyContributions = parseFloat($('#calc2_yearlyContributions').val());
	var expensesAtFire = parseFloat($('#calc2_expensesAtFire').val());
	var yearlyReturn = parseFloat($('#calc2_yearlyReturn').val())/100;

			// $('#calc2_balanceAtFireAge').val( FV(yearlyReturn,) );

			var fireAge = currentAge;
			var balanceAt60 = 0;
			var balanceAtFireAge = 0;

			while(fireAge < longTermAge){
				fireAge += 0.25;

				balanceAtFireAge = FV(yearlyReturn,fireAge-currentAge, -1*yearlyContributions,-1*startingBalance);

				balanceAt60 = FV(yearlyReturn,longTermAge-fireAge,expensesAtFire,-1*balanceAtFireAge,1);

				if(balanceAt60 >= 0){
					break;
				}

			} 
			

			$('#calc2_fireAge').text($.number(fireAge,2));
			$('#calc2_balanceAtFireAge').text('$ '+$.number(balanceAtFireAge,2));
			$('#calc2_balanceAt60').text('$ '+$.number(balanceAt60,2));

			var fireverBalance = expensesAtFire/yearlyReturn;
			var fireverAge = NPER(yearlyReturn,-1*yearlyContributions, -1*startingBalance, fireverBalance, 0 )+currentAge;

			$('#calc2_fireverBalance').text('$ '+$.number(fireverBalance,2));
			$('#calc2_fireverAge').text($.number(fireverAge,2));

			var SWRBalance = expensesAtFire/0.04;
			var SWRAge = NPER(yearlyReturn, -1*yearlyContributions, -1*startingBalance, SWRBalance, 0)+currentAge;

			$('#calc2_SWRBalance').text('$ '+$.number(SWRBalance,2));
			$('#calc2_SWRAge').text($.number(SWRAge,2));

		}


		performCalculations1();
		performCalculations2();




	});