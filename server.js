import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server successfully running on port ${port}`);
});
