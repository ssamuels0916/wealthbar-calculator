$(function() {



    $('.submit').on('click', function(event) {
        event.preventDefault();

        //display amount deposited in pre-tax income 
        $('#tfsa-pre-tax-income, #rrsp-pre-tax-income').text($('#deposit').val()).prepend("$ ");

        var deposit = $('#deposit').val();
        var marginalTax = $("#tax-rate option:selected").val();
        var afterTaxSavings = (deposit - (deposit * marginalTax)).toFixed(2);
        $('#tfsa-after-tax-savings').text(afterTaxSavings).prepend("$ ");
        $('#rrsp-after-tax-savings').text(deposit).prepend("$ ");

        var years = $('#investment-period').val();
        var roi = $('#roi').val();

        var inflation = 0.02;
        var retirementTaxRate = $('#retirement-tax-rate').val();

        var roiPercentage = roi / 100;
        var retirementTaxPercentage = retirementTaxRate / 100;

        //Real rate of return calculation
        var realRate = ((1 + roiPercentage) / (1 + inflation)) - 1;
        var futureValueRate = 1 + realRate;

        //calculation to the power of number of years
        var tfsaFutureValue = (afterTaxSavings * (Math.pow(futureValueRate, years))).toFixed(2);
        var rrspFutureValue = (deposit * (Math.pow(futureValueRate, years))).toFixed(2);
        $('#tfsa-fv-savings').text(tfsaFutureValue).prepend("$ ");
        $('#rrsp-fv-savings').text(rrspFutureValue).prepend("$ ");

        //show withdrawal tax rate, if applicable
        $('#tfsa-withdrawal-tax-rate').text("0");
        $('#rrsp-withdrawal-tax-rate').text(retirementTaxRate).append("%");

        //calculate after tax savings
        var afterTaxFutureValue = ((rrspFutureValue - (rrspFutureValue * retirementTaxPercentage)).toFixed(2));
        $('#rrsp-after-tax-fv-savings').text(afterTaxFutureValue).prepend("$ ");
        $('#tfsa-after-tax-fv-savings').text(tfsaFutureValue).prepend("$ ");
    });
});