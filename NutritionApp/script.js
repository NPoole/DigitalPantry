const appID = "470a59f2";
const appKEY = "1a71528b1398f4b61b8035ff1be7c341";
var SerialPort = require('serialport');
 
var port = new SerialPort('COM5', {
  parser: SerialPort.parsers.readline('\r'),
  baudRate: 9600
});

    $(function() {
        $(".dial").knob();
    });

$( document ).ready(function(){
 $('.dial')
        .val(0)
        .trigger('change');	
});

port.on('data', function (data) {
	upcGet(data, postResults);
});

function upcGet(upc, callback)
{
		var getURL = "https://api.nutritionix.com/v1_1/item?upc=" + upc + "&appId=" + appID + "&appKey=" + appKEY; 

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", getURL, true); // true for asynchronous 
    xmlHttp.send(null);
}

function postResults(response)
{
	var calories;
  var fat;
  var sodium;
  var sugars;
  
  var foodItem = JSON.parse(response);

	$("[name='calories']").val(foodItem.nf_calories);
  $("[name='calories']").trigger('change');
	$("[name='fat']").val(foodItem.nf_total_fat);
	$("[name='fat']").trigger('change');
  $("[name='sodium']").val(foodItem.nf_sodium);
  $("[name='sodium']").trigger('change');
  $("[name='sugars']").val(foodItem.nf_sugars);
  $("[name='sugars']").trigger('change');
  
  $("[name='productName']").html(foodItem.item_name);
  
}

$(document).on("keydown", "[name='upc']", function(e){
console.log(e);
if (e.keyCode === 13) {
        upcGet($("[name='upc']").val(), postResults);
    }
});

