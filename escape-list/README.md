To generate a list of valid LaTeX commands for escaping (file `katexConstants.json`), it is possible to extract it from KaTeX.
The procedure used to get a list of KaTeX-compatible commands is a bit hacky, and consist of the following:

## Get a raw list

Run `npm install` in this directory, and add the following code at the end of `node_modules/dist/katex.js`, before the webpack export line:

```
const force_export = {
  version: katex.version,
  functions: Object.keys(_functions),
  symbolsMath: Object.keys(symbols.math),
  symbolsText: Object.keys(symbols.text),
  macros: Object.keys(_macros),
};

console.log(JSON.stringify(force_export));
```

Then run any file calling KaTeX, for instance: `node extract.js > constants.json`.

## Merge and deduplicate

The commands contained in the raw `constants.json` file needs to be postprocessed a bit. Three steps are necessary:

- merge commands for functions, symbols and macros;
- deduplicate some commands;
- add some extra commands not listed by KaTeX.

To do this, use the `filer.json` script: `node --experimental-json-modules filter.js > katexConstants.json`.
