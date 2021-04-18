document.addEventListener("DOMContentLoaded", function(event) {

    var postData = function(url, data) { 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
    
            if (this.status == 200) {
                var data = JSON.parse(this.responseText);
                let saved_msg = "(Guardado Correctamente)";
                if (data.status=="DON'T SAVED"){
                    let saved_msg = "(No fue Guardado Correctamente)";
                }
                if (data.search_ok["origin"] && data.search_ok["destination"]){
                    alert("La distancia es de: " + data["distance"] + " km" + " " + saved_msg);
                } else {
                    let msg = "";
                    if (!data.search_ok["origin"] && !data.search_ok["destination"]){
                        msg = "Origen y Destino no encontrados";
                    } else if (!data.search_ok["origin"]){
                        msg = "Origen no encontrado";
                    }else if (!data.search_ok["destination"]){ 
                        msg += "Destino no encontrado";
                    }
                    alert("Tu consulta fallo: " + msg + " " + saved_msg);
                }
            } else {
                alert("Tu consulta no pudo ser procesada! :C")
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));        
    };

    var distanceClickHandler = function() { 
        var data = {};
        data["origin"] = document.getElementById("origin").value
        data["destination"] = document.getElementById("destination").value
        postData("/api/v1/originDestinyDistance", data);
    };
    
    var distanceButton = document.getElementById("distance");
    distanceButton.addEventListener('click', distanceClickHandler, false);
});