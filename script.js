
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


        //Genero

        var gen;
        const generos = document.querySelectorAll('input[name="gender"]');
        for (let i of generos) {
            if (i.checked){
                gen = i.value;
                break;
            }
        }
    
        //Otros datos

        var otDat = "<ul>";

        const otrosDatos = document.querySelectorAll('input[name="otrosDatos"]');
        for (let i of otrosDatos) {
            if (i.checked) 
            otDat += "<li>"+i.value+"</li>";         
        }
        otDat +="</ul>";

    var cvHTML = `<html>
    <head> 
        <title> CV de `+cv.name.value+`</title>
        <link rel="stylesheet" href="./style.css">
        <script src="./script.js"></script>
    </head>

    <body>

    <div class="maindiv">
        <div class="leftBar">
        <header>
            <ul>
                <li>
                    <a href="./index.html">Inicio</a>
                </li>
                <li>
                    <a href="#">Generar CV</a>
                </li>
            </ul>
        </header>
        </div>

        <div class="cvbody">
        <header>
            <h1>
                <b>Currículum Vitae de `+cv.name.value+`</b>
            </h1>   
        </header>
        
        <h2>
            Datos:
        </h2>

        <table>

        <tr style="background-color: LightGray;">
            <td>Nombre: </td>
            <td>`+cv.name.value+`</td>
        </tr>

        <tr>
            <td>Apellidos: </td>
            <td>`+cv.surname.value+`</td>
        </tr>

        <tr style="background-color: LightGray;">
            <td>DNI: </td>
            <td>`+cv.dni.value+`</td>
        </tr>

        <tr>
            <td>Género: </td>
            <td>`+gen+`</td>
        </tr>

        <tr style="background-color: LightGray;">
            <td>Otros datos: </td>
            <td>`+otDat+`</td>
        </tr>
        
        <tr>
            <td>Fecha de nacimiento: </td>
            <td>`+cv.bornDate.value+`</td>
        </tr>

        <tr style="background-color: LightGray;">
            <td>Resumen: </td>
            <td>`+cv.curriculum.value+`</td>
        </tr>
        </table>


        </div>
    </div>
    </body>
    </html>

    `

    
    var cvTab = window.open('about:blank', '_blank');
    cvTab.document.write(cvHTML);



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