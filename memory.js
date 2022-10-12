let score = {
  eazy: [
    {
      name: "",
      skore: "",
    },
  ],
  medium: [
    {
      name: "",
      skore: "",
    },
  ],
  hard: [
    {
      name: "",
      skore: "",
    },
  ],
};

let databasescore = localStorage.getItem("dataScore");
let btntambah = document.querySelector(".btn-tambah");
// localStorage.clear();

if (databasescore !== null) {
  databasescore = JSON.parse(databasescore);

  //   btntambah.addEventListener("click", () => {
  //     let newS = {
  //       nama: "oko",
  //       score: 150,
  //       id: "okogi",
  //     };

  //     databasescore.eazy.push(newS);
  //     console.log(databasescore);
  //   });
  console.log(databasescore);
} else {
  let installpage = document.querySelector(".install");
  let btnInstall = document.querySelector(".btn-install-game");

  installpage.classList.toggle("d-none");

  btnInstall.addEventListener("click", () => {
    newscore = JSON.stringify(score);
    install(newscore);
    window.location("./index.html");
  });
}

function install(score) {
  localStorage.setItem("dataScore", score);
}
