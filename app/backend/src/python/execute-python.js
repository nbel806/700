import { exec } from "child_process";
import util from "util";
import { resolve } from "path";

const execAsync = util.promisify(exec);

export async function runPythonTestScript(executableName) {
  try {
    // Get current working directory
    const executablePath = resolve(
      process.cwd(),
      `./src/python/${executableName}`
    );

    const { stdout, stderr } = await execAsync(executablePath);

    if (stderr) {
      throw new Error(stderr);
    }

    console.log(`Executable output: ${stdout}`);
    return stdout;
  } catch (error) {
    console.error(`Error executing executable: ${error.message}`);
    throw new Error(`Error executing executable: ${error.message}`);
  }
}
