import Server from "../../../common/server";

export class Controller {
  async connect(req, res) {
    const io = new Server().socketListen();
    console.log(io);
    const uid = req.params.uid;

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}

export default new Controller();
