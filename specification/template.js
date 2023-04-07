export default function(content) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zeste de Savoir Flavored Markdown</title>
  <style>
    body {
      margin: 2em 20%;
    }

    h1 {
      text-align: center;
    }
    
    pre {
      background-color: #D1E3EB;
      width: calc(50% - 1pt - 1em - 1px);
      display: inline-block;
      margin: 0;
      white-space: pre-line;
      vertical-align: top;
      padding: .5em;
      font-size: 1.2em;
    }
    
    pre + pre {
      background-color: #F8E6C4;
    }
  </style>
</head>
<body>
<h1>Zeste de Savoir Flavored Markdown</h1>

<p>This document is the Zeste de Savoir Flavored Markdown specification, intended to be a collection of extensions to the well-known <a href="https://github.github.com/gfm/">Github Flavored Markdown</a>.

${content}

</body>
</html>
`
}