
var dniValidated = false;



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