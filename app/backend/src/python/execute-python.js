import { exec } from "child_process";
import util from "util";
import { resolve } from "path";

const execAsync = util.promisify(exec);

export async function runPythonTestScript(executableName) {
  try {
    // Get current working directory and resolve the path to the Python script
    const executablePath = resolve(
      process.cwd(),
      `./src/python/${executableName}`
    );

    // Construct the full command to run the script with the Python interpreter
    const command = `${"python3"} ${executablePath}`;

    // Execute the command
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      throw new Error(stderr);
    }

    console.log(`Executable output: ${stdout}`);
    return stdout;
  } catch (error) {
    console.error(`Error executing script: ${error.message}`);
    throw new Error(`Error executing script: ${error.message}`);
  }
}
