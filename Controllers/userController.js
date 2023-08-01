const url = require("url");
const helper = require("../helper");

const getUsers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const storedData = helper.read();

  // checking if name is present in query parameter
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.query.name) {
    const result = storedData.filter(
      (item) => item.name.toLocaleLowerCase().includes(parsedUrl.query.name.toLocaleLowerCase())
    );
    res.end(JSON.stringify(result));
  } else {
    res.end(JSON.stringify(storedData));
  }
};

const createUser = (req, res) => {
  // reading data from rquest body
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { name, email } = JSON.parse(body);
    if (name && email) {
      const storedData = helper.read();

      const newUserID =
        storedData.length > 0 ? storedData[storedData.length - 1]["id"] + 1 : 1;
      const updatedData = [...storedData, { id: newUserID, name, email }];
      helper.write(updatedData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          code: 200,
          remark: "User added successfully",
          data: null,
        })
      );
    } else {
      throw new Error("Data not provided");
    }
  });
};

const updateUser = (req, res) => {
  // reading data from rquest body
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { id, name, email } = JSON.parse(body);

    if (id && name && email) {
      const storedData = helper.read();

      // searching and editing the particular user
      const userToEditIndex = storedData.findIndex((item) => item.id === id);
      storedData[userToEditIndex] = {
        ...storedData[userToEditIndex],
        name,
        email,
      };

      helper.write(storedData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          code: 200,
          remark: "User updated successfully",
          data: null,
        })
      );
    } else {
      throw new Error("Data not provided");
    }
  });
};

const deleteUser = (req, res) => {
  const storedData = helper.read();

  // accessing the user id from query
  const parsedUrl = url.parse(req.url, true);
  const userToDeleteIndex = storedData.findIndex(
    (item) => item.id === Number(parsedUrl.query.id)
  );

  res.writeHead(200, { "Content-Type": "application/json" });

  if (userToDeleteIndex != -1) {
    storedData.splice(userToDeleteIndex, 1);
    helper.write(storedData);

    res.end(
      JSON.stringify({
        code: 200,
        remark: "User deleted successfully",
        data: null,
      })
    );
  } else {
    res.end(
      JSON.stringify({
        code: 400,
        remark: "User not found",
        data: null,
      })
    );
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };