document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('contextmenu', event => alert("You are not allowed to view the code for this webpage."));
document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        window.alert("You are not allowed to view the code for this webpage.");
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        window.alert("You are not allowed to view the code for this webpage.");
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        window.alert("You are not allowed to view the code for this webpage.");
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        window.alert("You are not allowed to view the code for this webpage.");
        return false;
    }
    if (event.ctrlKey && (event.key === "S" || event.key === "s")) {
        event.preventDefault();
        window.alert("You are not allowed to view the code for this webpage.");
    }
} 
