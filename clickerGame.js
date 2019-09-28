var programNames = [
  "TextEditor",
  "BlueJ",
  "Notepad++",
  "Netbeans",
  "Sublime Text",
  "Atom",
  "Eclipse",
  "VisualStudio",
  "VisualStudioCode"
],
  prog = 0;
var managerNames = [
  "No Manager",
  "Unskilled Manager",
  "Unexperienced Manager",
  "Professional Manager"
],
  mana = 0;
var workerLevels = [
  "Primary School Pupil",
  "Secondary School Pupil",
  "High School Student",
  "IT-Student",
  "Computer Scientist",
  "Hacker"
],
  work = 0;
var computerNames = [
  "MacBook",
  "Bad Laptop",
  "Gaming Laptop",
  "Gaming PC",
  "High End Gaming PC",
  "Server",
  "Quantum Computer"
],
  comp = 0;
var cpny = 0;
var prices = [
  [10, 100, 1200, 15000, 200000, 1500000, 10000000, 300000000], //Programs
  [50, 75000, 6000000], //Manager
  [500, 8000, 10000, 125000, 1000000], //Worker-Level
  [1000, 5000, 50000, 500000, 1500000, 7000000, 15000000], //Computer
  [20000] //Company
];

var moneyCounter = document.getElementById("moneyCounter"),
  linesOfCodeCounter = document.getElementById("linesOfCodeCounter"),
  workersCounter = document.getElementById("workersCounter");
var money = 0,
  linesOfCode = 0,
  workers = 0;
var linesOfCodePerClick = 1,
  moneyPerLineOfCode = 1,
  linesOfCodePerSell = 5,
  linesOfCodePerWorker = 1,
  workerTick = 1000,
  linesOfCodeSoldPerAutoSell = 0,
  showingError = false;
var debug = false;

//vars for HTML Elements
var progUpCo = document.getElementById("programUpgradeCost").firstElementChild,
  manaUpCo = document.getElementById("managerUpgradeCost").firstElementChild,
  workUpCo = document.getElementById("workerUpgradeCost").firstElementChild,
  compUpCo = document.getElementById("computerUpgradeCost").firstElementChild,
  cpnyUpCo = document.getElementById("companyUpgradeCost").firstElementChild;

setInterval(update, 50);
setInterval(tickAutoSell, 1000);
var mouseIsOnUpgrade = false;
document.onmousemove = function moveTooltip(event) {
  document.getElementById("tooltip").style.left = event.clientX + 10;
  document.getElementById("tooltip").style.top = event.clientY + 10;
}

var loadedImages = [];

window.onload = function () {
  progUpCo.innerHTML = prices[0][prog];
  manaUpCo.innerHTML = prices[1][mana];
  workUpCo.innerHTML = prices[2][work];
  compUpCo.innerHTML = prices[3][comp];
  cpnyUpCo.innerHTML = prices[4][0];

  //preload images
  programNames.forEach(element => {
    let img = new Image();
    img.src = "ressources/clickerGame/icons/programs/" + element + ".png";
    loadedImages.push(img);
  });

  managerNames.forEach(element => {
    let img = new Image();
    img.src = "ressources/clickerGame/icons/manager/" + element + ".png";
    loadedImages.push(img);
  });

  workerLevels.forEach(element => {
    let img = new Image();
    img.src = "ressources/clickerGame/icons/workers/" + element + ".png";
    loadedImages.push(img);
  });

  computerNames.forEach(element => {
    let img = new Image();
    img.src = "ressources/clickerGame/icons/computer/" + element + ".png";
    loadedImages.push(img);
  });
};

function openSettings() {
  document.getElementById("settings").style.display = "inline-block";
  //document.getElementById("saveGameButton").firstElementChild.innerHTML = debug ? "Save Gamestate<br>(Downloads .txt File)" : "Save Gamestate<br>(Browser's Local Storage)";
  //document.getElementById("loadGameButton").firstElementChild.innerHTML = debug ? "Load Gamestate<br>(Drag & drop File here)" : "Load Gamestate<br>(Browser's Local Storage)";
}

function closeSettings() {
  document.getElementById("settings").style.display = "none";
}

