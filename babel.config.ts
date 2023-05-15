const babelPresets = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-flow",
    "@babel/preset-typescript",
  ],
};

export default babelPresets;
