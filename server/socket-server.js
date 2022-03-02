const io = require('socket.io')();

const DAO = require('./dataAccessObject');
const Comment = require('./comment');

const newDAO = new DAO('./database.sqlite3');
const comment = new Comment(newDAO);

comment.createTable().catch(error => {
    console.log(`Error: ${JSON.stringify(error)}`);
});

io.on('connection', (client) => {
    // Do stuff on connection to server

    client.on('addComment', (comment) => {
        try {
            const parsedEvent = JSON.parse(comment)
            comment.createComment({name: parsedEvent['name'], message: parsedEvent['comment']})
            client.emit('ok')
            io.emit('newComment', comment)
        } catch (e) {
            emit_failure(client, e)
        }
    });

    client.on('deleteComments', () => {
        try {
            comment.deleteComments()
            client.emit('ok')
        } catch (e) {
            emit_failure(client, e)
        }
    });

    client.on('loadExistingComments')
});

function emit_failure(client, e) {
    client.emit('fail', `${e}`)
}

const port = 3002;
io.listen(port);
console.log('listening on port ', port);