var darkMode = false;
function changeStyle() {
  if (darkMode) {
    document.getElementById("styleLink").href = "clicker style-light.css";
    document.getElementById("changeStyleButton").firstElementChild.innerHTML = "Change Theme<br>(Light Mode 🠖 Dark Mode)";
    darkMode = false;
  } else {
    document.getElementById("styleLink").href = "clicker style-dark.css";
    document.getElementById("changeStyleButton").firstElementChild.innerHTML = "Change Theme<br>(Dark Mode 🠖 Light Mode)";
    darkMode = true;
  }
}

function customTooltip(content) {
  document.getElementById("tooltip").firstElementChild.innerHTML = content;
}

var timeoutfunction;
function mouseEntered(obj) {
  mouseIsOnUpgrade = true;
  timeoutfunction = setTimeout(Tooltip, 500, obj);
}

function Tooltip(obj) {
  if (mouseIsOnUpgrade || debug == true) {
    switch (obj) {
      case "programIcon":
        document.getElementById("tooltip").firstElementChild.innerHTML = prog < programNames.length - 1 ? `<strong>Upgrade your Program</strong><br>
        This Upgrade will increase:<br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Lines of Code per Click:</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerClick}</span> ${linesOfCodePerClick == 1 ? "Line" : "Lines"} of Code per Click<br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerClick * 2}</span> Lines of Code per Click<br>
        <span style="color:orange">For each Upgrade: *2</span><br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Money per Line of Code:</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${moneyPerLineOfCode}</span> Money per Line of Code<br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${moneyPerLineOfCode * 2}</span> Money per Lines of Code<br>
        <span style="color:orange">For each Upgrade: *2</span><br>
        <span style="color:#20ee20">Level ${prog + 1}/${programNames.length}</span>` : `Lines of Code per Click right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerClick}</span><br>
        Money per Line of Code right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${moneyPerLineOfCode}</span><br>
        <span style="color:#20ee20">Level ${prog + 1}/${programNames.length}`;
        break;

      case "managerIcon":
        document.getElementById("tooltip").firstElementChild.innerHTML = mana < managerNames.length - 1 ? `<strong>Upgrade your Manager</strong><br>
        This Upgrade will increase:<br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Lines of Code per Product:</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerSell}</span> Lines of Code per Product<br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${Math.ceil(Math.pow(linesOfCodePerSell, 1.5))}</span> Lines of Code per Product<br>
        <span style="color:orange">For each Upgrade: ^1,5</span><br><br>
        <span style="color:#20ee20">Level ${mana + 1}/${managerNames.length}</span>` : `Lines of Code sold per Product right now: <span style="color:red; font-weight:bold">${linesOfCodePerSell}</span><br>
        <span style="color:#20ee20">Level ${mana + 1}/${managerNames.length}`;
        break;

      case "workerIcon":
        document.getElementById("tooltip").firstElementChild.innerHTML = work < workerLevels.length - 1 ? `<strong>Upgrade your Workers</strong><br>
        This Upgrade will increase:<br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Lines of Code per Working-Session:</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerWorker}</span> ${linesOfCodePerWorker == 1 ? "Line" : "Lines"} of Code per Working-Session<br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodePerWorker * 2}</span> Lines of Code per Working-Session<br>
        <span style="color:orange">For each Upgrade: *2</span><br><br>
        <span style="color:#20ee20">Level ${work + 1}/${workerLevels.length}</span>` : `Lines of Code per Working-Session right now: <span style="color:red; font-weight:bold">${linesOfCodePerWorker}</span><br>
        <span style="color:#20ee20">Level ${work + 1}/${workerLevels.length}`;
        break;

      case "computerIcon":
        document.getElementById("tooltip").firstElementChild.innerHTML = comp < computerNames.length - 1 ? `<strong>Upgrade your Workers</strong><br>
        This Upgrade will increase:<br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Time between the Working-Sessions of your Workers</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${workerTick} milliseconds</span><br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${Math.floor(workerTick * 0.85)} milliseconds</span><br>
        <span style="color:orange">For each Upgrade: *0.85</span><br><br>
        <span style="color:#20ee20">Level ${comp + 1}/${computerNames.length}</span>` : `Time between the Working-Sessions of your Workers right now: <span style="color:red; font-weight:bold">${workerTick}</span><br>
        <span style="color:#20ee20">Level ${comp + 1}/${computerNames.length}`;
        break;

      case "companyIcon":
        document.getElementById("tooltip").firstElementChild.innerHTML = `<strong>Upgrade your Company</strong><br>
        This Upgrade will increase:<br><br>
        <span style="color:rgb(9, 9, 139); text-decoration: underline">➤ Lines of Code sold automatically</span><br>
        Right now: <span style="color:rgb(231, 62, 56); font-weight:bold">${linesOfCodeSoldPerAutoSell}</span> per second<br>
        After Upgrade: <span style="color:rgb(231, 62, 56); font-weight:bold">${cpny == 0 ? 10 : Math.ceil(linesOfCodeSoldPerAutoSell * 3)}</span> per second<br>
        <span style="color:orange">${cpny == 0 ? "For the first Upgrade: +10 and for each other *3" : "For every Upgrade: *3"}</span><br>
        <span style="color:#20ee20">You can upgrade this infinite times!</span>`;
        break;

      default:
        console.error("ERROR! The ID of this Element could not be found in order to display its Tooltip!");
        break;
    }
  }
}

