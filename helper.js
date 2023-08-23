import fs from 'fs';


const read=()=>{
    try {
        const result = fs.readFileSync('./db.json','utf-8');
        const parsedResult = JSON.parse(result)
        return parsedResult;
    } catch (error) {
        throw new Error("Error reading file:", error);
    }
}

function write(data) {
    try {
      const jsonString = JSON.stringify(data);
      fs.writeFileSync("./db.json", jsonString, 'utf8');
      return;
    } catch (err) {
      throw new Error("Error reading file:", err);
    }
  }

export {read,write}