import fs from "fs";
import path from "path";
import ttf2woff2 from "ttf2woff2";

const fontsDir = path.resolve("public/fonts");

fs.readdirSync(fontsDir)
  .filter(file => file.endsWith(".ttf"))
  .forEach(file => {
    const input = fs.readFileSync(path.join(fontsDir, file));
    const output = ttf2woff2(input);

    const outFile = file.replace(".ttf", ".woff2");
    fs.writeFileSync(path.join(fontsDir, outFile), output);

    console.log(`✔ Converted: ${file} → ${outFile}`);
  });
