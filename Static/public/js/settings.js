function setPageTitle() {
    document.title = document.querySelector('.settitle').value
    window.localStorage.setItem("pageTITLE", document.querySelector('.settitle').value);
}


function setFavicon() {
    document.querySelector("link[rel*='icon']").href = document.querySelector('.seticon').value;
    window.localStorage.setItem("pageICON", document.querySelector('.seticon').value);
}

window.onload = function() {
    if(!window.localStorage.getItem("pageTITLE")) {
        window.localStorage.setItem("pageTITLE", 'Huntfiles')
    }
    if(!window.localStorage.getItem("pageICON")) {
        window.localStorage.setItem("pageICON", 'https://assets.huntfiles.tech/imgs/png.png')
    }
    const pgTITLE = window.localStorage.getItem("pageTITLE")
    console.log(window.localStorage.getItem("pageTITLE"));
    document.title = pgTITLE;
    const pgicon = window.localStorage.getItem("pageICON");
    document.querySelector("link[rel*='icon']").href = pgicon
    console.log(window.localStorage.getItem("pageICON"))
}