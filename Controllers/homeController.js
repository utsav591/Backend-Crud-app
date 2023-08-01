const home = (req, res) => {
    // returning a success response when client hits home route
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        code: 200,
        remark: "success",
      })
    );
  };
  
  module.exports = { home }