import WebSocket from "ws";

const appId: string = "YOUR_ID";
const apiToken: string = "YOUR_TOKEN";
const derivWebSocketUrl: string = `wss://ws.binaryws.com/websockets/v3?app_id=${appId}`;

let ws: WebSocket;

async function connectWebSocket() {
  ws = new WebSocket(derivWebSocketUrl);

  ws.on("open", async () => {
    console.log("Conexão aberta.");
    startLogging();
  });

  ws.on("message", async (data) => {
    const response = JSON.parse(data.toString());

    if (response.error) {
      console.error("Erro WebSocket:", response.error.message);
      return;
    }
  });

  ws.on("error", (err) => {
    console.error("WebSocket error: ", err);
  });

  ws.on("close", () => {
    console.log("Conexão fechada. Tentando reconectar...");
  });
}

function startLogging() {
  setInterval(() => {
    console.log("Foi realizado uma compra.");

    setInterval(() => {
      console.log("Ordem fechada.");
    }, 5000);
  }, 30000);
}

connectWebSocket();
