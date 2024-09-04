import { exec } from "child_process";
import { promisify } from "util";
import { resolve } from "path";

// Convert exec to return a promise
const execPromise = promisify(exec);

// Function to run the Python script with arguments
export async function runPythonScript(prompts, groups, llms, continuations) {
  const executablePath = resolve(
    process.cwd(),
    "../../NZContext/app_for_backend.py"
  );

  // Convert arguments to JSON strings and escape quotes
  const promptsJson = JSON.stringify(prompts).replace(/"/g, '\\"');
  const groupsJson = JSON.stringify(groups).replace(/"/g, '\\"');
  const llmsJson = JSON.stringify(llms).replace(/"/g, '\\"');

  // Prepare the arguments for the Python script
  const args = [
    `--prompts="${promptsJson}"`,
    `--masks="${groupsJson}"`,
    `--llms="${llmsJson}"`,
    `--num_continuations=${continuations}`,
  ].join(" ");

  // Execute the Python script
  const command = `python3 ${executablePath} ${args}`;
  console.log(`Executing command: ${command}`);
  try {
    const { stdout, stderr } = await execPromise(command);
    const stderrLines = stderr.split("\n");
    const filteredStderr = stderrLines
      .filter((line) => line.includes("Error") && line.includes("error"))
      .join("\n");

    // If there's any error output other than errors that are meant to happen, throw an error
    if (filteredStderr) {
      console.log(filteredStderr);
      throw new Error(filteredStderr);
    }
    console.log(`Executable output: ${stdout}`);

    const isDone = stdout.includes("done");

    return { stdout, isDone };
  } catch (error) {
    console.error(`Error executing Python script: ${error.message}`);
    throw new Error(`Error executing Python script: ${error.message}`);
  }
}
