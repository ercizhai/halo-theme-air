let prevScrollPos = window.scrollY;

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const currentScrollPos = window.scrollY;

  if (header) {
    if (prevScrollPos > currentScrollPos) {
      header.classList.remove("header-hidden");
    } else {
      header.classList.add("header-hidden");
    }
  }

  prevScrollPos = currentScrollPos;
});
