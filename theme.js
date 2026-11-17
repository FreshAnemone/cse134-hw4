const btn = document.getElementById("theme-toggle");

try {
    btn.ariaPressed = localStorage.getItem("dark-theme") === "true";
} catch {} 

btn.onclick = () => {
    btn.ariaPressed = btn.ariaPressed !== "true";
    try {
        localStorage.setItem("dark-theme", btn.ariaPressed);
    } catch {}
};

btn.hidden = false;