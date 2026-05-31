const texts =[
    "Back End Developer",
    "Fundamental Front End Skills",
    "Full Stack Development in Progress"
];

let index = 0;
const el = document.getElementById("rotating-text");

function changeText() {
    el.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % texts.length;
        el.textContent = texts[index];
        el.style.opacity = 1;
    }, 500);
}

setInterval(changeText, 2000)