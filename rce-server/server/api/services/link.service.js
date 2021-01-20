import mongoose from "mongoose";
import crypto from "crypto";
const Link = require("../../models/link");
const BASE_URI = "http://localhost:3000/";

class LinkService {
  async generate(user) {
    try {
      var setLink = "";
      const uid = crypto.randomBytes(16).toString("hex");
      const link = BASE_URI + uid;
      // console.log(link);
      const generatedLink = new Link({
        link,
        interviewer: user._id,
      });
      generatedLink
        .save()
        .then((newLink) => {
          // console.log(newLink.link);
          // setLink = newLink;
          return newLink;
        })
        .catch((err) => {
          throw {
            message: "Internal error: " + err.message,
            status: err.status,
          };
        });
      // return setLink;
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }
}

export default new LinkService();
