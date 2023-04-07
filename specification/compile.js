import process from "node:process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { micromark } from "micromark";
import template from "./template.js";

const zmdRootDirectory = process.argv.pop();
const zmdPackagesDirectory = join(zmdRootDirectory, "/packages");

readdir(zmdPackagesDirectory)
  .then(dirs => {
    const ps = dirs.map(dir => readdir(join(zmdPackagesDirectory, dir)))

    return Promise.all(ps)
      .then(ds => ds
        .reduce((acc, cur, i) => {
          if (cur.includes("specs")) {
            acc.push(join(zmdPackagesDirectory, dirs[i], "specs", "extension.md"))
          }

          return acc
        }, []))
  })
  .then(fss => fss.map(f => readFile(f, { encoding: "utf8" })))
  .then(ps => Promise.all(ps))
  .then(raws => raws.map(micromark))
  .then(parsed => template(parsed.reduce((acc, cur) => acc.concat(cur), "")))
  .then(f => writeFile("./specification.html", f, { encoding: "utf8" }))
