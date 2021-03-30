
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
    getFromLocalStorage();
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

    if(confirm("¿Quieres utilizar el almacenamiento interno para guardar los datos?")){
        saveToLocalStorage();
    }

    processCV(cv) 
}

function processCV(cv){




}

function getFromLocalStorage(){

    document.getElementById("name").value=localStorage.getItem('name');
    document.getElementById("surname").value=localStorage.getItem('surname');
    var dni =localStorage.getItem('dni');
    document.getElementById("dni").value=dni;
    validateDNI(dni)

    //Genero
    const generos = document.querySelectorAll('input[name="gender"]');
    for (let i of generos) {
        if (localStorage.getItem(i.value) =='yes') {
            i.checked=true;
            break;
        }  
    }

    //Otros datos
    const otrosDatos = document.querySelectorAll('input[name="otrosDatos"]');
    for (let i of otrosDatos) {
        if (localStorage.getItem(i.value) =='yes') 
            i.checked=true;
    }


    document.getElementById("bornDate").value=localStorage.getItem('bornDate');
    document.getElementById("email").value=localStorage.getItem('email');
    document.getElementById("curriculum").value=localStorage.getItem('curriculum');

}

function saveToLocalStorage(){

    localStorage.setItem('name', document.getElementById("name").value);
    localStorage.setItem('surname',document.getElementById("surname").value);
    localStorage.setItem('dni',document.getElementById("dni").value);

    //Genero
    const generos = document.querySelectorAll('input[name="gender"]');
    for (let i of generos) {
        if (i.checked) 
            localStorage.setItem(i.value,'yes');
        else
            localStorage.setItem(i.value,'no');
        
    }

    //Otros datos
    const otrosDatos = document.querySelectorAll('input[name="otrosDatos"]');
    for (let i of otrosDatos) {
        if (i.checked) 
            localStorage.setItem(i.value,'yes');
        else
            localStorage.setItem(i.value,'no');
        
    }

    localStorage.setItem('bornDate',document.getElementById("bornDate").value);
    localStorage.setItem('email',document.getElementById("email").value);
    localStorage.setItem('curriculum',document.getElementById("curriculum").value);



}