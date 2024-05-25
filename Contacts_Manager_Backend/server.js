const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
/* `require("dotenv").config()` is a method call that loads and configures the dotenv module in a
Node.js application. The dotenv module is used to load environment variables from a .env file into
process.env, making it easier to manage configuration settings in a Node.js application. */
require("dotenv").config();

const port = process.env.PORT || 5000;
connectDB();
const app = express();

/* `app.use(express.json());` is setting up middleware in the Express application to parse incoming
requests with JSON payloads. This middleware function parses incoming request bodies with JSON
payloads and makes the parsed data available on the `req.body` property of the request object. This
allows the application to handle JSON data sent in the request body easily. */
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

/* `app.use(errorHandler);` is setting up error handling middleware in the Express application. This
middleware function is used to handle errors that occur during the processing of incoming requests.
When an error occurs in the application, the errorHandler middleware will be called to handle the
error and send an appropriate response back to the client. This helps in centralizing error handling
logic and providing consistent error responses across the application. */
/// [important] : always write this line after the route usage else it will not work
app.use(errorHandler);

app.listen(port, () => {})