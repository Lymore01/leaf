import fs from "fs";
import path from "path";

const packagesDir = path.resolve("packages");

function readJSON(filePath: string) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function checkTsconfig(pkgPath: string) {
  const tsconfigPath = path.join(pkgPath, "tsconfig.json");
  const tsconfig = readJSON(tsconfigPath);
  if (!tsconfig) return { valid: false, reason: "Missing tsconfig.json" };

  const { compilerOptions } = tsconfig;
  const composite = compilerOptions?.composite === true;
  const declaration = compilerOptions?.declaration === true;

  if (!composite) return { valid: false, reason: '"composite" is not true' };
  if (!declaration) return { valid: false, reason: '"declaration" is not true' };

  return { valid: true };
}

function main() {
  const packages = fs.readdirSync(packagesDir).filter((dir) =>
    fs.statSync(path.join(packagesDir, dir)).isDirectory()
  );

  let hasErrors = false;

  for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg);
    const result = checkTsconfig(pkgPath);

    if (!result.valid) {
      console.error(`[ERROR] ${pkg}: ${result.reason}`);
      hasErrors = true;
    } else {
      console.log(`[SUCCESS] ${pkg}: tsconfig is valid`);
    }
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log("\n[SUCCESS] All packages are properly configured!");
  }
}

main();
