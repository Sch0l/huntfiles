const fileContainer = document.querySelector('.files');
const searchBar = document.querySelector('.searchbar');
const navBar = document.querySelector('navbar');

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

fetch("/json/files.json")
    .then((response) => response.json())
    .then((files) => {
        files.forEach((file) => {
            const fileEl = document.createElement('div');
            fileEl.className = "file";
            fileEl.innerHTML = `<img src="${"../assets/imgs/g/" + file.img}" /><div class="overlay"><span class="fileName">${file.name}</span>`;

            fileContainer.appendChild(fileEl);


            fileEl.onclick = (e) => {
                    var url = `${"../assets/g/" + file.link}`
                    var win = window.open();
                    win.document.body.style.margin = '0';
                win.document.body.style.height = '100vh';
                var iframe = win.document.createElement('iframe');
                 iframe.style.border = 'none';
                 iframe.style.width = '100%';
                 iframe.style.height = '100%';
                 iframe.style.margin = '0';
                 iframe.src = url;
                 win.document.body.appendChild(iframe);

             }
        })
    })

function requestGame() {
    var url = "https://forms.gle/BZSMU46ZVqM54SRGA";
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    win.document.head.innerHTML = `<title>Dashboard</title><br><link rel="icon" type="image/x-icon" href="https://assets.huntfiles.tech/imgs/canvas-logo.ico">`
    win.document.body.appendChild(iframe);
}
