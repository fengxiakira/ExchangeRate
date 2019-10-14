(function ($) {
    $(document).ready(function () {
        let inputMoney = $('#CURR_INPUT');
        let add = $('add');
        let answerMoney1 = $('#CURR_ANSWER1');
        let answerMoney2 = $('#CURR_ANSWER2');
        let answerMoney3 = $('#CURR_ANSWER3');
        let answerMoney4 = $('#CURR_ANSWER4');
        let API_ENDPOINT = "https://api.exchangeratesapi.io/latest";

        // ???currOption多个选项，造个函数？
        // EUO不加base
        function getQueryString() {
            if ($('#CURR_FR option:selected').val() == 'EUR') {
                return "";
            } else {
                return "?base=" + $('#CURR_FR option:selected').val();
            }
        }

        // 实时监听
        inputMoney.on('input propertychange', function () {
            fetchExchangeRate('CURR_TO1', answerMoney1);
            fetchExchangeRate('CURR_TO2', answerMoney2);
            fetchExchangeRate('CURR_TO3', answerMoney3);
            fetchExchangeRate('CURR_TO4', answerMoney4);
        })


        $("#CURR_FR").on('change', function () {
            fetchExchangeRate('CURR_TO1', answerMoney1);
            fetchExchangeRate('CURR_TO2', answerMoney2);
            fetchExchangeRate('CURR_TO3', answerMoney3);
            fetchExchangeRate('CURR_TO4', answerMoney4);
        })

        //   options
        // 
        totalChange('CURR_TO1', answerMoney1);
        totalChange('CURR_TO2', answerMoney2);
        totalChange('CURR_TO3', answerMoney3);
        totalChange('CURR_TO4', answerMoney4);

        function totalChange(toPlace, answerPlace) {
            fetchExchangeRate(toPlace, answerPlace);
            $("#" + toPlace).on('change', function () {
                fetchExchangeRate(toPlace, answerPlace);
            })
        }

        //  answerTO 问题
        // opption 选中值
        // data sorce closed on weekend, public holidays
        function fetchExchangeRate(currTo, answerTO) {
            // console.log(currTo);
            let country = getQueryString();
            // console.log(API_ENDPOINT + country);

            $.getJSON(API_ENDPOINT + country, function (data) {

                // let currToSelect = $("#"+currTo+" option:selected").text();
                let currToSelect = $("#" + currTo).find("option:selected").text();
                let currFrSelect = $("#CURR_FR").find("option:selected").text();
                let currFrom = parseFloat(inputMoney.val());
                // console.log(currToSelect);
                if (currToSelect == 'EUR' && currFrSelect == 'EUR') {
                    if(isNaN(currFrom)){
                        answerTO.html(100.00);
                    }else{
                        answerTO.html(currFrom);
                    }
                }
                else {
                    // JSON objec
                    // console.log(inputMoney);
                    // alert(currFrom);
                    if (isNaN(currFrom)) {
                        let value = 100.0 * (data.rates[currToSelect]);
                        answerTO.html(value.toFixed(2));
                    }
                    else {
                        answerTO.html((currFrom * data.rates[currToSelect]).toFixed(2));
                    }

                }

            });

        }
        // 获取具体汇率？
        console.clear();

    });
})(jQuery);









