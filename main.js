//Creo un array vacio para ir pusheando los productos//

const catalogo = []; 

class Producto{
    constructor(nombre,precio,imagen,id){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.id = id;
    }

}

catalogo.push(new Producto("Micro AMD Ryzen 5 5600X 4.6 Ghz AM4", 39.399,"microRz2.png","RyzenMicro"));
catalogo.push(new Producto("Micro Intel I5-11600K 4.9Ghz 12Mb S.1200" ,39.416,"interl i5-11600kvalido.png","IntelMicro"));
catalogo.push(new Producto("Motherboard Gigabyte B450 Aorus Elite V2am4 Ryzen Ddr4 Pcreg" , 17.999,"motheraorusvalido.png","MotherAorus"));
catalogo.push(new Producto("Motherboard Gigabyte B450m Ds3h Socket Am4" ,16.999,"mothergigabytevalido.png","MotherGigabyte"));
catalogo.push(new Producto("Memoria Ram Kingston Fury Beast Black 4GB 3200 Mhz DDR4" ,3.598,"ramkingstonvalido.png","KingstonRam"));
catalogo.push(new Producto("Memoria Ram OLOY OWL Black 8GB 3000 Mhz DDR4" ,5.555, "ramoloyvalido.png", "OloyRam"));
catalogo.push(new Producto("Placa de video Nvidia MSI Ventus GeForce RTX 20 Series RTX 2060 VENTUS 6GB", 139.999, "geforcertx2060.png" , "PlacaNvidia"));
catalogo.push(new Producto("Placa De Video ASRock AMD Radeon RX 6600 XT Challenger D 8GB GDDR6", 119.999, "radeonrx6600valido.png" ,"PlacaAsrock"));
catalogo.push(new Producto("Gabinete Cooler Master Masterbox K501L RGB Vidrio Templado", 6.492, "gabinetecoolervalido.png" , "GabineteCooler"));
catalogo.push(new Producto("Gabinete Redragon Sideswipe GC-601", 7.850, "gabinetereddragonvalido.png" , "GabineteRedragon"));
catalogo.push(new Producto("Auricular Razer Kraken v3 X Black Usb", 8.135, "auricularrazerkrakenv3xjpg.png" , "auricularRazer"));
catalogo.push(new Producto("Auricular c/mic Redragon H901 Scylla" ,2.819, "auricularredragon.png", "auricularRedragon"));
catalogo.push(new Producto("Teclado Redragon K552 Kumara Mecanico" ,6.569, "tecladoredragon.png", "tecladoRedragon"));
catalogo.push(new Producto("Teclado Optico Fantech" ,5.056,"tecladofan.png","tecladoFan"));
catalogo.push(new Producto("Mouse Redragon M610", 1.455, "mouseredragon.png","mouseRedragon"));
catalogo.push(new Producto("Mouse Logitech G Pro", 3.411, "muselogitech.png","mouseLogitech"));


const guardarLocal=(clave,valor)=>{localStorage.setItem(clave,valor)};

guardarLocal("prueba",JSON.stringify(catalogo));

console.log(catalogo);

//Cargo los productos al html desde el DOM//

function cargandoProductos(catalogo){
    let contenido = "";
    let y = 1;

    for(let componente of catalogo){
    contenido+= "<div class='col-6 text-center'" + componente.id + ">";
    contenido+= "<img id='modeloImagen"+ y + "'src='imagenes/" + componente.imagen + "' class='modificacion img-fluid' alt='" + componente.nombre + "'>";
    contenido+= "<h6 id='numeroDeComponente"+ y + "'class='m-2 text-white'>"+ componente.nombre +"</h6>";
    contenido+= "<p><span id='precio" + y + "'class='text-white'>"+"$"+ parseFloat(componente.precio) +"</span></p>";
    contenido+= "<button type='button' class='botonCompra m-2 colorbtn' data-id='" + y + "'>Añadir al carrito</button>";
    contenido+= "</div>"
    y++}

    document.getElementById("primerosElementos").innerHTML=contenido;

}

cargandoProductos(catalogo);


//Envio los datso del login de Usuario//

