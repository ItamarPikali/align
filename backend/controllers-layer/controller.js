const express = require("express");
const logic = require("../business-logic-layer/logic");
const fileUpload = require("express-fileupload");
const userModel = require("../model/user-model");
const Credentials = require("../model/credentials");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const path = require("path");
const router = express.Router();
router.use(fileUpload());


router.post("/login", async (request, response) => {
  try {
    // Data:
    const credentials = new Credentials(request.body);
    // Validation:
    const errors = credentials.validate();
    if (errors) return response.status(400).send(errors);

    // logic:
    const loggedInUser = await logic.loginAsync(credentials);
    console.log(loggedInUser);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password.");

    // Success:
    response.json(loggedInUser);
  } catch (err) {
    console.log(err);
    response.status(500).send("Server error");
  }
});

router.get("/users/all", async (request, response) => {
  try {
    const users = await logic.getAllUsers();
    if (users.length >= 1) response.send(users);
    else response.status(404).send(`Can not find users`);
  } catch (error) {
    response.status(500).send(error);
  }
});


// creating user if registered properly :

router.post("/user", async (request, response) => {
  const user = new userModel(request.body);
  const errors = user.validate();
  if (errors) {
    response.status(400).json(errors);
  } else {
    try {
      console.log(errors);
      await logic.addSingleUserAsync(user);
      response.status(201).send("Created"); // Created
    } catch (error) {
      console.log(error);
      response.status(500).send("Server error");
    }
  }
});


module.exports = router;
