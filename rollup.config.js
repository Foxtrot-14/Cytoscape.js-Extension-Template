import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
const createEsm = process.env.CREATE_ESM === "true";
const createCjs = process.env.CREATE_CJS === "true";
const createUmd = process.env.CREATE_UMD === "true";
const input = "src/index.js"; // Update with your entry point
const outputDir = "dist"; // Update with your desired output directory
const name = "cytoscape.js-extension-template"; //name your extension
const configs = [];

if (createEsm) {
  configs.push({
    input,
    output: {
      file: `${outputDir}/${name}.esm.js`,
      format: "es",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  });
}
if (createCjs) {
  configs.push({
    input,
    output: {
      file: `${outputDir}/${name}.cjs.js`,
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  });
}
if (createUmd) {
  configs.push({
    input,
    output: {
      file: `${outputDir}/${name}.umd.js`,
      format: "umd",
      name: name,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  });
}
configs.push({
  input,
  output: {
    file: `${outputDir}/${name}.umd.min.js`,
    format: "umd",
    name: name,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    terser(),
  ],
});
configs.push({
  input,
  output: {
    file: `${outputDir}/${name}.esm.min.js`,
    format: "esm",
    name: name,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    terser(),
  ],
});
export default configs;