function mouseLeft() {
  mouseIsOnUpgrade = false;
  clearTimeout(timeoutfunction);
  document.getElementById("tooltip").firstElementChild.innerHTML = "";
}

function tickWorkers() {
  linesOfCode += workers * linesOfCodePerWorker;
}

function tickAutoSell() {
  if (linesOfCode >= linesOfCodeSoldPerAutoSell) {
    money += linesOfCodeSoldPerAutoSell * moneyPerLineOfCode;
    linesOfCode -= linesOfCodeSoldPerAutoSell;
  }
}

function buyNewProgram(cheat = "no") {
  if (
    prog < programNames.length - 1 &&
    (money >= prices[0][prog] || cheat == "cheat")
  ) {
    if (cheat != "cheat") {
      money -= prices[0][prog];
    }
    linesOfCodePerClick *= 2;
    moneyPerLineOfCode *= 2;
    prog++;
    if (prog < programNames.length - 1) {
      progUpCo.innerHTML = prices[0][prog];
    } else {
      progUpCo.parentElement.innerHTML = "Maxed out";
    }
    document.getElementById("programNow").innerHTML = programNames[prog];
    document.getElementById("programIcon").src =
      "ressources/clickerGame/icons/programs/" + programNames[prog] + ".png";
    Tooltip("programIcon");
  } else {
    error();
  }
}

function buyNewManager(cheat = "no") {
  if (
    mana < managerNames.length - 1 &&
    (money >= prices[1][mana] || cheat == "cheat")
  ) {
    if (cheat != "cheat") {
      money -= prices[1][mana];
    }
    linesOfCodePerSell = Math.ceil(Math.pow(linesOfCodePerSell, 1.5));
    mana++;
    if (mana < managerNames.length - 1) {
      manaUpCo.innerHTML = prices[1][mana];
    } else {
      manaUpCo.parentElement.innerHTML = "Maxed out";
    }
    document.getElementById("managerNow").innerHTML = managerNames[mana];
    document.getElementById("managerIcon").src =
      "ressources/clickerGame/icons/manager/" + managerNames[mana] + ".png";
    Tooltip("managerIcon");
  } else {
    error();
  }
}

function buyNewWorkerLevel(cheat = "no") {
  if (
    work < workerLevels.length - 1 &&
    (money >= prices[2][work] || cheat == "cheat")
  ) {
    if (cheat != "cheat") {
      money -= prices[2][work];
    }
    linesOfCodePerWorker *= 2;
    work++;
    if (work < workerLevels.length - 1) {
      workUpCo.innerHTML = prices[2][work];
    } else {
      workUpCo.parentElement.innerHTML = "Maxed out";
    }
    document.getElementById("workerNow").innerHTML = workerLevels[work];
    document.getElementById("workerIcon").src =
      "ressources/clickerGame/icons/workers/" + workerLevels[work] + ".png";
    Tooltip("workerIcon");
  } else {
    error();
  }
}

