async function isBlocked(url) {
    try {
        var README = await fetch(url + "README.md");
        var content = await README.text();
        if (content.startsWith("# HuntOfficial")) {
            return false;
        } else {
            return true;
        }
    } catch {
        return true;
    }
}

async function getCDNS(cdns) {
    for (let cdn of cdns) {
        var blocked = await isBlocked('cdn');
        if (!blocked) {
            return cdn;
        }

    }
    return cdns[0];
}

const cdn = window.localStorage.getItem(cdn);

if (!cdn) {
    fetch("/json/files.json")
        .then((res) => res.json())
        .then(async (cdns) => {
            window.localStorage.setItem('cdn', await getCDNS(cdns));
            location.reload();
        })
}

