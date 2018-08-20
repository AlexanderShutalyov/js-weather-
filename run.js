var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function()  {
        if (this.readyState === 4 && this.status === 200) {
			var ex = JSON.parse(this.responseText) 
			
			var extData = {};
			Object.keys(ex).sort().forEach(function(key) {extData[key] = ex[key]})                 
        }

var country = document.getElementById("mySelect")  //Формировка Селекта со странами
var citySelector = document.getElementById("citySelect")
var div = document.getElementById("ext")

	for (key in extData) {
		var ll = new Option(`${key}`, `${key}`);
		if (key != "") country.appendChild(ll)
	}

	country.onchange = function() {
		var countrySelected = country.options[country.selectedIndex].value
	    citySelector.options.length = 0;
		extData[countrySelected].sort()

			for (var key = 0 ; key <  extData[countrySelected].length; key++) {
				var k = extData[countrySelected][key]
				cityElement = new Option(`${k}`, `${k}`);
				citySelector.appendChild(cityElement)
			}
	}

 	citySelector.onchange = function() {
 	    var city = citySelector.options[citySelector.selectedIndex].value;
 	    var yql =`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u='c'`
 	    req = new XMLHttpRequest()
 	    req.open('GET', "https://query.yahooapis.com/v1/public/yql?" + 'q=' + encodeURIComponent(yql) + '&format=json', true)
 	    req.send()
 	    

 	    req.onreadystatechange = function()  {
        if (this.readyState === 4 && this.status === 200) {
			var nr = JSON.parse(this.response)                  

			document.getElementById("ext").innerHTML = ""
	 		for (var key in nr.query.results.channel.item.forecast[0]) {	
			var req = nr.query.results.channel.item.forecast[0][key]


			var p = document.createElement("p");
			p.innerText = key + " = " + req
			div.appendChild(p)

	 		}

        }
 		}

 	}
    }
xhr.open("GET", "https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json") 
xhr.send()
	

// "http://www.tigir.com/javascript_select.htm"


