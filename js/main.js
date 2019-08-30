$(document).ready(function(){


	//wow.js on scroll animations initialization
	wow = new WOW(
	{
		animateClass: 'animated',
		mobile: false,
		offset: 50
	}
	);
	wow.init();


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

$('input[name="options"]').on('change', function(){
	switch($(this).val()){
		case 'fireage':
		$('#hero .caption h1').text('Fire Age Calculator');
		$('#fireage-section').show();
		$('#deferred-section').hide();
		break;
		case 'deferred':
		$('#hero .caption h1').text('Deferred Calculator');
		$('#deferred-section').show();
		$('#fireage-section').hide();
		break;
	}
});

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
		      	alert("Invalid Pmt argument");
		      	return null;
		      }
		      else if (Rate == 0)
		      	return (- (PV + FV) / Pmt);
		      else if (Rate <= -1) {
		      	alert("Invalid Pmt argument");
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
		      	alert("NPer cannot be calculated");
		      	return null;
		      }

		      totalInterestRate = sumOfPvAndPayment / currentValueOfPvAndPayment;
		      return Math.log(totalInterestRate) / Math.log(Rate + 1);
		  }

		  $('.number').number(true, 2);

		  function performCalculations(){

		  	var longTermAge = parseFloat($('#longTermAge').val());
		  	longTermAge = isNaN(longTermAge)? '': longTermAge;
		  	$('.longTermAge').text(longTermAge);

		  	var currentAge = parseFloat($('#currentAge').val());
		  	var startingBalance = parseFloat($('#startingBalance').val());
		  	var yearlyContributions = parseFloat($('#yearlyContributions').val());
		  	var expensesAtFire = parseFloat($('#expensesAtFire').val());
		  	var yearlyReturn = parseFloat($('#yearlyReturn').val())/100;

			// $('#balanceAtFireAge').val( FV(yearlyReturn,) );

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
			

			$('#fireAge').text($.number(fireAge,2));
			$('#balanceAtFireAge').text('$ '+$.number(balanceAtFireAge,2));
			$('#balanceAt60').text('$ '+$.number(balanceAt60,2));

			var fireverBalance = expensesAtFire/yearlyReturn;
			var fireverAge = NPER(yearlyReturn,-1*yearlyContributions, -1*startingBalance, fireverBalance, 0 )+currentAge;

			$('#fireverBalance').text('$ '+$.number(fireverBalance,2));
			$('#fireverAge').text($.number(fireverAge,2));

			var SWRBalance = expensesAtFire/0.04;
			var SWRAge = NPER(yearlyReturn, -1*yearlyContributions, -1*startingBalance, SWRBalance, 0)+currentAge;

			$('#SWRBalance').text('$ '+$.number(SWRBalance,2));
			$('#SWRAge').text($.number(SWRAge,2));

		}


		performCalculations();




	});