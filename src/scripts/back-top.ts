window.addEventListener("scroll", () => {
  const backTopBtn = document.getElementById("back-top-btn");
  if (!backTopBtn) return;
  if (window.scrollY > 0) {
    backTopBtn.classList.remove("hidden");
  } else {
    backTopBtn.classList.add("hidden");
  }
});

export function backTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
