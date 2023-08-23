const home=(req,res)=>{
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      code: 200,
      remark: "success",
      data: null
    })
  );
}

export default {home};