const http = require("http");

// Importing controllers
const homeController = require("./Controllers/homeController");
const userController = require("./Controllers/userController");

// creating a http server
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  if (req.url == "/") {
    homeController.home(req, res);
  } else if (req.url.includes("/users")) {
    try {
      if (req.method == "GET") {
        userController.getUsers(req, res);
      } else if (req.method == "POST") {
        userController.createUser(req, res);
      } else if (req.method == "PUT") {
        userController.updateUser(req, res);
      } else if (req.method == "DELETE") {
        userController.deleteUser(req, res);
      } else {
        // returning error if method is other than GET, POST, PUT, DELETE
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            code: 405,
            remark: "method not allowed",
            data: null,
          })
        );
      }
    } catch (e) {
      // returning error if something wents wrong on server
      console.log(e);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          code: 500,
          remark: "Internal server error",
          data: null,
          error: e,
        })
      );
    }
  } else {
    // returning a not found error when client hits any url other than "/" and "/users"
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 404,
        remark: "Not found",
        data: null,
      })
    );
  }
});

// starting server on port 5000 of localhost
const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});