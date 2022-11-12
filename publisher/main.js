import process from "node:process";
import { basename, join } from "node:path";
import { readFile } from "node:fs/promises";
import { request } from "node:http";

const zmdServerBaseUrl = "http://localhost:27272/";
const zmdFullUrl = new URL(zmdServerBaseUrl);
zmdFullUrl.pathname = "html";

const { argv } = process;
const currentDirectory = basename(process.cwd());
const contentDirectory = argv.pop();

argv.forEach(arg => {
	if(arg.startsWith("--endpoint=")) zmdFullUrl.pathname = arg.split("=")[1];
});

const manifestFilename = "manifest.json";
const manifestFullpath = join(contentDirectory, manifestFilename);
const manifestContent = await readFile(manifestFullpath, { encoding: "utf-8" })
	.then(manifestRaw => JSON.parse(manifestRaw));

let replacePromises = new Array();

function replaceFilepathByContent(children) {
	children.forEach(child => {
		for(let e of ["introduction", "text", "conclusion"]) {
			if(child[e]) {
				const fileFullpath = join(contentDirectory, child[e]);
				const filePromise = readFile(fileFullpath, { encoding: "utf-8" })
					.then(fileContent => child[e] = fileContent);

				replacePromises.push(filePromise);
			}
		}

		// Recursive function: process element's children
		if(child.children) replaceFilepathByContent(child.children);
	})
}

// Start recursion at top-level manifest
replaceFilepathByContent([manifestContent]);
await Promise.all(replacePromises);

let zmdResponse = "";

const req = request(zmdFullUrl, {
	method: "POST",
	headers: {
		"Content-Type": "application/json"
	}
}, res => {
	res.on("data", (chunk) => {
		zmdResponse += chunk;
	});

	res.on("end", () => {
		let [content, metadata, errors] = JSON.parse(zmdResponse);

		console.log(content);
	});
});

req.write(JSON.stringify({
	md: manifestContent,
	opts: {
		content_type: "small",
		title: manifestContent.title,
		authors: ["undefined"],
		license: manifestContent.licence,
		license_directory: "/tmp/zmd",
		smileys_directory: join(currentDirectory, "/smileys"),
		images_download_dir: "/tmp/zmd/images",
		heading_shift: -1,
	},
}));

req.end();
