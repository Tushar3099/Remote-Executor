import * as express from "express";
import controller from "./controller";
import isLoggedIn from "../../middlewares/isLogged.handler";

export default express
  .Router()
  .post("/generate", isLoggedIn, controller.generateLink)
  .post("/delete", isLoggedIn, controller.deleteLink)
  .post("/addEmail", isLoggedIn, controller.addEmail)
  .post("/removeEmail", isLoggedIn, controller.removeEmail);
