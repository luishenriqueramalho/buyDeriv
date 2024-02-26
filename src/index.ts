import WebSocket from "ws";

const appId: string = "YOUR_ID";
const apiToken: string = "YOUR_TOKEN";
const derivWebSocketUrl: string = `wss://ws.binaryws.com/websockets/v3?app_id=${appId}`;

let ws: WebSocket;

async function connectWebSocket() {
  ws = new WebSocket(derivWebSocketUrl);

  ws.on("open", async () => {
    console.log("Conexão aberta.");
  });

  ws.on("message", async (data) => {
    const response = JSON.parse(data.toString());

    if (response.error) {
      console.error("Erro WebSocket:", response.error.message);
      return;
    }

    if (response.msg_type === "authorize") {
      console.log("Autenticado com sucesso.");
      console.log("Realizar compra!");
    }
  });

  ws.on("error", (err) => {
    console.error("WebSocket error: ", err);
  });

  ws.on("close", () => {
    console.log("Conexão fechada. Tentando reconectar...");
  });
}

connectWebSocket();