function enviarDatos (){
    let nombreUsuario = document.getElementById("emailDeUsuario").value;
    let contrasenaUsuario = document.getElementById("contraDeUsuario").value;

    if((nombreUsuario == "") || (nombreUsuario < 3)){
        document.getElementById("productoAgregado").innerHTML = "<div class='producto'><p class='text-white bg-black p-3'> Falta completar el campo de usuario</p></div>";
        return false;
    }
    if ((contrasenaUsuario == "") || (contrasenaUsuario.length < 4)) {
        document.getElementById("productoAgregado").innerHTML = "<div class='producto'><p class='text-white bg-black p-3'> Falta completar el campo de la contraseña</p></div>";
        return false;
    }

    setTimeout(function(){
        document.querySelector(".producto").remove();
    }, 2000);   

    localStorage.setItem("datosLogin" , JSON.stringify([nombreUsuario, contrasenaUsuario]));

    $("#productoAgregado").append("<div class='producto col-6 offset-3'><p class='text-white bg-black p-3'>Hola "+ nombreUsuario + "!" + "</p></div>");

    //El usuario puede ver en "mi cuenta" sus datos//
    function ingresarUs(){
        $("#cuenta").click(()=>{
            $("#productoAgregado").prepend("<div class='col-6 offset-3' ><p class='text-white bg-black p-3'><strong>Tu usuario es:</strong>" + " " + nombreUsuario +" "+ " " + "<strong>contraseña:</strong>"+ " " + contrasenaUsuario+"</p></div>").fadeOut(4000);
        })
    }
    ingresarUs();
}

let datosDelMismo = localStorage.getItem ("datosLogin");
console.log(datosDelMismo);


//Creo otra clase donde van a ir las distitntas funciones de interaccion//

class Interaccion{
    agregarProducto(){
        
    }
    eliminarProducto(element){
        if(element.name === 'borrar'){
            element.parentElement.remove();
        }
        //Agregando alerta//
        setTimeout(function(){
            document.querySelector(".producto").remove();
        }, 2000);   
    
        $("#productoEliminado").append("<div class='col-3 offset-4 producto bg-danger'><p class='textoAlerta'>Producto eliminado</p></div>");
    }
}


//Envio alerta cuando agrego y elimino un producto//

document.getElementById("vacio").addEventListener("click",function(e){ 
    const ui = new Interaccion();
    ui.eliminarProducto(e.target);
});


//Carrito//

const carrito= document.querySelector("#carrito");
const listaDeProdcutos= document.querySelector("#listaProductos");
const iconoCarrito = document.querySelector("#iconoCarrito");
let articulosDelCarrito = [];

listaDeProdcutos.addEventListener("click",agregarProducto);

//Agrego los productos al carrito//
function agregarProducto(e) {
    
    e.preventDefault();
    if (e.target.classList.contains("botonCompra")) {
        const productoSeleccionado = e.target.parentElement;
        leerDatosProductos(productoSeleccionado);
    }
}
//Agrego evento cuando agrego un producto//
$(".botonCompra").click(()=>{
    //Agregando alerta//
    setTimeout(function(){
        document.querySelector(".producto").remove();
    }, 2000);   

    $("#productoAgregado").append("<div class='col-3 offset-4 producto bg-success'><p class=''>Se agrego al carrito!</p></div>").fadeIn();
})

function leerDatosProductos(producto){
    const infoProducto ={
        serie: producto.querySelector("button").getAttribute("data-id"),nombre: producto.querySelector("h6").textContent,precio: producto.querySelector("span").textContent
    }
    console.log(infoProducto);
    //Ver si hay productos en el carrito//

    const existe = articulosDelCarrito.some(producto=> producto.id == infoProducto.serie);
    if(existe){
        //Se actualiza la cantidad//
        const productos = articulosDelCarrito.map(producto=>{
            if(producto.id == infoProducto.serie){
                producto.cantidad++;
                return producto; //retorna actualizado
            } else{
                return producto; //retorna los prod no duplicados
            }
        });
        articulosDelCarrito= [productos];
        console.log(articulosDelCarrito);
    } else{
        articulosDelCarrito = [articulosDelCarrito,infoProducto];
        $("#vacio").append("<div class='fondo'><h4 class='textoLista'> Se agrego " + infoProducto.nombre  + " " + "valor" + " " + infoProducto.precio + "</h4><a href='#' class='botonEliminar' name='borrar'>Eliminar</a></div>");
        $("#resultado_compra").append("<div class=''><p class='text-dark'>" + infoProducto.nombre  + " " + "valor" + " " + infoProducto.precio + "</p></div>");
        console.log("Se agrego:" + infoProducto.nombre + "y ademas:" + infoProducto.precio);
    }
    
    const historialCompra = (clave,valor) =>{localStorage.setItem(clave,valor)};
    historialCompra("agregado",JSON.stringify(articulosDelCarrito));
    
    console.log(JSON.parse(localStorage.getItem("agregado")))
    
}


