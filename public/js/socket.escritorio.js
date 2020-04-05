// Abrir la conexion
var socket = io();

//obtener el parametro de escritorio
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('escritorio'));
if (!searchParams.has('escritorio')) {

    //Lo hago salir de la pantalla, a la inicial
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');

}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log('RESPUESTA: ', resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket' + resp.numero);

    });
});