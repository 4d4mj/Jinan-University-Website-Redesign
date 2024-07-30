import express from "express";
import { handleCors, handleJsonBody } from './middlewares.js';
import { loginController } from "./controllers/logincontroller.js";
import { profileController } from "./controllers/profileController.js";
import { courseController } from "./controllers/courseController.js";
import { transcriptController } from "./controllers/transcriptController.js";

const app = express();
app.use(handleJsonBody);
app.use(handleCors);

app.post("/login", loginController);

app.get("/profile", profileController);

app.get("/courses", courseController);

app.get("/transcript", transcriptController);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
