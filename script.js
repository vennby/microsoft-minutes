const repo = "vennby/microsoft-minutes";
const path = "minutes";
const api = `https://api.github.com/repos/${repo}/contents/${path}`;
let rawData = {};
let currentSort = "desc";

const searchBox = document.getElementById("searchBox");
const sortOrder = document.getElementById("sortOrder");

async function fetchMinutes() {
    const res = await fetch(api);
    const files = await res.json();
    const contentByTeam = {};

    for (const file of files) {
        if (!file.name.endsWith(".md")) continue;

        const match = file.name.match(/^([^-]+)-(\d{4}-\d{2}-\d{2})\.md$/);
        if (!match) continue;

        const team = match[1];
        const date = match[2];

        const rawMd = await fetch(file.download_url).then(r => r.text());

        if (!contentByTeam[team]) contentByTeam[team] = [];
        contentByTeam[team].push({ date, content: rawMd });
    }

    rawData = contentByTeam;
    render(contentByTeam);
}

function render(data) {
    const container = document.getElementById("content");
    container.innerHTML = '';
    document.getElementById("loader").classList.add("hidden");

    for (const team in data) {
        const section = document.createElement("div");
        section.className = "team-section";

        const header = document.createElement("h2");
        header.textContent = team.charAt(0).toUpperCase() + team.slice(1);
        section.appendChild(header);

        let meetings = [...data[team]];
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
            contentDiv.innerHTML = marked.parse(entry.content);
            entryDiv.appendChild(contentDiv);

            title.onclick = () => {
                entryDiv.classList.toggle("open");
                const icon = title.querySelector("span");
                icon.textContent = entryDiv.classList.contains("open") ? "➖" : "➕";
            };

            section.appendChild(entryDiv);
        });

        container.appendChild(section);
    }

    container.classList.remove("hidden");
}

function filterAndRender() {
    const keyword = searchBox.value.toLowerCase();
    const filtered = {};

    for (const team in rawData) {
        const matches = rawData[team].filter(m =>
            m.content.toLowerCase().includes(keyword)
            || m.date.includes(keyword)
        );
        if (matches.length > 0) filtered[team] = matches;
    }

    render(filtered);
}

searchBox.addEventListener("input", filterAndRender);
sortOrder.addEventListener("change", e => {
    currentSort = e.target.value;
    filterAndRender();
});

fetchMinutes();