//Aplicando JQUERY

window.addEventListener('load',function(){
    console.log("se cargo toda la pagina");
})

$(function(){
    console.log("el dom ya se puede usar");
})

//Se modifico el boton de ingresar//

$("#iniciarSesion").click(function(){
    enviarDatos();
    console.log("se envio correctamente");
});


//Modificando css desde js//

$(".modificacion").css({"whidt": "400px", "height": "350px","margin-top": "115px"});

$(".items").css({"margin": "5px",
                "text-decoration": "none",
                "color": "white"})

$("#consultarEnvio").css("margin-top", "115px");

//Consultar envio//


//Cargando Provincias y Ciudades//

const provincias = ["Seleccionar","Buenos Aires", "Cordoba", "Neuquén"]

function cargarProvincia(provincias){
    let opcProv = $("#provincias");

    for(let prov of provincias){
        opcProv.append("<option value='" + prov + "'>" + prov + "</option>");
    }

}

cargarProvincia(provincias);

const ciudadesBs = ["Seleccionar","CABA", "Quilmes", "Tandil", "Bahia Blanca", "Gral Roca"]

function cargarCiudad(ciudadesBs){
    let opcCiu = $("#ciudadesBs");

    for(let ciudad of ciudadesBs){
        opcCiu.append("<option value='" + ciudad + "'>" + ciudad + "</option>");
    }

}
cargarCiudad(ciudadesBs);

const ciudadesCba = ["Seleccionar","Cordoba", "Villa Gral Belgrano", "Rio Cuarto", "Bell Ville", "Rio Segundo"]
function cargarCiudadCba(ciudadesCba){
    let opcCiu = $("#ciudadesCba");

    for(let ciudad of ciudadesCba){
        opcCiu.append("<option value='" + ciudad + "'>" + ciudad + "</option>");
    }

}
cargarCiudadCba(ciudadesCba);

const ciudadesNeuquen = ["Seleccionar","Villa La Angostura", "Villa Traful", "Neuquen"]
function cargarCiudadNeuquen(ciudadesNeuquen){
    let opcCiu = $("#ciudadesNeuquen");
    for(let ciudad of ciudadesNeuquen){
        opcCiu.append("<option value='" + ciudad + "'>" + ciudad + "</option>");
    }

}
cargarCiudadNeuquen(ciudadesNeuquen);



function validarNombre(){

    //Validando Campo Nombre//
    let nombre = $("#nombYap")
    let mensaje = $("#notificacion")

    if(nombre.val() == ""){
        let alerta = "Completar dato";
        mensaje.html(alerta);
        nombre.focus();
        return false;
    } else{
        let validado = "Dato valido"
        mensaje.html(validado);
    }

    //Validando Email//

    let email = $("#datoEmail")
    let mensajeEmail = $("#mensajeEmail");

    if ((!email.val() === "") || (!email.val().includes("@"))) {
        let alertaMail = "Completar dato";
        mensajeEmail.html(alertaMail);
        email.focus();
        return false;
    } else{
        let validoEmail = "Dato valido"
        mensajeEmail.html(validoEmail);
    }
    //Validando Telefono//

    let telefono = $("#datoTelefono")
    let mensajeTelefono = $("#mensajeTelefono");

    if((telefono.val() == "") || (!telefono.val().length > 10)){
        let alertaTelefono = "Completar dato";
        mensajeTelefono.html(alertaTelefono);
        return false;
    } else{
        let validadoTelefono = "Dato valido"
        mensajeTelefono.html(validadoTelefono);
    }
}


//agregar evento al boton//

/*$("#envio").click(function(){
    validarNombre();
})*/

