//Manejar nuevos tickets

//Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', (client) => {
    console.log('Conectado al server');
});

socket.on('disconnect', (client) => {
    console.log('Desconectado del servidor');
});

$('button').on('click', function() {
    // socket.emit('siguienteTicket', {
    //     numero: ticketControl.siguiente()
    // });
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //Lo muestro en label lblNuevoTicket
        label.text(siguienteTicket);
    });
});
//on estadoActual

socket.on('estadoActual', function(data) {
    label.text(data.actual);

});