import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const Link = require("../../models/link");

class LinkService {
  async generate(user) {
    try {
      const uid = uuidv4();
      const link = BASE_URI + uid;
      const isLink = await Link.findOne({ link });
      if (isLink) {
        throw {
          message: "Try Again",
        };
      } else {
        const generatedLink = new Link({
          link,
          interviewer: {
            email: user.email,
            name: user.name,
            dp: user.dp,
          },
        });
        generatedLink
          .save()
          .then((newLink) => {
            return res.json({
              message: "Generated link for interview!",
              link: newLink,
            });
          })
          .catch((err) => {
            throw {
              message: "Internal error: " + err.message,
              status: err.status,
            };
          });
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}

export default new LinkService();
