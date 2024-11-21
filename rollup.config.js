import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import fs from "fs";
import path from "path";
import license from "rollup-plugin-license";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import postcss from "postcss";
import prefixer from "postcss-prefix-selector";

export default {
  input: "./src/index.js",
  output: [
    // UMD Build
    {
      file: "dist/js/mobject-graph-ui.bundle.js",
      format: "umd",
      name: "MobjectGraphUi",
      globals: {
        "mobject-litegraph": "MobjectLitegraph",
      },
    },
    // Minified UMD Build
    {
      file: "dist/js/mobject-graph-ui.bundle.min.js",
      format: "umd",
      name: "MobjectGraphUi",
      globals: {
        "mobject-litegraph": "MobjectLitegraph",
      },
      plugins: [terser()],
    },
    // ESM Build
    {
      file: "dist/js/mobject-graph-ui.bundle.esm.js",
      format: "esm",
    },
    // Minified ESM Build
    {
      file: "dist/js/mobject-graph-ui.bundle.esm.min.js",
      format: "esm",
      plugins: [terser()],
    },
    // CommonJS Build
    {
      file: "dist/js/mobject-graph-ui.bundle.cjs.js",
      format: "cjs",
    },
    // Minified CommonJS Build
    {
      file: "dist/js/mobject-graph-ui.bundle.cjs.min.js",
      format: "cjs",
      plugins: [terser()],
    },
  ],
  external: ["mobject-litegraph"],
  plugins: [
    scopeCSS({
      inputFile: "node_modules/bootstrap/dist/css/bootstrap.min.css",
      outputDir: "build",
      scopeClass: ".mgui",
    }),
    nodeResolve(),
    css({
      output: "mobject-graph-ui.css",
    }),
    copy({
      targets: [
        {
          src: "node_modules/@fortawesome/fontawesome-free/webfonts/*",
          dest: "dist/webfonts",
        },
        {
          src: "node_modules/@fortawesome/fontawesome-free/LICENSE.txt",
          dest: "dist/webfonts",
        },
      ],
    }),
    addLicenseToCssFiles({ filename: "LICENSE" }),
    cssClean(),
    license({
      sourcemap: true,
      cwd: process.cwd(),
      banner: {
        commentStyle: "regular",

        content: {
          file: path.join(__dirname, "LICENSE"),
          encoding: "utf-8",
        },
      },
      thirdParty: {
        allow: {
          test: "MIT",
          failOnUnlicensed: true,
          failOnViolation: true,
        },
      },
    }),
    finallyMoveFile({
      src: "dist/js/mobject-graph-ui.css",
      dest: "dist/css/mobject-graph-ui.css",
    }),
  ],
};

function addLicenseToCssFiles({ filename }) {
  return {
    name: "css-license-banner",
    generateBundle(outputOptions, bundle) {
      const licenseFile = path.join(__dirname, filename);
      let licenseContent = fs.readFileSync(licenseFile, "utf-8");
      const banner = `/*\n${licenseContent}\n*/\n`;

      for (const bundleFileName of Object.keys(bundle)) {
        if (bundleFileName.endsWith(".css")) {
          bundle[bundleFileName].source =
            banner + bundle[bundleFileName].source;
        }
      }
    },
  };
}

function ensureOnlyOneCharset(cssString) {
  let cleanedCss = cssString.replace(/@charset "UTF-8";/g, "");
  return '@charset "UTF-8";' + cleanedCss;
}

function cssClean() {
  return {
    name: "css-clean",
    generateBundle(outputOptions, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith(".css")) {
          bundle[fileName].source = ensureOnlyOneCharset(
            bundle[fileName].source
          );
        }
      }
    },
  };
}

function scopeCSS({ inputFile, outputDir, scopeClass }) {
  return {
    name: "scope-css",
    buildStart() {
      const normalizedScopeClass = scopeClass.replace(/^\./, "");
      const fileName = inputFile.split("/").pop();
      const outputFile = path.join(
        outputDir,
        `${normalizedScopeClass}.${fileName}`
      );
      const content = fs.readFileSync(inputFile, "utf8");

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const out = postcss([require("postcss-discard-duplicates")()])
        .use(
          prefixer({
            prefix: scopeClass,
            exclude: [".c"],
          })
        )
        .process(content).css;

      fs.writeFileSync(outputFile, out);
      console.log("Bootstrap CSS scoped and saved to:", outputFile);
    },
  };
}

function finallyMoveFile(options) {
  return {
    name: "copy-then-delete",
    closeBundle() {
      const destDir = path.dirname(options.dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      fs.copyFileSync(options.src, options.dest);
      fs.unlinkSync(options.src);
    },
  };
}
