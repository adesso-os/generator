const fs = require("fs/promises");
const path = require("path");

module.exports = {
  name: "git-hooks",
  factory: require => ({
    hooks: {
      async afterAllInstalled(project) {
        console.log("git-hooks: Installing pre-commit hook...");

        const thisDirectory = __dirname;
        const monoRepoRoot = path.resolve(thisDirectory, "../..");
        const gitDirectory = path.resolve(monoRepoRoot, ".git");
        const hooksDirectory = path.resolve(gitDirectory, "hooks");
        const configFilename = path.join(monoRepoRoot, "lint-staged.config.js");

        console.log(`git-hooks: Installing hook into '${hooksDirectory}'...`);

        const hookFile = `#!/bin/sh
echo "Running lint-staged..."
echo "yarn lint-staged --config ${configFilename}"
yarn lint-staged --config ${configFilename}
`;
        const hookFilename = path.resolve(hooksDirectory, "pre-commit");
        await fs.writeFile(hookFilename, hookFile, "utf-8");
        await fs.chmod(hookFilename, 0o755);

        console.log("git-hooks: Done.");
      },
    },
  }),
};
