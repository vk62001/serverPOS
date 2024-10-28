let socket;

const getSocketInit = () => {
  // socket = socketServer;
  return socket;
};

const setSocketInit = (socketServer) => {
  socket = socketServer;
  // return socket;
};

module.exports = { getSocketInit, setSocketInit };
