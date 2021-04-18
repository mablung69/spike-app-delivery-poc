document.addEventListener("DOMContentLoaded", function(event) {
    let columnsNames = ["origin_query", "destination_query", "distance", 
    "origin_latitude", "origin_longitude", "destination_latitude", "destination_longitude",
    "error"];
    let columnsObject = {
        "origin_query": "Texto Origen",
        "destination_query": "Texto Destino",
        "distance": "Distancia",
        "origin_latitude": "Latitud Origen",
        "origin_longitude": "Longitud Origen",
        "destination_latitude": "Latitud Destino",
        "destination_longitude": "Longitud Destino",
        "error": "Consulta con Error"
    };

    var getData = function(url, cb_ok, cb_error) { 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
    
            if (this.status == 200) {
                var data = JSON.parse(this.responseText);                
                cb_ok(data);
            } else {
                cb_error(data);                
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();        
    };

    var responseOk = function(data) { 
        console.log(data);
        var historyDIV = document.getElementById("history");

        var row = document.createElement('div');
        for (var j = 0; j < columnsNames.length; j++)
        {
            var elem = document.createElement('div');
            elem.textContent=columnsObject[columnsNames[j]];
            row.appendChild(elem);
        }
        historyDIV.appendChild(row);

        for (var i = 0; i < data.data.length; i++)
        {
            var row = document.createElement('div');
            var rowData = data.data[i];
            for (var j = 0; j < columnsNames.length; j++)
            {
                var elem = document.createElement('div');
                elem.textContent=rowData[columnsNames[j]];
                row.appendChild(elem);
            }
            historyDIV.appendChild(row);
        }
        var row = document.createElement('div');
        var elem = document.createElement('div');
        
    };

    var responseError = function(data) { 
        alert("No se pudo consultar la información :C")
    };

    getData("/api/v1/historicalData", responseOk, responseError);
});