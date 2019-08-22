var inputMoney = $("CURR_INPUT");
var answerMoney1 = $("CURR_ANSWER1");
var answerMoney2 = $("CURR_ANSWER2");
var answerMoney3 = $("CURR_ANSWER3");
var answerMoney4 = $("CURR_ANSWER4");
var API_ENDPOINT = "https://api.exchangeratesapi.io/latest";

function getQueryString(city){
    return "?base="+$("#currOption option:selected").val();
}

function fetchExchangeRate(){
    var options = $("#currOption option:selected").text();
    let xhr = new XMLHttpRequest();
    var country = getQueryString(options);
    console.log(country);
    xhr.open('GET',API_ENDPOINT+country,true);
    xhr.send();
    
}
// bind?
// 获取具体汇率？
function getMoney(){
    if(isNaN(inputMoney)){
        answerMoney1.value = "";
        answerMoney2.value = "";
        answerMoney3.value = "";
        answerMoney4.value = "";
    }
    else{

    }
}





