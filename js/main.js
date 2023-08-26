// Variables Start

const navBar = document.querySelector('.navbar');
const searchBar = document.querySelector(".searchbar");
const fileContainer = document.querySelector(".files");

const fileDisplay = document.querySelector(".filecontainer");

const backButton = document.querySelector(".back");
const fullScreen = document.querySelector(".fullscreen");
const fileBarname = document.querySelector(".fileBarName");
const fileTitle = document.querySelector(".fileTitle");
const fileIMG = document.querySelector(".fileIMG");
const playButton = document.querySelector(".playBUTTON");
const gobackButton = document.querySelector(".goback");

// Variables End


// Searchbar Start

searchBar.addEventListener('input', (e) => {
    const query = searchBar.value.trim().toLowerCase();


    for (let file of fileContainer.children) {
        if (file instanceof Element) {
            if (query) {
                const fileName = file.querySelector('span').innerText.trim().toLowerCase();

                if (fileName.includes(query)) {
                    file.classList.remove('hidden');
                } else {
                    file.classList.add('hidden');
                }
            } else {
                file.classList.remove('hidden')
            }
        }
    }
});


// Searchbar End

// File Handler Start


fetch("/json/files.json")
    .then((response) => response.json())
    .then((files) => {
        files.forEach((file) => {
            const fileEl = document.createElement('div');
            fileEl.className = "file";
            fileEl.innerHTML = `<img src="${"https://gitloaf.com/gitcfcdn/HuntGamesOfficial/assets/main/" + file.root + "/" + file.logo}" /><span class="fileName">${file.name}</span>`;

            fileContainer.appendChild(fileEl);

            console.log(`${file.name + " " + file.root}`)

            fileEl.onclick = (e) => {
                fileContainer.classList.add('hidden');
                searchBar.classList.add('hidden');
                navBar.classList.add('hidden');

                fileDisplay.classList.remove('hidden');
                document.querySelector('.playFILE').classList.remove('hidden');

                fileBarname.innerText = `${file.name}`;

                fileIMG.src = `${"https://gitloaf.com/gitcfcdn/HuntGamesOfficial/assets/main/" + file.root + "/" + file.logo}`;
                fileTitle.innerText = `${file.name}`;

                playButton.onclick = (e) => {
                    document.querySelector('.playFILE').classList.add('hidden');
                    fileDisplay.querySelector(
                        "iframe"
                    ).src = `${"https://gitloaf.com/gitcfcdn/HuntGamesOfficial/assets/main/" + file.root + "/" + file.file}`
                    document.querySelector('.fileBar').classList.remove('hidden');
                }

                gobackButton.onclick = (e) => {
                    document.querySelector('.playFILE').classList.add('hidden');
                    fileContainer.classList.remove('hidden');
                    searchBar.classList.remove('hidden');
                    navBar.classList.remove('hidden');
                }
            }

            backButton.onclick = (e) => {
                fileContainer.classList.remove('hidden');
                searchBar.classList.remove('hidden');
                navBar.classList.remove('hidden');
                document.querySelector('.fileBar').classList.add('hidden');
                document.querySelector('.playFILE').classList.remove('hidden');

                fileDisplay.classList.add('hidden');

                fileBarname.innerText = "";

                fileDisplay.querySelector(
                    "iframe"
                ).src = "";
            }


            const toggleFullScreen = () => {
                fileDisplay.querySelector('.fileFrame').requestFullscreen();
            }

            fullScreen.onclick = (e) => {
                toggleFullScreen();
            }
        })
    })

// File Handler End

const lightmodeswitch = document.querySelector('.switch');

// function toggleLightMode() {

// }


