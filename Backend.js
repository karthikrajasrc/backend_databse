const fs = require("fs");
fs.writeFile("./log.txt", "The File is created and is live now!", (error) => {
    if (error) {
        console.log("There is a error on the file, ", error.message);
        return;
    }
    console.log("The file creation is succesfull!");
})