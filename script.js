
var dniValidated = false;

var clock

class Hora {

    constructor(reloj){
        this.reloj = reloj;
    }

    getHour(){

        var hora = new Date();

        var h = hora.getHours();
        var m = hora.getMinutes();
        var s = hora.getSeconds();

        if(h < 10)
            h = "0"+h;
        if(m < 10)
            m = "0"+m;
        if(s < 10)
            s = "0"+s;

        return {

            hora: h,
            minuto: m,
            segundo: s,
        };
    }

    updateHour(){
        var hora = this.getHour();
        this.reloj.innerHTML = "<b>"+hora.hora+":"+hora.minuto+":"+hora.segundo+"</b>";
    }

    loop(){
        setInterval(()=>{this.updateHour()}, 500);
    }
}



//Al cargar la pagina
window.onload = ()=>{
    clock = document.getElementById("clock");
    new Hora(clock).loop();
}

function validateDNI(dni){

    var d = document.getElementById("DNIcheckLabel");

    if(dni.length != 9) { badDNI(); return;}

    const letrasDNI =["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    if(!letrasDNI.includes(dni[8].toUpperCase())) { badDNI(); return; }

    var DNIn = dni.substring(0,8);
    var digito = letrasDNI[DNIn%23];

    if(digito == dni[8].toUpperCase()) {goodDNI(); return;}
    else {badDNI(); return;}

        
    function badDNI(){
        dniValidated = false;
        d.innerHTML = "X";
        d.style="color:red;";
    }
    function goodDNI(){
        dniValidated = true;
        d.innerHTML = "✓";
        d.style="color:green;";
    }
}

function validateCV(cv){

    if(!dniValidated){
        window.alert("ERROR: DNI Invalido!!");
        return;
    }
    processCV(cv) 
}

function processCV(cv){




}