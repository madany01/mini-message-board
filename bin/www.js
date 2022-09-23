const http = require('http')
const debug = require('debug')('local-library:server')
const app = require('../app')

function normalizePort(portVal) {
  // Normalize a port into a number, string, or false.

  const parsedPort = Number.parseInt(portVal, 10)

  // named pipe
  if (Number.isNaN(parsedPort)) return portVal

  // port number
  if (parsedPort >= 0) return parsedPort

  return false
}

const port = normalizePort(process.env.PORT || '3000')
const server = http.createServer(app)

function onError(error) {
  if (error.syscall !== 'listen') throw error

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break

    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break

    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

  debug(`Listening on ${bind}`)
}

app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
