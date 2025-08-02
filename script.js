const repo = "vennby/microsoft-minutes";
const apiBase = `https://api.github.com/repos/${repo}/contents/`;

/**
 * rawData has the following structure:
 * ```
 * {
 *     "dirName1": [
 *         { date: "...", content: "..." },
 *         // ...
 *     ],
 *     "dirName2": [
 *         { date: "...", content: "..." },
 *         // ...
 *     ],
 *     // ...
 * } */
let rawData = {};
let selectedDirName = "minutes";
let currentSort = "desc";

const searchBox = document.getElementById("searchBox");
const sortOrder = document.getElementById("sortOrder");
const container = document.getElementById("content");
const dirNamesContainer = document.getElementById("dirNames");

/**
 * Fetches all dirs and files in the repo, and stores them into {@link rawData}.
 * Subsequently, it is passed to the {@link render} function. */
async function fetchTree() {
    const rawDataNew = {};

    // first, list all dirs in the root of the repo.
    const repoRoot = await fetch(apiBase).then(r => r.json());
    const dirs = repoRoot.filter((entry) => entry.type == "dir");

    // for each dir...
    for (const dir of dirs) {
        const dirName = dir.name;
        const contentByTeam = {};
        const files = await fetch(dir.url).then(r => r.json());

        // for each file in this dir...
        for (const file of files) {
            if (!file.name.endsWith(".md")) continue;
            const rawMd = fetch(file.download_url).then(r => r.text());

            // special handling for "minutes/", by categorizing based on "team".
            if (dirName == "minutes") {
                const match = file.name.match(/^([^-]+)-(\d{4}-\d{2}-\d{2})\.md$/);
                if (!match) continue;

                const team = match[1];
                const date = match[2];

                if (!contentByTeam[team]) contentByTeam[team] = [];
                contentByTeam[team].push({ date: date, content: await rawMd });

            // for other dirs, just create one category as the name of the dir.
            } else {
                if (!contentByTeam[dirName]) contentByTeam[dirName] = [];
                contentByTeam[dirName].push({ date: file.name, content: await rawMd });
            }
        }

        rawDataNew[dirName] = contentByTeam;
    }

    rawData = rawDataNew;

    render(rawData);
}

/**
 * Takes the given {@link rawData} and renders it onto the page, categorized
 * into teams. Additionally, the directory names are presented as clickable
 * buttons on the top of the page, such that only one dir is shown at a time.
 * @param {*} data the {@link rawData} (or a filtered version of it) */
function render(data) {
    // populate list of dir names at the top
    const dirNames = document.createDocumentFragment();
    for (const dirName in data) {
        const dirNameElement = document.createElement("div");
        dirNameElement.textContent = `${dirName}/`;
        dirNameElement.classList.add("dir-name");

        if ((dirName == selectedDirName) || (selectedDirName == null)) {
            dirNameElement.classList.add("active");
            selectedDirName = dirName; // auto-select the first dir
        }

        // update the global selectedDirName whenever THIS element is clicked
        dirNameElement.onclick = () => {
            selectedDirName = dirName;
            filterAndRender();
        }

        dirNames.appendChild(dirNameElement);
    }
    dirNamesContainer.replaceChildren(dirNames);

    const contents = document.createDocumentFragment();
    const selectedDir = data[selectedDirName];
    // for each team/category in the selected dir...
    for (const team in selectedDir) {
        const section = document.createElement("div");
        section.className = "team-section";

        const header = document.createElement("h2");
        header.textContent = team.charAt(0).toUpperCase() + team.slice(1);
        section.appendChild(header);

        // add all meetings under the team heading, sorted.
        let meetings = [...selectedDir[team]];
        meetings.sort((a, b) => currentSort === "desc"
            ? b.date.localeCompare(a.date)
            : a.date.localeCompare(b.date)
        );

        meetings.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.className = "meeting-entry";

            const title = document.createElement("div");
            title.className = "header";
            title.innerHTML = `${entry.date} <span>➕</span>`;
            entryDiv.appendChild(title);

            const contentDiv = document.createElement("div");
            contentDiv.className = "content";
            contentDiv.innerHTML = marked.parse(entry.content, {breaks: true});
            entryDiv.appendChild(contentDiv);

            title.onclick = () => {
                entryDiv.classList.toggle("open");
                const icon = title.querySelector("span");
                icon.textContent = entryDiv.classList.contains("open") ? "➖" : "➕";
            };

            section.appendChild(entryDiv);
        });

        contents.appendChild(section);
    }

    container.replaceChildren(contents);
    document.getElementById("loader").classList.add("hidden");
    container.classList.remove("hidden");
}

/**
 * Displays only the categories that have meetings which contain the given
 * search keyword. {@link render} is called. */
function filterAndRender() {
    const keyword = searchBox.value.trim().toLowerCase();
    const filteredDirs = {};

    for (const dirName in rawData) {
        const teams = rawData[dirName];

        const filtered = {};
        for (const team in teams) {
            const matches = teams[team].filter(m =>
                m.content.toLowerCase().includes(keyword)
                || m.date.toLowerCase().includes(keyword)
            );
            if (matches.length > 0) filtered[team] = matches;
        }

        filteredDirs[dirName] = filtered;
    }

    render(filteredDirs);
}

searchBox.addEventListener("input", filterAndRender);
sortOrder.addEventListener("change", e => {
    currentSort = e.target.value;
    filterAndRender();
});

fetchTree();
