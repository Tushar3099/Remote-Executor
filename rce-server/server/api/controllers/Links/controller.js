import LinkService from "../../services/link.service";

export class Controller {
  async generateLink(req, res) {
    try {
      if (!req.user) {
        throw {
          message: "User must be logged in!!",
        };
      } else {
        const output = await LinkService.generate(req.user);
        // if (output) {
        //   return res.json({
        //     status: 200,
        //     message: "Successfully generated link!!",
        //     link,
        //   });
        // } else {
        //   throw {
        //     message: "Some error occurred. Try again!!",
        //   };
        // }
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}

export default new Controller();
