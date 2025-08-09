<h1 align="center">microsoft-minutes</h1>

This is a convenient static webpage for the MTC council to keep track of meetings, events, documentation, and deadlines. We're using [StackEdit](https://stackedit.io) to quickly create Markdown documentation in-browser and to push to this repo. It's open-source and free, and has this amazing connection to push directly to any GitHub repo you have access to push to.

## How to push to this repo?
1. Request access to any one of the collaborators for your GitHub account.
2. Create your Markdown documentation on [StackEdit](https://stackedit.io/app).
3. Once you're done creating, click on the ![StackEdit](README-stackedit.png) StackEdit icon on the top-right, and click on "Publish". Add your GitHub account if not already done. Click on "Publish to GitHub".
4. You will see a pop-up with 4 input fields. Enter the following details:

   |Input Field|Input|
   |--|--|
   |Repository URL|https://github.com/vennby/microsoft-minutes|
   |File path|(see below)|
   |Branch|main|
   |Template|Plain text|

   For the file path, depending on your document type, follow one of the formats listed below. Always ensure to include a foldername at the start.

   |Content Type|File path format to use|Example
   |--|--|--|
   |Meeting Minutes|`minutes/TEAMNAME-YYYY-MM-DD.md`|`minutes/devops-2025-07-28.md`|
   |Any other documentation|`FOLDERNAME/FILENAME.md`|`events/PowerPy.md`|

> [!NOTE]
> `TEAMNAME` can be one of the following: `core`, `creative`, `devops`, `events`, `marketing`, `outreach`, `sandbox`, `technical`

5. Click OK.

Done! You can see your changes reflect on the [website](https://vennby.github.io/microsoft-minutes).

## How it works
The website uses the GitHub public API to fetch all Markdown files in this repo,
and renders them using [Marked](https://marked.js.org/).
