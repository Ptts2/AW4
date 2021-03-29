
var dniValidated = false;



function validateDNI(dni){


    

    if(dni.length != 9) badDNI();

    diccionario =["A","B","C","D","E","F","G","H","I","J","K","L","N","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    if(!diccionario.includes(dni[8])) badDNI();

    else goodDNI();

    console.log(dni);
    dniValidated = true;
    


        
    function badDNI(){
        dniValidated = false;
        var d = document.getElementById("DNIcheckLabel")
        d.innerHTML = "X";
        d.style="color:red;";
        return;
    }
    function goodDNI(){
        var d = document.getElementById("DNIcheckLabel")
        d.innerHTML = "✓";
        d.style="color:green;";
        return;
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