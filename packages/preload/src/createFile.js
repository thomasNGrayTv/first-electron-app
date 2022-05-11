import { exposeInMainWorld } from "./exposeInMainWorld";

function createQuotesFile(content) {
  //dialog module
  const fs = require("fs");
  const remote = require("@electron/remote");
  const { dialog } = remote;

  dialog
    .showSaveDialog({
      defaultPath: "~/quotes.txt",
      filters: [
        {
          name: "Text File",
          extensions: ["txt"],
        },
      ],
    })
    .then((result) => {
      fs.writeFile(result.filePath, content, (err) => {
        // file saved or err
        console.log("ERROR 1: " + err);
      });
    })
    .catch((err) => {
      // err
      console.log("ERROR 2: " + err);
    });
}

// Export for types in contracts.d.ts
// export const createFile = { createQuotesFile };
const createFile = { createQuotesFile };

exposeInMainWorld("createFile", createFile);
