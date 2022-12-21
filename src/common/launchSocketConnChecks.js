const launchSocketConnChecks = (wss) => setInterval(() => {
  wss.clients.forEach((socket) => {
    if (!socket.isAlive) {
      socket.terminate();
      return;
    }

    socket.isAlive = false; // eslint-disable-line no-param-reassign
    socket.ping(null, false, true);
  });
}, 30000);

module.exports = launchSocketConnChecks;
