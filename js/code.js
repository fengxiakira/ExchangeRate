(function ($) {
    $(document).ready(function() {
        let inputMoney = $('#CURR_INPUT');
        let answerMoney1 = $('#CURR_ANSWER1');
        let answerMoney2 = $('#CURR_ANSWER2');
        let answerMoney3 = $('#CURR_ANSWER3');
        let answerMoney4 = $('#CURR_ANSWER4');
        let API_ENDPOINT = "https://api.exchangeratesapi.io/latest";
       
        // ???currOption多个选项，造个函数？
        function getQueryString(){
            return "?base="+$('#CURR_FR option:selected').val();
        }
        
        // 实时监听
        inputMoney.on('input propertychange',function(){
            fetchExchangeRate('CURR_TO1',answerMoney1);
        })

        // need fix 
        $("#CURR_FR").on('change', function() {
            fetchExchangeRate();
          })
        
        //   options
        // 
        fetchExchangeRate('CURR_TO1',answerMoney1);
        $("#CURR_TO1").on('change',function(){
            console.log(4);
            fetchExchangeRate('CURR_TO1',answerMoney1);
        })
           
    
    
       
        //  answerTO 问题
        // opption 选中值
        function fetchExchangeRate(currTo,answerTO){
            console.log(currTo);
            let country = getQueryString();
            
            $.getJSON(API_ENDPOINT+country,function(data){
                   
                    // let currToSelect = $("#"+currTo+" option:selected").text();
                    let currToSelect = $("#"+currTo).find("option:selected").text();
                    console.log(currToSelect);
                    // JSON objec
                    let currFrom = parseFloat(inputMoney.val());
                    console.log(inputMoney);
                    // alert(currFrom);
                    if(isNaN(currFrom)){
                        let value = 100.0 * (data.rates[currToSelect]);
                        answerMoney1.html(value.toFixed(2));
                    }
                    else{

                        answerMoney1.html((currFrom * data.rates[currToSelect]).toFixed(2));       
                    }
        
            }); 
            
        }
        // on?
        // 获取具体汇率？
        console.clear();
    
    });
})(jQuery);

    







