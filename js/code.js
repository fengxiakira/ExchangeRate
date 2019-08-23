(function ($) {
    $(document).ready(function() {
        let inputMoney = $("CURR_INPUT");
        let answerMoney1 = $("CURR_ANSWER1");
        let answerMoney2 = $("CURR_ANSWER2");
        let answerMoney3 = $("CURR_ANSWER3");
        let answerMoney4 = $("CURR_ANSWER4");
        let API_ENDPOINT = "https://api.exchangeratesapi.io/latest";
       
        // ???currOption多个选项,怎么锁定,?base=undefined
        function getQueryString(){
            return "?base="+$("#CURR_FR option:selected").val();
        }
        
        // 实时监听
        inputMoney.on('input propertychange',function(){
            fetchExchangeRate();
        })
        
        $("#CURR_FR").on('change',function(){
            fetchExchangeRate();
        })
        
        $("#CURR_TO1").on('change',function(){
            fetchExchangeRate();
        })
        
        fetchExchangeRate();
        
        // 获取数据
        // 先做第一个成功的，后转function
        function fetchExchangeRate(){
            let country = getQueryString();
            alert(API_ENDPOINT+country);
            
            $.getJSON(API_ENDPOINT+country,function(data){
                try{
                    let currToSelect = $("#CURR_TO1 option:selected").val();
                    var initCurrVal = function() {
                        answerMoney1.html(numeral(100.0 * data.rates.currToSelect).format("0,0.00[0]"));
                    }
                    if(inputMoney.value.length == 0){
                        initCurrVal();
                        return;
                    }
                    let currFrVal = parseFloat(inputMoney.value);
                    answerMoney1.html(numeral(currFrVal * data.rates.currToSelect).format("0,0.00[0]"));
    
                }
                catch(e){
                    initCurrVal();
                    alert("Please enter a number in the Amount field.");
                }
                
        
            });            
            
        }
        // on?
        // 获取具体汇率？
    
    });
})(jQuery);

    







