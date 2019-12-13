var WS = window.WebSocket;
window.WebSocket = function(arg) {
  const ws = new WS(arg);
  setTimeout(() => {
    const ins = ws.onmessage({});
    console.log(JSON.stringify(ins.options));
  }, 0);
  return ws;
};
