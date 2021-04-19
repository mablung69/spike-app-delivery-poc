document.addEventListener("DOMContentLoaded", function(event) {

    var postData = function(url, data) { 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
    
            if (this.status == 200) {
                document.getElementById("distance").innerText = "Calcular";
                document.getElementById("distance").removeAttribute("disabled");
                var data = JSON.parse(this.responseText);
                let saved_msg = "(Guardado Correctamente)";
                if (data.status=="DON'T SAVED"){
                    let saved_msg = "(No fue Guardado Correctamente)";
                }
                if (data.search_ok["origin"] && data.search_ok["destination"]){
                    document.getElementById("alertModalTitle").innerText="Resultado del Calculo";
                    document.getElementById("alertModalContent").innerText="La distancia es de: " 
                        + data["distance"] + " km" + " " + saved_msg;
                    $('#alertModal').modal('show');
                } else {
                    let msg = "";
                    if (!data.search_ok["origin"] && !data.search_ok["destination"]){
                        msg = "Origen y Destino no encontrados";
                    } else if (!data.search_ok["origin"]){
                        msg = "Origen no encontrado";
                    }else if (!data.search_ok["destination"]){ 
                        msg += "Destino no encontrado";
                    }
                    document.getElementById("alertModalTitle").innerText="Resultado del Calculo";
                    document.getElementById("alertModalContent").innerText="Tu consulta fallo: " 
                        + msg + " " + saved_msg;
                    $('#alertModal').modal('show');
                }
            } else {
                document.getElementById("distance").innerText = "Calcular";
                document.getElementById("distance").removeAttribute("disabled");
                document.getElementById("alertModalTitle").innerText="Tu consulta no pudo ser procesada! :C";
                document.getElementById("alertModalContent").innerText="Por favor, vuelve a intentarlo";
                $('#alertModal').modal('show');
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));        
    };

    var distanceClickHandler = function() {        
        document.getElementById("distance").setAttribute("disabled","disabled");        
        document.getElementById("distance").innerText = "Loading...";
        var distanceSpinner = document.createElement('span');
        distanceSpinner.id= "distanceSpinner";
        document.getElementById("distance").appendChild(distanceSpinner);
        document.getElementById("distanceSpinner").classList.add("spinner-border");
        document.getElementById("distanceSpinner").classList.add("spinner-border-sm");
        console.log(document.getElementById("distanceSpinner"));
        var data = {};
        data["origin"] = document.getElementById("origin").value
        data["destination"] = document.getElementById("destination").value
        postData("/api/v1/originDestinyDistance", data);
    };

    var distanceButton = document.getElementById("distance");
    distanceButton.addEventListener('click', distanceClickHandler, false);
});