$("#nombYap").focusout(function(){
    validarNombre();
});
$("#datoEmail").focusout(function(){
    validarNombre();
});
$("#datoTelefono").focusout(function(){
    validarNombre();
});


//Se agregar la funcion al select de provincias//

function mostrarCiudad(){
    let provincia = $("#provincias").val()
    let mensajeProvncias = $("#mensajeProvincias");
    if(provincia == "Buenos Aires"){
        $("#ciudadesBs").toggle();
    } else if(provincia == "Cordoba"){
        $("#ciudadesCba").toggle();
    } else if(provincia == "Neuquén"){
        $("#ciudadesNeuquen").toggle();
    } else if(provincia == "Seleccionar"){
        let msj = "Por favor seleccione una provincia"
        mensajeProvncias.html(msj).toggle();
    }
}

$("#provincias").click(function(){
    mostrarCiudad();
})

//Depende de la ciudad que seleccionen va figurando el costo//

function costosDeEnvioBs(){
    let ciudadBs = $("#ciudadesBs").val()
    if((ciudadBs == "CABA") || (ciudadBs == "Quilmes")){
        let mensajeEnvio1 = "El costo es 800$ y llega en las proximas 24hs posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio1).toggle();
    } else if((ciudadBs == "Tandil") || (ciudadBs == "Bahia Blanca") ){
        let mensajeEnvio2 = "El costo es 1200$ y llega en los proximos 5 dias posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio2).toggle();
    } else if(ciudadBs == "Gral Roca"){
        let mensajeEnvio3 = "El costo es 1800$ y llega en los proximos 5 dias habiles posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio3).toggle();
    }  else if(ciudadBs == "Seleccionar"){
        let mensajeEnvio4 = "Por favor seleccione una Ciudad"
        $("#costoEnvio").html(mensajeEnvio4).toggle();
    }
} 

$("#ciudadesBs").click(function(){
    costosDeEnvioBs();
})

function costosDeEnvioCba(){
    let ciudadCba = $("#ciudadesCba").val()
    if( ciudadCba == "Cordoba"){
        let mensajeEnvio1 = "El costo es 800$ y llega en las proximas 24hs posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio1).toggle();
    } else if((ciudadCba == "Villa Gral Belgrano") || (ciudadCba == "Rio Cuarto") ){
        let mensajeEnvio2 = "El costo es 1200$ y llega en los proximos 5 dias posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio2).toggle();
    } else if((ciudadCba == "Bell Ville") || (ciudadCba == "Rio Segundo")){
        let mensajeEnvio3 = "El costo es 1800$ y llega en los proximos 5 dias habiles posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio3).toggle();
    } else if(ciudadCba == "Seleccionar"){
        let mensajeEnvio4 = "Por favor seleccione una Ciudad"
        $("#costoEnvio").html(mensajeEnvio4).toggle();
    }

    
}

$("#ciudadesCba").click(function(){
    costosDeEnvioCba();
})

function costosDeEnvioNeuq(){
    let ciudadNqn = $("#ciudadesNeuquen").val()
    if(ciudadNqn == "Neuquen"){
        let mensajeEnvio = "El costo es 800$ y llega en las proximas 24hs posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio).toggle();
    } else if(ciudadNqn == "Villa La Angostura"){
        let mensajeEnvio = "El costo es 1200$ y llega en los proximos 5 dias posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio).toggle();
    } else if(ciudadNqn == "Villa Traful"){
        let mensajeEnvio = "El costo es 1800$ y llega en los proximos 5 dias habiles posteriores a la compra"
        $("#costoEnvio").html(mensajeEnvio).toggle();   
    } else if(ciudadCba == "Seleccionar"){
        let mensajeEnvio4 = "Por favor seleccione una Ciudad"
        $("#costoEnvio").html(mensajeEnvio4).toggle();
    }
}

$("#ciudadesNeuquen").click(function(){
    costosDeEnvioNeuq();
})



