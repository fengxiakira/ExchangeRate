$(document).ready(function() {

  $("#CURR_FR_VAL").bind('input propertychange', function() {
    getCurrencyUsingJQuery();
  })

  $("#CURR_FR").bind('change', function() {
    getCurrencyUsingJQuery();
  })

  $("#CURR_TO").bind('change', function() {
    getCurrencyUsingJQuery();
  })

  getCurrencyUsingJQuery();

  function getCurrencyUsingJQuery() {
    var currVal = $("#CURR_VAL");
    var nullCurrVal = function() {
      currVal.html('???');
    }
    // 如果长度为0，出现？？？
    if (document.getElementById("CURR_FR_VAL").value.length == 0) {
      nullCurrVal();
      return;
    }
    
    currVal.html('<embed type="image/svg+xml" src="/images/loading.svg" id="LOADING" style="margin-top: -4px"/>');

    var currFrSelect = $("#CURR_FR");
    var fr = currFrSelect.val();

    var currToSelect = $("#CURR_TO");
    var to = currToSelect.val();

    //alert(fr + " : " + to);

    var currId = fr + "_" + to;

    $.getJSON("https://free.currconv.com/api/v7/convert?q=" + currId + "&compact=y&apiKey=sample-key-do-not-use&callback=?",
      function(data){
        try {
         var currFrVal = parseFloat(document.getElementById("CURR_FR_VAL").value);
         currVal.html(numeral(currFrVal * data[currId].val).format("0,0.00[0]"));

       } catch (e) {
        nullCurrVal();
        alert("Please enter a number in the Amount field.");
      }

    });

  }

});