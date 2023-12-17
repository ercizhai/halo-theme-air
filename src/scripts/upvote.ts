function getUpvotedNames() {
  return JSON.parse(localStorage.getItem("halo.upvoted.post.names") || "[]") as string[];
}

function activateUpvote() {
  const upvoteIcon = document.getElementById("upvote-icon");
  upvoteIcon.classList.remove("i-ri-thumb-up-line");
  upvoteIcon.classList.add("i-ri-thumb-up-fill");
  upvoteIcon.parentElement.classList.add("text-red-500", "border-red-500", "dark:border-red-500");
}

function isUpvoted(name: string) {
  return getUpvotedNames().includes(name);
}

function getPostName() {
  const upvoteContainer = document.getElementById("upvote-container");
  return upvoteContainer.dataset["postName"];
}

export function initUpvote() {
  const name = getPostName();
  if (!isUpvoted(name)) return;
  activateUpvote();
}

export function upvote() {
  const name = getPostName();
  if (isUpvoted(name)) return;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/apis/api.halo.run/v1alpha1/trackers/upvote");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    const upvotedNames = [...getUpvotedNames(), name];
    localStorage.setItem(`halo.upvoted.post.names`, JSON.stringify(upvotedNames));

    const upvoteCount = document.getElementById("upvote-count");

    if (!upvoteCount) return;

    const count = parseInt(upvoteCount.textContent || "0");
    upvoteCount.textContent = count + 1 + "";
    activateUpvote();
  };
  xhr.onerror = function () {
    alert("网络请求失败，请稍后再试");
  };
  xhr.send(
    JSON.stringify({
      group: "content.halo.run",
      plural: "posts",
      name: name,
    })
  );
}