function cargarTarjeta(){

    //Funciones tarjeta//
const tarjeta = document.querySelector('#tarjeta'),
formulario = document.querySelector('#tarjetaFormulario'),
numeroTarjeta = document.querySelector('#tarjeta .numero'),
nombreTarjeta = document.querySelector('#tarjeta .nombre'),
logo = document.querySelector('#logoMarca'),
firma = document.querySelector('#tarjeta .firma p'),
mesExpiracion = document.querySelector('#expiracion .mes'),
anioExpiracion = document.querySelector('#expiracion .anio'),
ccv = document.querySelector('#ccv .ccv');

    //Giro de tarjeta//

const giroDeTarjeta = ()=>{
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}

tarjeta.addEventListener('click',()=>{
    tarjeta.classList.toggle('active');
});

//Agregar informacion a los select del mes//

for(let i =1; i<=12;){
    let opciones = document.createElement('option');
    opciones.value = i;
    opciones.innerText = i;
    formulario.selectMes.appendChild(opciones);
i++}

//Agregar informacion a los select del año//

const anioActual = new Date().getFullYear();
for(let i =anioActual; i <=anioActual + 6;){
    let opciones = document.createElement('option');
    opciones.value = i;
    opciones.innerText = i;
    formulario.selectAnio.appendChild(opciones);
i++} 

//Agregar datos de la tarjeta//

formulario.inputNumero.addEventListener('keyup', (e)=>{
    let valor = e.target.value;
    formulario.inputNumero.value = valor
    //Eliminar espacios//
    .replace(/\s/g , '')
    //Eliminar letras//
    .replace(/\D/g, '')
    //Espacio cada 4 números//
    .replace(/([0-9]{4})/g, '$1 ')
    //Elimino ultimo espacio//
    .trim();

    numeroTarjeta.textContent = valor;
    if(valor == ""){
        numeroTarjeta.textContent = '#### #### #### ####';

        logo.innerHTML = "";
    }
    if(valor[0] == 4){
        logo.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = 'imagenes/logovisa.svg';
        logo.appendChild(imagen);
    } else if(valor[0] == 5){
        logo.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = 'imagenes/logomasterOrg.png';
        logo.appendChild(imagen);
    }

    giroDeTarjeta()

})

//Modificacion de nombre y apellido//
formulario.inputNombre.addEventListener('keyup', (e)=>{
    let valor = e.target.value
    formulario.inputNombre.value = valor.replace(/[0-9]/g, '');

    nombreTarjeta.textContent = valor.replace(/[0-9]/g, '');
    firma.textContent = valor.replace(/[0-9]/g, '');

    if(valor == ""){
        nombreTarjeta.textContent = 'Juan Perez';
    }
    
    giroDeTarjeta();
});


//Modificacion select mes//
formulario.selectMes.addEventListener('change', (e)=>{
    mesExpiracion.textContent = e.target.value;
    giroDeTarjeta();
})

//Modificacion select año//
formulario.selectAnio.addEventListener('change', (e)=>{
    anioExpiracion.textContent = e.target.value.slice(2);
    giroDeTarjeta();
})

//Modificacion select ccv//
formulario.inputCCV.addEventListener('keyup', (e)=>{
    let valor = e.target.value
    formulario.inputCCV.value = valor.replace(/\D/g, '')
    ccv.textContent = valor.replace(/\D/g, '')
    
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }
})

}

cargarTarjeta();

//Utilizar datos para agregarlos al comprobante//
function guardarDatosForm() {
    console.log("Guardo los datos del formulario en la localStorage 'datosFormulario'");
    var tarjeta = $("#inputNumero").val();
    var nombre = $("#inputNombre").val();

    localStorage.setItem("datosFormulario", JSON.stringify({tarjeta:tarjeta, nombre:nombre}));
}

$("#enviar_form").click(function() {
    guardarDatosForm();
    mostrarDatos();
    $("#comprobante").fadeIn();
    //Agregando comprobante cuando se carguen los datos de la tarjeta//
    $("#comprobante").click(()=>{
        $("#comprobanteDatos").fadeIn();
    })
})

function cargarDatosForm() {
    return JSON.parse(localStorage.getItem("datosFormulario"));
}

function mostrarDatos() {
    let datos_formulario = cargarDatosForm();

    $("#resultado_nombre").append(datos_formulario.tarjeta);
    $("#resultado_email").append(datos_formulario.nombre);
}

mostrarDatos();

$("#borrarDatos").click(()=>{
    localStorage.clear();
})




