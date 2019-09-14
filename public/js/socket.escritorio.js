var socket = io();



socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {
    console.log('Se ha perdido conexion con el servidor');
});

//obtener parametros por URL

var searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario ');
}

let label = $('small')
    //Capturamos el numero de escritorio en los parametros de la url 
let escritorio = searchParams.get('escritorio');

//capturamos el H1 del documento
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    //Respuesta que recibimos del servidor            
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {


        if (resp === 'No hay tickets') {
            alert(resp);
            return
        }

        label.text('Ticket ' + resp.numero)
    })

})