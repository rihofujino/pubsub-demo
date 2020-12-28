
(function () {
  const messages = document.querySelector('#messages');
  const wsButton = document.querySelector('#wsButton');
  const wsSendButton = document.querySelector('#wsSendButton');

  function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
  }

  let ws;

  wsButton.onclick = function () {
    wsSendButton.disabled = false;
    
    ws = new WebSocket(`ws://${location.host}`);
    ws.onopen = function () {
      showMessage('WebSocket connection established');
    };
    ws.onmessage = function (message) {
      let data = JSON.parse(message.data)
      showMessage(JSON.stringify(data.message));
    };
    ws.onclose = function (event) {
      showMessage('Connection closed.' + event);
      ws = null;
    };
    ws.onerror = function (event) {
      showMessage('Connection error.' + event);
    };
  };

  wsSendButton.onclick = function () {
    if (!ws) {
      showMessage('No WebSocket connection');
      return;
    }
    const msg = document.querySelector('#msgInput').value;
    ws.send(msg);
  };
})();
