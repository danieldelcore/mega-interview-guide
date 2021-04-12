const fs = require("fs-extra");
const marked = require("marked");
const highlights = require("highlight.js");

async function main() {
  if (fs.existsSync("build")) {
    await fs.rmdir("build", { recursive: true });
  }

  await fs.mkdir("build");
  await fs.copy("./assets", "./build/assets");
  await fs.copy("./assets", "./build/assets");
  await fs.copyFile("index.html", "./build/index.html");

  const readmeFile = await fs.readFile("./README.md", "utf8");
  const targetFile = await fs.readFile("./build/index.html", "utf8");

  marked.setOptions({
    highlight: (code, lang, callback) => {
      const language = highlights.getLanguage(lang) ? lang : "plaintext";
      return highlights.highlight(code, { language }).value;
    },
  });

  const result = targetFile.replace(
    "<!-- REPLACE_HERE -->",
    marked(readmeFile)
  );

  await fs.writeFile("./build/index.html", result);
}

main();
