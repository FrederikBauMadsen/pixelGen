export default function applyBorder() {
  let divs = document.getElementsByClassName(
    "pixel"
  ) as HTMLCollectionOf<HTMLDivElement>;
  for (const element of divs) {
    if (element.style.border === "none") {
      element.style.border = "1px solid rgba(0, 0, 0, .3)";
    } else {
      element.style.border = "none";
    }
  }
}
