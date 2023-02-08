const http = require("http");
const fs=require("fs");
const path=require("path");
const filePath = path.join(process.cwd() , "myData.txt")
const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.write("Home Page");
    response.end();
  } else if (request.url === "/form") {
    response.setHeader("Content-Type", "text/html");
    response.write(
      "<form action='/submit' method='POST'><input name='userData' /><button>Submit</button></form>"
    );
    response.end();
  } else if (request.url === "/submit") {
    let dataComplete = "";
    request.on("data", (chunk) => (dataComplete += chunk));
    request.on("end", () => {
        fs.readFile(filePath,"utf8",(_,storedData)=>{
           const newData= storedData + "\n" + dataComplete;
           fs.writeFile(filePath,newData,()=>{
            //   console.log(dataComplete);
              response.write("Data Received Successfully!");
              response.end();
        }) 
        })
        
    });
  } else {
    response.write("Error 404 - Not Found");
    response.end();
  }
});
server.listen(3002);
