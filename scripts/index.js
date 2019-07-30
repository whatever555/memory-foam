#! /usr/bin/env node
//var shell = require("shelljs");
var mkdirp = require("mkdirp");

var getDirName = require("path").dirname;

//shell.exec("yarn build");
//shell.exec("yarn export");

console.log("When this is complete run 'cordova run browser'");
var fs = require("fs");
var newCordobaJsFile;
fs.readFile("out/index.html", function(err, buf) {
  var nextHtml = buf.toString();
  var jsRegex = /href=\"\/\_next.*?\"/g;
  var match = jsRegex.exec(nextHtml);

  var nextJsDump = "";
  while (match != null) {
    const jsFilePath = match[0]
      .replace('href="/', "")
      .replace('"', "")
      .replace("_", "out/_");
    nextJsDump += fs.readFileSync(jsFilePath).toString();
    match = jsRegex.exec(nextHtml);
  }

  jsRegex2 = /src=\"\/\_next.*?js\"/g;
  match = jsRegex2.exec(nextHtml);
  while (match != null) {
    const jsFilePath = match[0]
      .replace('src="/', "")
      .replace('"', "")
      .replace("_", "out/_");
    nextJsDump += fs.readFileSync(jsFilePath).toString();
    match = jsRegex2.exec(nextHtml);
  }

  newCordobaJsFile = fs
    .readFileSync(
      "./node_modules/next-cordova-exporter/templates/cordova/index.js"
    )
    .toString()
    .replace("---NEXT_JS---", nextJsDump);

  writeFile("www/js/index.js", newCordobaJsFile, function(err) {
    if (err) throw err;
    console.log("Saved new js!");
  });

  nextHtml = nextHtml.replace(jsRegex, "");
  nextHtml = nextHtml.replace(jsRegex2, "");
  const cordovaInjectHead = `
    <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script><meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">        
  `;
  nextHtml = nextHtml.replace("<head>", "<head>" + cordovaInjectHead);

  const cordovaInjectHtml = `
<div class="app">
  `;
  nextHtml = nextHtml.replace("</body>", cordovaInjectHtml + "</body>");

  writeFile("www/index.html", nextHtml, function(err) {
    if (err) throw err;
    console.log("Saved new html!");
  });
});

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function(err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}
