The script was originally made to debug LaTeX issues. To make it work, you will need to install the [LaTeX template](https://github.com/zestedesavoir/latex-template) on your computer and launch the  [ZMarkdown server](https://github.com/zestedesavoir/zmarkdown).

As an example of use, in order to make a PDF document from a raw archive, unzip the archive in the current directory, and run:

```bash
node main.js --endpoint=latex-document ${ARCHIVE_DIRECTORY} > ${LATEX_FILE}
latexmk -interaction=nonstopmode -pdflatex=lualatex -shell-escape -pdf ${LATEX_FILE}
```
