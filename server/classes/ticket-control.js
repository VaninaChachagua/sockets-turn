const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(params) {
        this.ultimo = 0; //ultimo ticket
        this.hoy = new Date().getDate();
        //Tickets pendientes
        this.tickets = [];
        //Esto lo utilizo para mi pantalla publica
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);


        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }
    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        //Borro el que estoy atendiendo de la cola de espera
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //Esto lo agrega al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);
        //Tengo que borrar cuando sean más de 4
        if (this.ultimos4.length > 4) {
            //borra el último
            this.ultimos4.splice(-1, 1);
        }
        this.grabarArchivo();
        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
};