// 怎么减小call 服务器的次数？

(function ($) {
    $(document).ready(function () {

        if(localStorage.getItem('from')==null){
            localStorage.setItem('from',$('#CURR_FR option:selected').val());
        }else{
            // 选项用上一次的
            let lastFrom = localStorage.getItem("from");
            let lastTo =localStorage.getItem("to");
            let listFrom = document.getElementById("CURR_FR");
            let listTo = document.getElementById("CURR_TO1");
            //for loop
            listFrom.value = lastFrom;
            listTo.value = lastTo;
        }
    
    
        let inputMoney = $('#CURR_INPUT');

        let answerMoney1 = $('#CURR_ANSWER1');
        let API_ENDPOINT = "https://api.exchangeratesapi.io/latest";
     

        function getQueryString() {
            if ($('#CURR_FR option:selected').val() == 'EUR') {
                return "";
            } else {
                return "?base=" + $('#CURR_FR option:selected').val();
            }
        }
        // 实时监听,localStorage
        $("#CURR_FR").on('change', function () {
            fetchExchangeRate('CURR_TO1', answerMoney1);
            
            localStorage.setItem("from",$("#CURR_FR option:selected").val());


        })

        $("#CURR_TO1").on('change',function(){
            localStorage.setItem('to',$('#CURR_TO1 option:selected').val());
        })

        //dynamic dome
        let i = 1;
      
        $('#add').on('click', function () {
            let template = $('.list .fix:first-child').clone(true);
            let a = ++i;
            template.attr("id", `answer${a}`);
            template.find("span.postfix").attr("id", `CURR_ANSWER${a}`);
            template.find("select").attr("id", `CURR_TO${a}`);
           
            $('.list').append(template);
            console.log($('#list').children().length);
           
            let temp = `CURR_ANSWER${a}`;
            let answerMoney3 = $(`#${temp}`);
            $("#CURR_FR").on('change', function () {
                fetchExchangeRate(`CURR_TO${a}`, answerMoney3);
            })
            $('#CURR_INPUT').on('input propertychange', function () {
                fetchExchangeRate(`CURR_TO${a}`, answerMoney3);
            })
            totalChange(`CURR_TO${a}`, answerMoney3);
            
        });

        
        $(document).on('click', '.del' , function(e){
            e.preventDefault();
            // console.log($('#list').children().length);
            if($('#list').children().find("tbody").children().length<=1){
                alert("You cannot delete option anymore!");
            }
            else{
                $(this).closest('tr').fadeOut(500, function(){
                    $(this).remove();
                });
            }
           
        });

        inputMoney.on('input propertychange', function () {
            // e.preventDefault();
            console.log($('#CURR_INPUT').val());
            // console.log(inputVal);
            if($('#CURR_INPUT').val()<0){
                // console.log(inputVal);
                alert("Input Value is less then 0");
                inputMoney.val('');
            }else{
                fetchExchangeRate('CURR_TO1', answerMoney1);
            }
            
        })

        //   options
        // 
        totalChange('CURR_TO1', answerMoney1);

        function totalChange(toPlace, answerPlace) {
            fetchExchangeRate(toPlace, answerPlace);
            $("#" + toPlace).on('change', function () {
                fetchExchangeRate(toPlace, answerPlace);
                localStorage.setItem('to',$('#CURR_TO1 option:selected').val());
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
                    if (isNaN(currFrom)) {
                        answerTO.html(100.00);
                    } else {
                        answerTO.html(currFrom);
                    }
                }
                else {
                    if (isNaN(currFrom)) {
                        let value = 100.0 * (data.rates[currToSelect]);
                        answerTO.html(value.toFixed(2));
                    }
                    else {
                        answerTO.html((currFrom * data.rates[currToSelect]).toFixed(2));
                    }
                }
            })
            .done(function() { console.log('getJSON request succeeded!'); })
            .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
            .always(function() { console.log('getJSON request ended!'); });
        }
        // 获取具体汇率？
        // console.clear();

    });
})(jQuery);









