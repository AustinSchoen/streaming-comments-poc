const http = require('http')
const socketIO = require('socket.io')

const httpServer = http.createServer();
const io = new socketIO.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const DAO = require('./dataAccessObject');
const Comment = require('./comment');

const newDAO = new DAO('./database.sqlite3');
const commentDAO = new Comment(newDAO);

commentDAO.createTable().catch(error => {
    console.log(`Error: ${JSON.stringify(error)}`);
});

io.on('connection', (client) => {
    // Do stuff on connection to server
    console.log(`${client.id} is connected`)

    client.on('addComment', (comment) => {
        console.log('Adding New Comment', comment)
        try {
            const parsedEvent = JSON.parse(comment)
            commentDAO.createComment({name: parsedEvent['name'], message: parsedEvent['comment']}).then((result) => {
                client.emit('ok', result)
                io.emit('newComment', comment)
            })
        } catch (e) {
            emit_failure(client, e)
        }
    });

    client.on('deleteComments', () => {
        try {
            commentDAO.deleteComments().then((result) => {
                client.emit('ok')
            })
        } catch (e) {
            emit_failure(client, e)
        }
    });

    client.on('getExistingComments', () => {
        console.log("Sending existing comments")
        try {
            commentDAO.getComments().then((result) => {
                client.emit('loadExistingComments', result)
            })
        } catch (e) {
            emit_failure(client, e)
        }
    })
});

function emit_failure(client, e) {
    client.emit('fail', `${e}`)
}

const port = 3002;
io.listen(port);
console.log('Socket.IO Server listening on port ', port);