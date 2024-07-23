const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const htmlMinifier = require('html-minifier').minify;

const viewsDir = path.join(__dirname, '../views');
const outputDir = path.join(__dirname, '../dist');

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true
};

if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

fs.readdir(viewsDir, (err, files) => {
  if (err) {
    console.error('Error reading views directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.ejs') {
      const filePath = path.join(viewsDir, file);
      const outputFilePath = path.join(outputDir, path.basename(file, '.ejs') + '.html');

      ejs.renderFile(filePath, {}, (err, html) => {
        if (err) {
          console.error('Error rendering EJS file:', err);
          return;
        }

        const minifiedHtml = htmlMinifier(html, minifyOptions);

        fs.writeFile(outputFilePath, minifiedHtml, (err) => {
          if (err) {
            console.error('Error writing HTML file:', err);
            return;
          }

          console.log(`Rendered and minified ${file} to ${outputFilePath}`);
        });
      });
    }
  });
});