var ticksForWorkers = setInterval(tickWorkers, workerTick);
function buyNewComputer(cheat = "no") {
  if (
    comp < computerNames.length - 1 &&
    (money >= prices[3][comp] || cheat == "cheat")
  ) {
    if (cheat != "cheat") {
      money -= prices[3][comp];
    }
    clearInterval(ticksForWorkers);
    workerTick = Math.floor(workerTick * 0.85);
    ticksForWorkers = setInterval(tickWorkers, workerTick);
    comp++;
    if (comp < computerNames.length - 1) {
      compUpCo.innerHTML = prices[3][comp];
    } else {
      compUpCo.parentElement.innerHTML = "Maxed out";
    }
    document.getElementById("computerNow").innerHTML = computerNames[comp];
    document.getElementById("computerIcon").src =
      "ressources/clickerGame/icons/computer/" + computerNames[comp] + ".png";
    Tooltip("computerIcon");
  } else {
    error();
  }
}

function upgradeCompany(cheat = "no") {
  if (money >= prices[4][0] || cheat == "cheat") {
    if (cheat != "cheat") {
      money -= prices[4][0];
    }
    prices[4][0] = Math.floor(Math.pow(prices[4][0], 1.1));
    cpny++;
    if (cpny == 1) {
      linesOfCodeSoldPerAutoSell = 10;
    } else {
      linesOfCodeSoldPerAutoSell = Math.ceil(linesOfCodeSoldPerAutoSell *= 3);
    }

    cpnyUpCo.innerHTML = prices[4][0];

    document.getElementById("companyNow").innerHTML = "Company Level: " + cpny;
    Tooltip("companyIcon");
  } else {
    error();
  }
}

