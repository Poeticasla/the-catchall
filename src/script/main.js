const themeToggle = document.getElementById("theme-toggle");

const getStoredTheme = () => localStorage.getItem("theme") || "dark";
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

const updateUI = (theme) => {
  document.documentElement.setAttribute("data-bs-theme", theme);
};

let currentTheme = getStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    setStoredTheme(currentTheme);
    updateUI(currentTheme);
  });
}

document.addEventListener("astro:after-swap", () => {
  const theme = getStoredTheme();
  updateUI(theme);
});

const shareBtn = document.querySelector("#shareBtn");
const shareText = document.querySelector("#shareText");

const title = document.title;
const url = window.location.href;

shareBtn?.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: `Baca tulisan ini di The Catchall: ${title}`,
        url: url,
      });
    } catch (err) {
      console.log("Batal berbagi");
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      shareText.innerText = "Link tersalin!";
      shareBtn.classList.replace("btn-outline-dark", "btn-dark");

      setTimeout(() => {
        shareText.innerText = "Bagikan Tulisan";
        shareBtn.classList.replace("btn-dark", "btn-outline-dark");
      }, 2000);
    } catch (err) {
      alert("Gagal menyalin link");
    }
  }
});
