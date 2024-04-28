const settingsBar = document.querySelector('.settingsBAR');
const settingsBtn = document.querySelector('.settingsBTN');

function nav() {
    if(document.querySelector('.settingsBAR').classList.contains('hidden')){
        document.querySelector('.settingsBAR').classList.remove('hidden')
    } else {
        document.querySelector('.settingsBAR').classList.add('hidden')
    }

    

}

