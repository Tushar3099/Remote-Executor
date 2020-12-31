import fs from "fs";
import { execFile, spawn, exec } from "child_process";
import { stderr } from "process";
import { resolve } from "path";
const ROOT_DIR = "/d/Webdev/RemoteCodeExecutor/remote-code-executor";
const SOURCE_DIR = `${ROOT_DIR}/executor`;
const TARGET_DIR = `/app/codes`;
const IMAGE_NAME = "executor:1.0";

class CodeService {
  async execute(code, input, lang, id) {
    try {
      //writing the code,input  files
      const { file, inputFile } = await this.writeFile(code, lang, input, id);

      //write command
      const { runCode, runContainer } = await this.writeCommand(
        lang,
        file,
        // outputFile,
        inputFile,
        id
      );

      //executing the file
      const OUTPUT = await this.execChild(runCode, runContainer, id);

      //deleting the container

      //deleting files

      if (OUTPUT) {
        // await this.deleteFiles(fileName, inputName, lang);
        return OUTPUT.toString();
      }
    } catch (error) {
      throw error;
    }
  }

  async writeFile(code, lang, input, id) {
    let fileName = `${id}code`;
    switch (lang) {
      case "javascript": {
        fileName += ".js";
        break;
      }
      case "c++": {
        fileName += ".cpp";
        break;
      }
      case "python": {
        fileName += ".py";
        break;
      }
      default: {
        throw { message: "Invalid language" };
      }
    }
    fs.writeFile(`${SOURCE_DIR}/${fileName}`, code, (err) => {
      if (err) throw { message: err };
    });
    // fs.writeFile(`${SOURCE_DIR}/${id}output.txt`, "", (err) => {
    //   if (err) throw { message: err };
    // });
    fs.writeFile(`${SOURCE_DIR}/${id}input.txt`, input, (err) => {
      if (err) throw { message: err };
    });

    return {
      file: fileName,
      // output: `${id}output.txt`,
      inputFile: `${id}input.txt`,
    };
  }

  async writeCommand(lang, file, input, id) {
    let command = "";
    switch (lang) {
      case "javascript": {
        command = `cd ${TARGET_DIR} && node ${file} < ${input}`;
        break;
      }
      case "c++": {
        command = `cd ${TARGET_DIR} && g++ ${file} && a < ${input}`;
        break;
      }
      case "python": {
        command = `cd ${TARGET_DIR} && python ${file} < ${input}`;
        break;
      }
      default: {
        throw { message: "Invalid language" };
      }
    }

    const containerName = `${id}container`;

    const runCode = `docker exec ${containerName} sh -c "${command}"`;

    const runContainer = `docker run -it -d --name ${containerName} -v "${SOURCE_DIR}:${TARGET_DIR}" ${IMAGE_NAME}`;

    return { runCode, runContainer };
  }

  async execChild(runCode, runContainer, id) {
    return new Promise((resolve, reject) => {
      const execCont = exec(`${runContainer}`);
      const outputFile = `${id}output.txt`;
      execCont.on("error", (err) => {
        throw { status: "404", message: err };
      });

      execCont.stdout.on("data", () => {
        exec(`${runCode}`, async (error, stdout, stderr) => {
          await this.endContainer(id);
          if (stderr) {
            reject({ message: stderr });
          } else {
            // const outputData = fs.createReadStream(`${SOURCE_DIR}/${outputFile}`);
            // resolve(outputData.toString());
            resolve(stdout);
          }
        });
      });
    });
  }

  // async deleteFiles(fileName, inputName, lang) {
  //   fs.unlinkSync(`${SOURCE_DIR}/${fileName}`, (err) => {
  //     if (err) throw err;
  //   });
  //   if (inputName) {
  //     fs.unlinkSync(`${SOURCE_DIR}/${inputName}`, (err) => {
  //       if (err) throw err;
  //     });
  //   }
  //   if (lang == "c++") {
  //     fs.unlinkSync(`${SOURCE_DIR}/a.exe`, (err) => {
  //       if (err) throw err;
  //     });
  //   }
  // }

  async endContainer(id) {
    const containerName = `${id}container`;
    const exit = `docker stop ${containerName} && docker rm ${containerName}`;
    cp.exec(`${exit}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else console.log("Container stoped and deleted");
    });
  }
}

export default new CodeService();