var saveState = {};
var output;
var decrypted;
function saveGame(save = "localStorage") {
  saveState.money = money;
  saveState.linesOfCode = linesOfCode;
  saveState.workers = workers;
  saveState.linesOfCodePerClick = linesOfCodePerClick;
  saveState.linesOfCodePerSell = linesOfCodePerSell;
  saveState.linesOfCodePerWorker = linesOfCodePerWorker;
  saveState.linesOfCodeSoldPerAutoSell = linesOfCodeSoldPerAutoSell;
  saveState.prog = prog;
  saveState.mana = mana;
  saveState.work = work;
  saveState.comp = comp;
  saveState.cpny = cpny;
  saveState.moneyPerLineOfCode = moneyPerLineOfCode;
  saveState.workerTick = workerTick;
  saveState.pricesCpny = prices[4][0];
  saveState.debug = debug;
  saveState.darkMode = darkMode;

  output = JSON.stringify(saveState, undefined, 2);
  output = CryptoJS.AES.encrypt(output, "ClickerGame");

  var today = new Date();

  if (save == "file") {
    var link = document.createElement("a");
    link.download = `ClickerGame SaveState (${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()} - ${today.getHours()}_${today.getMinutes()}).txt`;
    var blob = new Blob([output], { type: "text/plain" });
    link.href = window.URL.createObjectURL(blob);
    link.click();
  } else {
    localStorage.ClickerGameSaveState = output;
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy";
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var reader = new FileReader();

  reader.readAsBinaryString(evt.dataTransfer.files[0]);

  reader.onloadend = function () {
    decrypted = JSON.parse(CryptoJS.AES.decrypt(reader.result, "ClickerGame").toString(CryptoJS.enc.Utf8));
    Object.keys(decrypted).forEach(function (key) {
      window[key] = decrypted[key];
    });
    reloadIconsAndText();
  }
}

var dropZone = document.getElementById("loadGameButton2");
dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("drop", handleFileSelect, false);

function loadGame() {
  decrypted = JSON.parse(CryptoJS.AES.decrypt(localStorage.ClickerGameSaveState, "ClickerGame").toString(CryptoJS.enc.Utf8));
  Object.keys(decrypted).forEach(function (key) {
    if (key != "pricesCpny") {
      window[key] = decrypted[key];
    } else {
      prices[4][0] = decrypted[key];
    }
  });
  reloadIconsAndText();
}

function reloadIconsAndText() {
  //reevaluate Text and icons
  if (prog < programNames.length - 1) {
    progUpCo.innerHTML = prices[0][prog];
  } else {
    progUpCo.parentElement.innerHTML = "Maxed out";
  }
  document.getElementById("programNow").innerHTML = programNames[prog];
  document.getElementById("programIcon").src =
    "ressources/clickerGame/icons/programs/" + programNames[prog] + ".png";

  if (mana < managerNames.length - 1) {
    manaUpCo.innerHTML = prices[1][mana];
  } else {
    manaUpCo.parentElement.innerHTML = "Maxed out";
  }
  document.getElementById("managerNow").innerHTML = managerNames[mana];
  document.getElementById("managerIcon").src =
    "ressources/clickerGame/icons/manager/" + managerNames[mana] + ".png";

  if (work < workerLevels.length - 1) {
    workUpCo.innerHTML = prices[2][work];
  } else {
    workUpCo.parentElement.innerHTML = "Maxed out";
  }
  document.getElementById("workerNow").innerHTML = workerLevels[work];
  document.getElementById("workerIcon").src =
    "ressources/clickerGame/icons/workers/" + workerLevels[work] + ".png";

  if (comp < computerNames.length - 1) {
    compUpCo.innerHTML = prices[3][comp];
  } else {
    compUpCo.parentElement.innerHTML = "Maxed out";
  }
  document.getElementById("computerNow").innerHTML = computerNames[comp];
  document.getElementById("computerIcon").src =
    "ressources/clickerGame/icons/computer/" + computerNames[comp] + ".png";

  cpnyUpCo.innerHTML = prices[4][0];

  document.getElementById("companyNow").innerHTML = "Company Level: " + cpny;
  darkMode = !darkMode;
  changeStyle();
}

function update() {
  moneyCounter.innerHTML = money;
  linesOfCodeCounter.innerHTML = linesOfCode;
  workersCounter.innerHTML = workers;
  if (prog == programNames.length - 1) {
  } else if (money >= prices[0][prog]) {
    progUpCo.style.backgroundColor = "rgba(20,200,50,0.5)";
  } else {
    progUpCo.style.backgroundColor = "rgba(230,20,20,0.5)";
  }

  if (mana == managerNames.length - 1) {
  } else if (money >= prices[1][mana]) {
    manaUpCo.style.backgroundColor = "rgba(20,200,50,0.5)";
  } else {
    manaUpCo.style.backgroundColor = "rgba(230,20,20,0.5)";
  }

  if (work == workerLevels.length - 1) {
  } else if (money >= prices[2][work]) {
    workUpCo.style.backgroundColor = "rgba(20,200,50,0.5)";
  } else {
    workUpCo.style.backgroundColor = "rgba(230,20,20,0.5)";
  }

  if (comp == computerNames.length - 1) {
  } else if (money >= prices[3][comp]) {
    compUpCo.style.backgroundColor = "rgba(20,200,50,0.5)";
  } else {
    compUpCo.style.backgroundColor = "rgba(230,20,20,0.5)";
  }

  if (money >= prices[4][0]) {
    cpnyUpCo.style.backgroundColor = "rgba(20,200,50,0.5)";
  } else {
    cpnyUpCo.style.backgroundColor = "rgba(230,20,20,0.5)";
  }
}

function error() {
  if (showingError) {
  } else {
    showingError = true;
    document.getElementById("error").style.display = "block";
    setTimeout(reset, 500);
  }
}

function reset() {
  showingError = false;
  document.getElementById("error").style.display = "none";
}

function changeMoney(amount) {
  money += amount;
}

function changeLinesOfCode(amount) {
  linesOfCode += amount;
}

function changeWorkers(amount) {
  workers += amount;
}

function hireWorker() {
  if (money >= 10000) {
    workers++;
    money -= 10000;
  }
}

function sellCode() {
  if (linesOfCode >= linesOfCodePerSell) {
    money += linesOfCodePerSell * moneyPerLineOfCode;
    linesOfCode -= linesOfCodePerSell;
  }
}

function writeCode() {
  linesOfCode += linesOfCodePerClick;
}
