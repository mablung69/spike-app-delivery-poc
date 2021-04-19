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
        "error": "Estado Consulta"
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
        var historyTable = document.getElementById("history");

        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        for (var j = 0; j < columnsNames.length; j++)
        {
            var th = document.createElement('th');
            th.textContent=columnsObject[columnsNames[j]];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        historyTable.appendChild(thead);

        var tbody = document.createElement('tbody');
        for (var i = 0; i < data.data.length; i++)
        {
            var tr = document.createElement('tr');
            var rowData = data.data[i];
            for (var j = 0; j < columnsNames.length; j++)
            {
                var td = document.createElement('td');
                if (columnsNames[j]==="error"){
                    td.textContent= (rowData[columnsNames[j]]) ? "Erroneo" : "Correcto";
                } else {
                    td.textContent=rowData[columnsNames[j]];
                }                
                tr.appendChild(td);
            }            
            tbody.appendChild(tr);
        }
        historyTable.appendChild(tbody);
    };

    var responseError = function(data) { 
        alert("No se pudo consultar la información :C")
    };

    getData("/api/v1/historicalData", responseOk, responseError);
});