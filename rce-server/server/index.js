import "./common/env";
import routes from "./routes";
const Express = require("express");
const app = new Express();
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8000",
    // methods: ["GET", "POST"],
  },
});
import cors from "cors";

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || "100kb",
  })
);
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());

routes(app);

let interval;

io.on("connection", (socket) => {
  socket.on("ping", function (data) {
    console.log("socket: server recieves ping (2)");

    // (3): Return a pong event to the browser
    // echoing back the data from the ping event
    socket.emit("pong", data);

    console.log("socket: server sends pong (3)");
  });
});

http.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
