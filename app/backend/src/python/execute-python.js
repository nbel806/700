import { exec } from "child_process";
import util from "util";
import { resolve } from "path";

const execAsync = util.promisify(exec);

export async function runPythonTestScript(scriptName) {
  try {
    //get current working directory
    const scriptPath = resolve(process.cwd(), `./src/python/${scriptName}`);

    const { stdout, stderr } = await execAsync(`python ${scriptPath}`);

    if (stderr) {
      throw new Error(stderr);
    }

    console.log(`Python script output: ${stdout}`);
    return stdout;
  } catch (error) {
    console.error(`Error executing Python script: ${error.message}`);
    throw new Error(`Error executing Python script: ${error.message}`);
  }
}
