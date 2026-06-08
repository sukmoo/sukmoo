let scene = 0;

let startImg1;
let startImg2;
let secondImg1;
let secondImg2;
let helpImg1;
let helpImg2;
let helpImg3;
let finalImg;
let finalImg2;
let endingImg;

let bg;
let imgs = {};
let clothes = [];
let target;
let dragging = null;

let score = 0;
let timeLeft = 30;
let gameOver = false;
let gameClear = false;
let gameStartTime = 0;

let wrongMessage = "";
let wrongMessageTimer = 0;

let gameFont;

const baseW = 1280;
const baseH = 853;

const basket = { x: 250, y: 600, w: 250, h: 200 };


////222
let sortBgImage;
let sortClothesImages = [];
let staffCryImage;
let staffSuccessImage;
let sortItems = [];
let draggedItem = null;
let categoryBoxes = [];

let errorMessage = "";
let errorTimer = 0;

let sortTimeLeft = 30;
let lives = 3;
let lastSecond;
let sortGameOver = false;
let sortCleared = false;

// ==============================
// 세번째 게임 전역 변수 시작
// ==============================
let thirdImgs = {};
let thirdScore, thirdGoal, thirdFlyers, thirdTLeft, thirdGameState;
let thirdPersons, thirdFlierObjs, thirdEffects, thirdSparks;
let thirdSpawnT, thirdSpawnI;
let thirdBossX, thirdBossY, thirdBossDir, thirdBossMode, thirdBossTimer, thirdBossNextT;
let thirdPressing, thirdPressT, thirdPressAimX, thirdPressAimY;
let thirdCombo, thirdAlbaX, thirdAlbaY, thirdLastMillis;

const THIRD_GROUND = () => height * 0.88;
function THIRD_CW() { return height * 0.22; }
function THIRD_CH() { return height * 0.32; }
function THIRD_CM() { return THIRD_CH() / 2; }

const THIRD_PTYPES = [
  { id:'norm', label:'행인',    emoji:'🚶', col:'#555',    hitR:55, spd:90,  val:1, bad:false, dodge:0.05 },
  { id:'fast', label:'직장인', emoji:'💼', col:'#1D4FD8', hitR:48, spd:170, val:1, bad:false, dodge:0.25 },
  { id:'old',  label:'할아버지',emoji:'👴', col:'#A07040', hitR:60, spd:40,  val:1, bad:false, dodge:0.35 },
  { id:'fam',  label:'가족',   emoji:'👨‍👩‍👧', col:'#1E965A', hitR:75, spd:75, val:3, bad:false, dodge:0.00 },
  { id:'bad',  label:'진상',   emoji:'😤', col:'#E04060', hitR:52, spd:100, val:0, bad:true, dodge:0.00 },
  { id:'vip',  label:'VIP',    emoji:'💎', col:'#C8A020', hitR:48, spd:130, val:2, bad:false, dodge:0.30 },
  { id:'kid',  label:'꼬마',   emoji:'🧒', col:'#F59E0B', hitR:40, spd:145, val:1, bad:false, dodge:0.55 }
];
// ==============================
// 세번째 게임 전역 변수 끝
// ==============================

function preload() {  
  gameFont = loadFont("assets/Jua-Regular.ttf");


  startImg1 = loadImage("assets/시작화면 1.png");
  startImg2 = loadImage("assets/시작화면 2.png");

  secondImg1 = loadImage("assets/두번째 화면 1.png");
  secondImg2 = loadImage("assets/두번째 화면 2.png");

  helpImg1 = loadImage("assets/도움말 1.png");
  helpImg2 = loadImage("assets/도움말 2.png");
  helpImg3 = loadImage("assets/도움말 3.png");
  finalImg = loadImage("assets/마지막 화면.png");
  finalImg2 = loadImage("assets/마지막 화면2.png");
  endingImg = loadImage("assets/소감 화면.png");
  bg = loadImage("assets/wardrobe.png");

  imgs.white_shirt = loadImage("assets/white_shirt.png");
  imgs.blue_shirt = loadImage("assets/blue_shirt.png");
  imgs.blue_check = loadImage("assets/blue_check.png");
  imgs.orange_check = loadImage("assets/orange_check.png");

  imgs.beige_blazer = loadImage("assets/beige_blazer.png");
  imgs.gray_jacket = loadImage("assets/gray_jacket.png");
  imgs.brown_jacket = loadImage("assets/brown_jacket.png");
  imgs.green_jacket = loadImage("assets/green_jacket.png");
  imgs.beige_jacket = loadImage("assets/beige_jacket.png");

  imgs.beige_pants = loadImage("assets/beige_pants.png");
  imgs.black_pants = loadImage("assets/black_pants.png");
  imgs.blue_pants = loadImage("assets/blue_pants.png");
  imgs.brown_pants = loadImage("assets/brown_pants.png");
  imgs.gray_pants = loadImage("assets/gray_pants.png");

  sortBgImage = loadImage("assets/game_bg.png");
  staffCryImage = loadImage("assets/직원.png");
  staffSuccessImage = loadImage("assets/직원1.png");

  for (let i = 1; i <= 15; i++) {
    sortClothesImages[i] = loadImage("assets/옷" + i + ".png");
  }


  // ==============================
  // 세번째 게임 이미지 불러오기 시작
  // ==============================
  thirdImgs.alba  = loadImage("assets/alba.png");
  thirdImgs.boss  = loadImage("assets/boss.png");
  thirdImgs.flyer = loadImage("assets/flyer.png");
  thirdImgs.bg    = loadImage("assets/bg.png");
  thirdImgs.norm  = loadImage("assets/person_norm.png");
  thirdImgs.fast  = loadImage("assets/person_fast.png");
  thirdImgs.old   = loadImage("assets/person_old.png");
  thirdImgs.fam   = loadImage("assets/person_fam.png");
  thirdImgs.bad   = loadImage("assets/person_bad.png");
  thirdImgs.vip   = loadImage("assets/person_vip.png");
  thirdImgs.kid   = loadImage("assets/person_kid.png");
  // ==============================
  // 세번째 게임 이미지 불러오기 끝
  // ==============================
}

function setup() {



  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  makeClothes();

  updateCategoryBoxes();
  initializeSortGame();

}

function draw() {
  background(0);

  if (scene === 0) {
    if (isStartButtonHover()) {
      drawFullImage(startImg2);
    } else {
      drawFullImage(startImg1);
    }
  }

  else if (scene === 1) {
    drawFullImage(secondImg1);
  }

  else if (scene === 2) {
    drawFullImage(secondImg2);
  }

  else if (scene === 3) {
    drawFullImage(helpImg1);
  }

  else if (scene === 4) {
    drawGame();
  }

  else if (scene === 5) {
    drawFullImage(helpImg2);
  }

  else if (scene === 6) {
    drawSortGame();
  }

  // ==============================
  // 세번째 게임 화면 실행
  // ==============================
  else if (scene === 7) {
    drawFullImage(helpImg3);
  }

  else if (scene === 8) {
    thirdDraw();
  }

  else if (scene === 9) {
    drawFullImage(finalImg);
  }

  else if (scene === 10) {
    drawFullImage(finalImg2);
  }

  else if (scene === 11) {
    drawFullImage(endingImg);
 }

}

function drawFullImage(img) {
  image(img, 0, 0, width, height);
}

function mousePressed() {
  if (!fullscreen()) {
    fullscreen(true);
  }

  if (scene === 0 && isStartButtonHover()) {
    scene = 1;
  }

  else if (scene === 4) {
    startDrag();
  }

  else if (scene === 6) {
    sortMousePressed();
  }

  // 세번째 게임 마우스 클릭 처리
  else if (scene === 8) {
    thirdMousePressed();
  }
}

function mouseDragged() {
  if (scene === 4 && dragging) {
    let mx = mouseX * baseW / width;
    let my = mouseY * baseH / height;

    dragging.x = mx - dragging.offsetX;
    dragging.y = my - dragging.offsetY;
  }

  // 세번째 게임 마우스 드래그 처리
  else if (scene === 8) {
    thirdMouseDragged();
  }
}

function mouseReleased() {
  if (scene === 4) {
    releaseFirstGame();
  }

  else if (scene === 6) {
    sortMouseReleased();
  }

  // 세번째 게임 마우스 놓기 처리
  else if (scene === 8) {
    thirdMouseReleased();
  }
}

function keyPressed() {
  if (scene === 1 && keyCode === ENTER) {
    scene = 2;
  }

  else if (scene === 2 && keyCode === ENTER) {
    scene = 3;
  }

  else if (scene === 3 && keyCode === ENTER) {
    resetGame();
    scene = 4;
  }

  else if (scene === 4 && gameOver && keyCode === ENTER) {
    if (gameClear) {
      scene = 5;
    } else {
      resetGame();
    }
  }

  else if (scene === 5 && keyCode === ENTER) {
    restartSortGame();
    scene = 6;
  }

  else if (scene === 6 && keyCode === ENTER) {
    if (sortGameOver) {
      restartSortGame();
    }

    // 두번째 게임을 클리어하면 ENTER로 도움말 3로 이동
    if (sortCleared) {
      scene = 7;
    }
  }

  else if (scene === 7 && keyCode === ENTER) {
    thirdStartGame();
    scene = 8;
  }

  else if (scene === 8 && thirdGameState === 'clear' && keyCode === ENTER) {
    scene = 9;
  }

  else if (scene === 9 && keyCode === ENTER) {
    scene = 10;
  }

else if (scene === 10 && keyCode === 32) {
  resetAllGame();
    scene = 0;
  }

else if (scene === 10 && keyCode === ENTER) {
    scene = 11;
  }
}

function isStartButtonHover() {
  let btnX = width * 0.32;
  let btnY = height * 0.78;
  let btnW = width * 0.36;
  let btnH = height * 0.13;

  return mouseX > btnX &&
         mouseX < btnX + btnW &&
         mouseY > btnY &&
         mouseY < btnY + btnH;
}


// 첫번째게임 옷 만들기
function makeClothes() {
  clothes = [
    // 왼쪽 위 칸 셔츠 라인
    makeCloth("하얀 와이셔츠", imgs.white_shirt, 385, 185, 150, 180),
    makeCloth("파란 체크 셔츠", imgs.blue_check, 475, 185, 150, 180),
    makeCloth("주황 체크 셔츠", imgs.orange_check, 557, 190, 150, 180),
    makeCloth("하늘색 셔츠", imgs.blue_shirt, 825, 477, 150, 180),

    // 왼쪽 위 칸 자켓/셔츠 뒤쪽
    makeCloth("베이지 블레이저", imgs.beige_blazer, 995, 477, 150, 180),
    makeCloth("갈색 자켓", imgs.brown_jacket, 642, 190, 150, 180),

    // 오른쪽 위 칸 아우터
    makeCloth("털 갈색 자켓", imgs.beige_jacket, 745, 195, 150, 180),
    makeCloth("초록 자켓", imgs.green_jacket, 823, 193, 150, 180),
    makeCloth("회색 자켓", imgs.gray_jacket, 910, 190, 150, 180),

    // 왼쪽 아래 칸 바지
    makeCloth("베이지 바지", imgs.beige_pants, 400, 485, 140, 240),
    makeCloth("검정 바지", imgs.black_pants, 480, 485, 150, 240),
    makeCloth("회색 바지", imgs.gray_pants, 565, 477, 150, 240),
    makeCloth("갈색 바지", imgs.brown_pants, 650, 486, 150, 240),

    // 오른쪽 아래 칸 바지
    makeCloth("청바지", imgs.blue_pants, 755, 488, 150, 240)
  ];

  chooseTarget();
}


function makeCloth(name, img, x, y, w, h) {
  return {
    name: name,
    img: img,
    x: x,
    y: y,
    startX: x,
    startY: y,
    w: w,
    h: h,
    offsetX: 0,
    offsetY: 0
  };
}
// 첫번째 게임 초기화 함수
function resetGame() {
  score = 0;
  timeLeft = 20;
  gameOver = false;
  gameClear = false;
  dragging = null;
  gameStartTime = millis();

  for (let c of clothes) {
    c.x = c.startX;
    c.y = c.startY;
  }

  chooseTarget();

  wrongMessage = "";
  wrongMessageTimer = 0;
}

// 첫번째 게임 그리기 함수
function drawGame() {
  image(bg, 0, 0, width, height);

  if (!gameOver) {
    timeLeft = 20 - floor((millis() - gameStartTime) / 1000);

    if (timeLeft <= 0) {
      timeLeft = 0;
      gameOver = true;
      gameClear = false;
    }

    if (score >= 10) {
      gameOver = true;
      gameClear = true;
    }
  }

  drawUI();

  for (let c of clothes) {
    if (c !== dragging) {
      drawCloth(c);
    }
  }

  if (dragging) {
    drawCloth(dragging);
  }

  if (wrongMessageTimer > 0) {
  push();

  fill(0, 0, 0, 180);
  rectMode(CENTER);
  rect(width / 2, height / 2, 450, 80, 15);

  fill(255, 80, 80);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont(gameFont);
  text(wrongMessage, width / 2, height / 2);

  pop();

  wrongMessageTimer--;
}

  if (gameOver) {
  push();

  rectMode(CORNER);
  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(width * 0.05);

  if (gameClear) {
    text("성공!", width / 2, height / 2 - 50);
  } else {
    text("실패!", width / 2, height / 2 - 50);
  }

  if (gameClear) {
    text("ENTER를 누르면 도움말 2로 이동", width / 2, height / 2 + 60);
  } else {
    text("ENTER를 누르면 다시 시작", width / 2, height / 2 + 60);
  }

  pop();
}
}

function sx(x) {
  return x * width / baseW;
}

function sy(y) {
  return y * height / baseH;
}

function sw(w) {
  return w * width / baseW;
}

function sh(h) {
  return h * height / baseH;
}

function drawCloth(c) {
  image(c.img, sx(c.x), sy(c.y), sw(c.w), sh(c.h));
}

function drawUI() {
  

  noStroke();
  fill(0);
  textFont(gameFont);
  textAlign(LEFT, CENTER);
  textSize(sw(24));
  text("손님주문: " + target.name, sx(150), sy(250));
  text("점수: " + score + "   시간: " + timeLeft, sx(170), sy(400));
}

function chooseTarget() {
  target = random(clothes);
}

function startDrag() {
  if (gameOver) return;

  let mx = mouseX * baseW / width;
  let my = mouseY * baseH / height;

  for (let i = clothes.length - 1; i >= 0; i--) {
    let c = clothes[i];

    if (
      mx > c.x &&
      mx < c.x + c.w &&
      my > c.y &&
      my < c.y + c.h
    ) {
      dragging = c;
      c.offsetX = mx - c.x;
      c.offsetY = my - c.y;
      break;
    }
  }
}

function releaseFirstGame() {
  if (!dragging) return;

  let cx = dragging.x + dragging.w / 2;
  let cy = dragging.y + dragging.h / 2;

  let inBasket =
    cx > basket.x &&
    cx < basket.x + basket.w &&
    cy > basket.y &&
    cy < basket.y + basket.h;

  if (inBasket) {
    if (dragging.name === target.name) {
      score++;
      chooseTarget();
    } else {
      wrongMessage = "잘못된 옷입니다!";
      wrongMessageTimer = 90;
    }
  }

  dragging.x = dragging.startX;
  dragging.y = dragging.startY;
  dragging = null;
}

// 두번째 게임 초기화 및 그리기 함수
function updateCategoryBoxes() {
  let prevCounts = {};

  for (let box of categoryBoxes) {
    prevCounts[box.name] = box.storedCount;
  }

  categoryBoxes = [
    { name: "후드티", pctX: 0.165, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["후드티"] || 0 },
    { name: "니트", pctX: 0.288, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["니트"] || 0 },
    { name: "셔츠", pctX: 0.440, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["셔츠"] || 0 },
    { name: "아우터", pctX: 0.565, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["아우터"] || 0 },
    { name: "바지", pctX: 0.690, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["바지"] || 0 },
    { name: "액세서리", pctX: 0.778, pctY: 0.22, pctW: 0.115, pctH: 0.40, storedCount: prevCounts["액세서리"] || 0 }
  ];
}

function initializeSortGame() {
  sortItems = [];

  let itemData = [
    { num: 1, cat: "후드티", name: "남색 후드" },
    { num: 2, cat: "후드티", name: "겨자색 집업" },
    { num: 3, cat: "후드티", name: "초록색 후드" },
    { num: 4, cat: "니트", name: "크림색 니트" },
    { num: 5, cat: "니트", name: "스트라이프 니트" },
    { num: 6, cat: "니트", name: "노르딕 니트" },
    { num: 7, cat: "셔츠", name: "하늘색 셔츠" },
    { num: 8, cat: "셔츠", name: "체크 셔츠" },
    { num: 9, cat: "셔츠", name: "줄무늬 티" },
    { num: 10, cat: "아우터", name: "트렌치코트" },
    { num: 11, cat: "아우터", name: "회색 코트" },
    { num: 12, cat: "아우터", name: "퍼 자켓" },
    { num: 13, cat: "바지", name: "청바지" },
    { num: 14, cat: "바지", name: "카고바지" },
    { num: 15, cat: "바지", name: "면바지" }
  ];

  let slots = [
    { startX: 0.03, endX: 0.25 },
    { startX: 0.28, endX: 0.50 },
    { startX: 0.53, endX: 0.74 },
    { startX: 0.77, endX: 0.95 }
  ];

  for (let i = 0; i < itemData.length; i++) {
    let data = itemData[i];
    let currentSlot = slots[i % slots.length];
    let rx = random(width * (currentSlot.startX + 0.02), width * (currentSlot.endX - 0.09));
    let ry = random(height * 0.60, height * 0.68);

    sortItems.push(new ClothItem(data.num, rx, ry, data.cat, data.name));
  }
}

function restartSortGame() {
  categoryBoxes = [];
  draggedItem = null;
  errorMessage = "";
  errorTimer = 0;
  sortTimeLeft = 30;
  lives = 3;
  sortGameOver = false;
  sortCleared = false;
  lastSecond = floor(millis() / 1000);

  updateCategoryBoxes();
  initializeSortGame();
}

function drawSortGame() {
  background(sortBgImage);

  if (!sortCleared && sortItems.length > 0 && sortItems.every(item => item.isLocked)) {
    sortCleared = true;
  }

  if (sortCleared) {
    drawSortClearScreen();
    return;
  }

  if (sortGameOver) {
    drawSortGameOverScreen();
    return;
  }

  let currentSecond = floor(millis() / 1000);

  if (currentSecond > lastSecond) {
    sortTimeLeft--;
    lastSecond = currentSecond;

    if (sortTimeLeft <= 0) {
      sortTimeLeft = 0;
      sortGameOver = true;
    }
  }

  for (let item of sortItems) {
    item.update();
    item.display();
  }

  if (errorTimer > 0) {
    drawErrorPopup();
    errorTimer--;
  }

  drawSortHUD();
}

function sortMousePressed() {
  if (sortGameOver || sortCleared) {
    let btnX = width / 2;
    let btnY = height * 0.80;

    if (
      mouseX > btnX - 110 &&
      mouseX < btnX + 110 &&
      mouseY > btnY - 29 &&
      mouseY < btnY + 29
    ) {
      restartSortGame();
    }

    return;
  }

  draggedItem = null;

  for (let i = sortItems.length - 1; i >= 0; i--) {
    if (sortItems[i].isMouseOver() && !sortItems[i].isLocked) {
      draggedItem = sortItems[i];
      draggedItem.startDrag();

      sortItems.splice(i, 1);
      sortItems.push(draggedItem);
      break;
    }
  }
}

function sortMouseReleased() {
  if (sortGameOver || sortCleared) return;

  if (draggedItem !== null) {
    draggedItem.endDrag();

    let onShelf = false;

    for (let box of categoryBoxes) {
      let bx = width * box.pctX;
      let by = height * box.pctY;
      let bw = width * box.pctW;
      let bh = height * box.pctH;

      if (isInBox(mouseX, mouseY, bx, by, bw, bh)) {
        onShelf = true;

        if (draggedItem.category === box.name) {
          let pos = getLockedPosition(box, box.storedCount);

          draggedItem.x = pos.x;
          draggedItem.y = pos.y;
          draggedItem.originX = pos.x;
          draggedItem.originY = pos.y;
          draggedItem.isLocked = true;

          box.storedCount++;
        } else {
          triggerError();
          lives--;

          if (lives <= 0) {
            lives = 0;
            sortGameOver = true;
          }

          draggedItem.returnToOrigin();
        }

        break;
      }
    }

    if (!onShelf) {
      draggedItem.returnToOrigin();
    }

    draggedItem = null;
  }
}

function getLockedPosition(box, count) {
  let bx = width * box.pctX;
  let by = height * box.pctY;
  let bw = width * box.pctW;

  let itemW = width * 0.082;
  let startMargin = bw * 0.06;
  let maxItems = 3;
  let spacing = (bw - itemW - startMargin * 2) / (maxItems - 1);
  spacing = min(spacing, itemW * 0.55);

  let yOffsets = {
    "후드티": 0.14,
    "니트": 0.14,
    "셔츠": 0.14,
    "아우터": 0.12,
    "바지": 0.14,
    "액세서리": 0.14
  };

  let yOff = yOffsets[box.name] || 0.14;

  return {
    x: bx + startMargin + count * spacing,
    y: by + height * yOff
  };
}

function drawSortHUD() {
  push();

  fill(0, 0, 0, 150);
  noStroke();
  rectMode(CORNER);
  rect(width * 0.02, height * 0.02, 160, 50, 12);

  if (sortTimeLeft <= 5) {
    fill(255, 80, 80);
  } else {
    fill(255, 230, 150);
  }

  textSize(26);
  textAlign(LEFT, CENTER);
  text("⏱ " + sortTimeLeft + "초", width * 0.02 + 15, height * 0.02 + 25);

  fill(0, 0, 0, 150);
  rectMode(CORNER);
  rect(width - width * 0.02 - 160, height * 0.02, 160, 50, 12);

  textSize(28);
  textAlign(RIGHT, CENTER);

  let hearts = "";
  for (let i = 0; i < lives; i++) hearts += "❤️";
  for (let i = lives; i < 3; i++) hearts += "🖤";

  text(hearts, width - width * 0.02 - 10, height * 0.02 + 25);

  pop();
}

function drawSortGameOverScreen() {
  push();
  fill(0, 0, 0, 160);
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();

  let staffW = width * 0.22;
  let staffH = staffW;
  let staffX = width * 0.62;
  let staffY = height * 0.42;

  image(staffCryImage, staffX, staffY, staffW, staffH);

  drawSpeechBubble(staffX - width * 0.02, staffY - height * 0.02);

  push();
  fill(255, 200, 80);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height * 0.80, 220, 58, 14);

  fill(80, 50, 0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("다시 시작", width / 2, height * 0.80);
  pop();
}

function drawSortClearScreen() {
  push();
  fill(0, 0, 0, 160);
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();

  let staffW = width * 0.22;
  let staffH = staffW;
  let staffX = width * 0.62;
  let staffY = height * 0.42;

  image(staffSuccessImage, staffX, staffY, staffW, staffH);

  drawSpeechBubbleCustom(
    staffX - width * 0.02,
    staffY - height * 0.02,
    "옷 정리가 깔끔하게 됐어요!\n감사합니다!!"
  );

  push();

  fill(255);
  noStroke();
  textFont(gameFont);
  textAlign(CENTER, CENTER);
  textSize(width * 0.05);

  text(
    "ENTER를 눌러 도움말 3으로 이동하시오", width / 2, height * 0.80);
  pop();
}

function drawSpeechBubble(tipX, tipY) {
  push();

  let bw = width * 0.30;
  let bh = height * 0.18;
  let bx = tipX - bw - width * 0.02;
  let by = tipY - bh;

  fill(255, 255, 255, 235);
  stroke(180, 140, 100);
  strokeWeight(3);
  rectMode(CORNER);
  rect(bx, by, bw, bh, 18);

  fill(255, 255, 255, 235);
  stroke(180, 140, 100);
  strokeWeight(3);
  triangle(
    tipX - width * 0.055, tipY - height * 0.025,
    tipX - width * 0.085, tipY + height * 0.005,
    tipX - width * 0.02, tipY - height * 0.01
  );

  noStroke();
  fill(80, 50, 30);
  textSize(width * 0.018);
  textAlign(CENTER, CENTER);
  textLeading(width * 0.025);
  text("옷 정리가 잘못됐어요...\n다시 정리해 주세요!", bx + bw / 2, by + bh / 2);

  pop();
}

function drawSpeechBubbleCustom(tipX, tipY, msg) {
  push();

  let bw = width * 0.30;
  let bh = height * 0.18;
  let bx = tipX - bw - width * 0.02;
  let by = tipY - bh;

  fill(255, 255, 255, 235);
  stroke(100, 200, 100);
  strokeWeight(3);
  rectMode(CORNER);
  rect(bx, by, bw, bh, 18);

  fill(255, 255, 255, 235);
  stroke(100, 200, 100);
  strokeWeight(3);
  triangle(
    tipX - width * 0.055, tipY - height * 0.025,
    tipX - width * 0.085, tipY + height * 0.005,
    tipX - width * 0.02, tipY - height * 0.01
  );

  noStroke();
  fill(0, 50, 0);
  textSize(width * 0.018);
  textAlign(CENTER, CENTER);
  textLeading(width * 0.025);
  text(msg, bx + bw / 2, by + bh / 2);

  pop();
}

function triggerError() {
  errorMessage = "알맞은 옷장에 정리해주세요";
  errorTimer = 90;
}

function drawErrorPopup() {
  push();
  rectMode(CENTER);
  fill(0, 0, 0, 180);
  noStroke();
  rect(width / 2, height / 2, 420, 80, 15);

  fill(255, 230, 230);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(errorMessage, width / 2, height / 2);
  pop();
}

class ClothItem {
  constructor(imgNum, x, y, category, name) {
    this.imgNum = imgNum;
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.w = width * 0.082;
    this.h = category === "아우터" ? height * 0.24 : height * 0.21;
    this.category = category;
    this.name = name;
    this.isDragging = false;
    this.isLocked = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    let currentImg = sortClothesImages[this.imgNum];

    if (currentImg) {
      image(currentImg, this.x, this.y, this.w, this.h);
    }
  }

  update() {
    this.w = width * 0.082;
    this.h = this.category === "아우터" ? height * 0.24 : height * 0.21;

    if (!this.isDragging) {
      this.x = lerp(this.x, this.originX, 0.25);
      this.y = lerp(this.y, this.originY, 0.25);
    } else {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  isMouseOver() {
    return mouseX > this.x &&
           mouseX < this.x + this.w &&
           mouseY > this.y &&
           mouseY < this.y + this.h;
  }

  startDrag() {
    this.isDragging = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
  }

  endDrag() {
    this.isDragging = false;
  }

  returnToOrigin() {
    this.x = this.originX;
    this.y = this.originY;
  }
}

function isInBox(mx, my, bx, by, bw, bh) {
  return mx > bx && mx < bx + bw && my > by && my < by + bh;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  updateCategoryBoxes();

  if (scene === 6) {
    restartSortGame();
  }

  // 세번째 게임 화면 크기 조정
  if (scene === 8) {
    thirdAlbaX = 80;
    thirdAlbaY = THIRD_GROUND();
    thirdBossY = THIRD_GROUND();
  }
}


// =====================================================
// 세번째 게임 추가 시작 : 전단지 던지기 대작전 - 하루 버전
// 다른 게임과 충돌하지 않게 전부 third 접두어 사용
// =====================================================

function thirdImgOk(img) {
  return img && img.width > 1;
}

function thirdStartGame() {
  thirdGameState = 'playing';

  thirdScore = 0;
  thirdCombo = 0;

  thirdGoal = 25;
  thirdFlyers = 30;
  thirdTLeft = 60;

  thirdPersons = [];
  thirdFlierObjs = [];
  thirdEffects = [];
  thirdSparks = [];

  thirdPressing = false;
  thirdPressT = 0;

  thirdBossMode = false;
  thirdBossNextT = 15 + random(8);

  thirdAlbaX = 80;
  thirdAlbaY = THIRD_GROUND();

  thirdBossX = -120;
  thirdBossY = THIRD_GROUND();
  thirdBossDir = 1;

  thirdSpawnT = 0;
  thirdSpawnI = 1.3;

  thirdLastMillis = millis();
}

function thirdSpawnPerson() {
  const pool = [
    THIRD_PTYPES[0], THIRD_PTYPES[0],
    THIRD_PTYPES[1], THIRD_PTYPES[1],
    THIRD_PTYPES[2],
    THIRD_PTYPES[3],
    THIRD_PTYPES[4],
    THIRD_PTYPES[5],
    THIRD_PTYPES[6]
  ];

  const t = random(pool);
  const dir = random() < 0.5 ? 1 : -1;

  return {
    x: dir === 1 ? -80 : width + 80,
    y: THIRD_GROUND(),
    type: t,
    dir: dir,
    spd: t.spd * random(0.9, 1.15),
    bobPh: random(TWO_PI),
    flip: dir === -1,
    active: true,
    hitFlash: 0,
    dodgeVY: 0,
    dodging: false
  };
}

function thirdThrowFlyer(power, angle) {
  if (thirdFlyers <= 0) return;

  if (
    thirdBossMode &&
    dist(thirdAlbaX, thirdAlbaY - THIRD_CM(), thirdBossX, thirdBossY - THIRD_CM()) < THIRD_CW()
  ) {
    thirdAddEf(
      thirdAlbaX + 30,
      thirdAlbaY - THIRD_CH() - 20,
      '옆집사장님이 막았다!!',
      color(220, 50, 50),
      true
    );
    return;
  }

  thirdFlyers--;

  const spd = 260 + power * 380;

  thirdFlierObjs.push({
    x: thirdAlbaX + THIRD_CW() * 0.35,
    y: thirdAlbaY - THIRD_CH() * 0.6,
    vx: cos(angle) * spd,
    vy: sin(angle) * spd,
    rot: 0,
    rotSpd: random(-7, 7),
    active: true,
    trail: []
  });
}

function thirdAddEf(x, y, txt, col, big) {
  thirdEffects.push({
    x: x,
    y: y,
    txt: txt,
    col: col,
    big: !!big,
    vy: -58,
    t: 0,
    dur: 1.3
  });
}

function thirdAddSparks(x, y, col, n = 10) {
  for (let i = 0; i < n; i++) {
    thirdSparks.push({
      x: x,
      y: y,
      vx: random(-200, 200),
      vy: random(-200, 0),
      col: col,
      t: 0,
      dur: 0.55
    });
  }
}

function thirdDraw() {
  if (thirdGameState === 'gameover') {
    thirdDrawGameOver();
    return;
  }

  if (thirdGameState === 'clear') {
    thirdDrawClear();
    return;
  }

  const dt = min((millis() - thirdLastMillis) / 1000, 0.05);
  thirdLastMillis = millis();

  thirdUpdate(dt);
  thirdDrawScene();
  thirdDrawHUD();
}

function thirdUpdate(dt) {
  thirdTLeft -= dt;

  if (thirdPressT > 0) {
    thirdPressT += dt;
  }

  thirdSpawnT += dt;

  if (thirdSpawnT > thirdSpawnI * random(0.7, 1.3)) {
    thirdPersons.push(thirdSpawnPerson());
    thirdSpawnT = 0;
  }

  for (let p of thirdPersons) {
    if (!p.active) continue;

    p.x += p.dir * p.spd * dt;
    p.bobPh += dt * 4;

    if (p.hitFlash > 0) {
      p.hitFlash -= dt;
    }

    if (p.dodging) {
      p.y += p.dodgeVY * dt;
      p.dodgeVY += 350 * dt;

      if (p.y >= THIRD_GROUND()) {
        p.y = THIRD_GROUND();
        p.dodging = false;
      }
    }

    if (p.x < -150 || p.x > width + 150) {
      p.active = false;
    }
  }

  thirdPersons = thirdPersons.filter(p => p.active);

  for (let f of thirdFlierObjs) {
    if (!f.active) continue;

    f.trail.push({ x: f.x, y: f.y });

    if (f.trail.length > 10) {
      f.trail.shift();
    }

    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.vy += 320 * dt;
    f.rot += f.rotSpd * dt;

    if (f.y > height + 40 || f.x < -80 || f.x > width + 80) {
      f.active = false;
      continue;
    }

    if (thirdBossMode && dist(f.x, f.y, thirdBossX, thirdBossY - THIRD_CM()) < 90) {
      f.active = false;
      thirdFlyers = max(0, thirdFlyers - 1);
      thirdCombo = 0;

      thirdAddEf(
        thirdBossX,
        thirdBossY - THIRD_CH() - 20,
        '옆집사장님이 잡았다!! -1장',
        color(220, 50, 50),
        true
      );

      thirdAddSparks(thirdBossX, thirdBossY - THIRD_CM(), color(220, 50, 50), 8);
      continue;
    }

    for (let p of thirdPersons) {
      if (!p.active) continue;

      if (dist(f.x, f.y, p.x, p.y - THIRD_CH() * 0.55) > p.type.hitR) {
        continue;
      }

      f.active = false;

      if (p.type.bad) {
        thirdFlyers = max(0, thirdFlyers - 1);
        thirdCombo = 0;

        thirdAddEf(
          p.x,
          p.y - THIRD_CH() - 14,
          '😤 진상!! 전단지 -1장',
          color(224, 64, 96),
          true
        );

        thirdAddSparks(p.x, p.y - THIRD_CH() * 0.55, color(224, 64, 96), 12);
      } else if (random() < p.type.dodge) {
        p.dodging = true;
        p.dodgeVY = -180;

        thirdAddEf(
          p.x,
          p.y - THIRD_CH() - 14,
          '피했다!',
          color(245, 158, 11),
          false
        );
      } else {
        thirdScore += p.type.val;
        thirdCombo++;
        p.active = false;

        if (thirdCombo >= 3) {
          thirdAddEf(
            p.x,
            p.y - THIRD_CH() - 14,
            `🔥${thirdCombo}콤보! +${p.type.val}명`,
            color(30, 150, 90),
            true
          );
        } else {
          thirdAddEf(
            p.x,
            p.y - THIRD_CH() - 14,
            `+${p.type.val}명 입장!`,
            color(30, 150, 90),
            false
          );
        }

        thirdAddSparks(p.x, p.y - THIRD_CH() * 0.55, color(52, 211, 153), 8);

        if (thirdScore >= thirdGoal) {
          thirdGameState = 'clear';
          return;
        }
      }

      break;
    }
  }

  thirdFlierObjs = thirdFlierObjs.filter(f => f.active);

  thirdBossNextT -= dt;

  if (!thirdBossMode && thirdBossNextT <= 0) {
    thirdBossMode = true;
    thirdBossX = random() < 0.5 ? -100 : width + 100;
    thirdBossDir = thirdBossX < 0 ? 1 : -1;
    thirdBossTimer = 4 + random(3);
    thirdBossNextT = 14 + random(8);
  }

  if (thirdBossMode) {
    thirdBossX += thirdBossDir * 90 * dt;
    thirdBossTimer -= dt;

    if (thirdBossTimer <= 0 || thirdBossX < -160 || thirdBossX > width + 160) {
      thirdBossMode = false;
    }
  }

  for (let e of thirdEffects) {
    e.t += dt;
    e.y += e.vy * dt;
  }

  for (let s of thirdSparks) {
    s.t += dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vy += 250 * dt;
  }

  thirdEffects = thirdEffects.filter(e => e.t < e.dur);
  thirdSparks = thirdSparks.filter(s => s.t < s.dur);

  if (thirdTLeft <= 0 || (thirdFlyers <= 0 && thirdFlierObjs.length === 0)) {
    thirdGameState = 'gameover';
  }
}

function thirdDrawScene() {
  if (thirdImgOk(thirdImgs.bg)) {
    image(thirdImgs.bg, 0, 0, width, height);
  } else {
    thirdDrawBg();
  }

  thirdDrawBossZone();
  thirdDrawBoss();
  thirdDrawPersons();
  thirdDrawFlyers();
  thirdDrawAlba();
  thirdDrawAimLine();
  thirdDrawEffects();
}

function thirdDrawBg() {
  background(184, 216, 255);

  fill(210, 195, 170);
  noStroke();
  rect(0, height * 0.75, width, height * 0.25);

  fill(195, 178, 150);
  rect(0, height * 0.88, width, height * 0.12);
}

function thirdDrawChar(img, x, y, flipX) {
  push();

  translate(x, y);

  if (flipX) {
    scale(-1, 1);
  }

  if (thirdImgOk(img)) {
    imageMode(CORNER);
    image(img, -THIRD_CW() / 2, -THIRD_CH(), THIRD_CW(), THIRD_CH());
  } else {
    const cw = THIRD_CW();
    const ch = THIRD_CH();

    fill(242, 192, 154);
    noStroke();
    ellipse(0, ch * -0.66, cw * 0.28, ch * 0.24);

    fill(60);
    ellipse(0, ch * -0.77, cw * 0.28, ch * 0.09);

    fill(100);
    rect(cw * -0.18, ch * -0.54, cw * 0.36, ch * 0.34);

    fill(68);
    rect(cw * -0.16, ch * -0.2, cw * 0.12, ch * 0.26);
    rect(cw * 0.04, ch * -0.2, cw * 0.12, ch * 0.26);
  }

  pop();
}

function thirdDrawAlba() {
  thirdDrawChar(thirdImgs.alba, thirdAlbaX, thirdAlbaY, false);
}

function thirdDrawBoss() {
  if (!thirdBossMode) return;

  thirdDrawChar(thirdImgs.boss, thirdBossX, thirdBossY, thirdBossDir === -1);

  push();
  fill(220, 50, 50);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(max(11, THIRD_CH() * 0.06));
  text('옆집사장님', thirdBossX, thirdBossY - THIRD_CH() - 10);
  textStyle(NORMAL);
  pop();
}

function thirdDrawBossZone() {
  if (!thirdBossMode) return;

  push();
  stroke(220, 50, 50, 100);
  strokeWeight(2);
  fill(220, 50, 50, 20);
  circle(thirdBossX, thirdBossY - THIRD_CM(), 200);
  pop();
}

function thirdDrawPersons() {
  for (let p of thirdPersons) {
    if (!p.active) continue;

    const bob = sin(p.bobPh + millis() * 0.006) * 3;

    push();

    translate(p.x, p.y + bob);

    if (p.hitFlash > 0) {
      tint(255, 100, 100, 180);
    }

    if (p.flip) {
      scale(-1, 1);
    }

    const img = thirdImgs[p.type.id];

    if (thirdImgOk(img)) {
      imageMode(CORNER);
      image(img, -THIRD_CW() / 2, -THIRD_CH(), THIRD_CW(), THIRD_CH());
    } else {
      const cw = THIRD_CW();
      const ch = THIRD_CH();

      fill(242, 192, 154);
      noStroke();
      ellipse(0, ch * -0.66, cw * 0.28, ch * 0.24);

      fill(p.type.col);
      rect(cw * -0.18, ch * -0.54, cw * 0.36, ch * 0.34);

      fill(68);
      rect(cw * -0.16, ch * -0.2, cw * 0.12, ch * 0.26);
      rect(cw * 0.04, ch * -0.2, cw * 0.12, ch * 0.26);

      fill(242, 192, 154);
      rect(cw * -0.32, ch * -0.51, cw * 0.14, ch * 0.19);
      rect(cw * 0.18, ch * -0.51, cw * 0.14, ch * 0.19);

      textSize(ch * 0.14);
      textAlign(CENTER);
      text(p.type.emoji, 0, ch * -0.72);
    }

    noTint();

    fill(p.type.bad ? color(224, 64, 96) : color(p.type.col));
    textAlign(CENTER);
    textSize(max(10, THIRD_CH() * 0.07));
    textStyle(BOLD);
    text(p.type.label + (p.type.bad ? ' ⚠' : ''), 0, -THIRD_CH() - 10);
    textStyle(NORMAL);

    pop();
  }
}

function thirdDrawFlyers() {
  for (let f of thirdFlierObjs) {
    if (!f.active) continue;

    noStroke();

    for (let i = 0; i < f.trail.length - 1; i++) {
      fill(255, 0, 0, (i / f.trail.length) * 80);
      circle(f.trail[i].x, f.trail[i].y, 10);
    }

    push();

    translate(f.x, f.y);
    rotate(f.rot);

    if (thirdImgOk(thirdImgs.flyer)) {
      imageMode(CENTER);
      image(thirdImgs.flyer, 0, 0, 55, 40);
    } else {
      fill(239, 246, 255);
      stroke(37, 99, 235);
      strokeWeight(1.2);
      rect(-22, -15, 44, 30, 3);

      fill(59, 130, 246);
      noStroke();
      textSize(10);
      textAlign(CENTER);
      text('SALE!', 0, 5);
    }

    pop();
  }
}

function thirdDrawAimLine() {
  if (!thirdPressing || thirdPressT < 0.05) return;

  const power = min(1, thirdPressT / 1.0);
  const angle = atan2(thirdPressAimY - thirdAlbaY, thirdPressAimX - thirdAlbaX);
  const spd = 260 + power * 380;

  stroke(255, 0, 0, 230);
  strokeWeight(4);
  noFill();

  beginShape();

  for (let i = 0; i <= 25; i++) {
    const t = i * 0.05;
    const px = thirdAlbaX + cos(angle) * spd * t + THIRD_CW() * 0.35;
    const py = thirdAlbaY - THIRD_CH() * 0.6 + sin(angle) * spd * t + 320 * t * t * 0.5;

    if (px < 0 || px > width || py > height) {
      break;
    }

    vertex(px, py);
  }

  endShape();

  const bw = 120;
  const bh = 8;
  const bx = thirdAlbaX - bw / 2;
  const by = thirdAlbaY + 14;

  fill(220);
  noStroke();
  rect(bx, by, bw, bh, 4);

  fill(255, 0, 0);
  rect(bx, by, bw * power, bh, 4);

  fill(80);
  textAlign(CENTER);
  textSize(10);
  text('파워', bx + bw / 2, by - 3);
}

function thirdDrawEffects() {
  for (let e of thirdEffects) {
    const a = max(0, 1 - e.t / e.dur);

    push();
    fill(red(e.col), green(e.col), blue(e.col), a * 255);
    textAlign(CENTER);
    textStyle(e.big ? BOLD : NORMAL);
    textSize(e.big ? max(15, THIRD_CH() * 0.09) : max(11, THIRD_CH() * 0.07));
    text(e.txt, e.x, e.y);
    pop();
  }

  for (let s of thirdSparks) {
    const a = max(0, 1 - s.t / s.dur);

    fill(red(s.col), green(s.col), blue(s.col), a * 255);
    noStroke();
    circle(s.x, s.y, 6);
  }
}

function thirdDrawHUD() {
  push();

  const panelX = 20;
  const panelY = 20;
  const panelW = min(width * 0.72, 780);
  const panelH = 58;

  // 전체 HUD 배경
  fill(255, 245, 225, 220);
  stroke(120, 80, 40, 120);
  strokeWeight(2);
  rectMode(CORNER);
  rect(panelX, panelY, panelW, panelH, 18);

  // 살짝 그림자 느낌
  noStroke();
  fill(0, 0, 0, 25);
  rect(panelX + 4, panelY + 5, panelW, panelH, 18);

  // 다시 패널 한 번 더 올리기
  fill(255, 248, 235, 235);
  stroke(120, 80, 40, 120);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 18);

  textFont(gameFont);
  textAlign(CENTER, CENTER);
  textSize(max(17, height * 0.026));
  noStroke();

  const items = [
    { txt: `👥 손님 ${thirdScore}/${thirdGoal}`, col: color(30, 80, 40) },
    { txt: `📄 전단지 ${thirdFlyers}장`, col: color(80, 60, 30) },
    {
      txt: thirdTLeft > 10 ? `⏱ 시간 ${ceil(thirdTLeft)}초` : `⏱ 시간 ${ceil(thirdTLeft)}초!!`,
      col: thirdTLeft <= 10 ? color(210, 50, 50) : color(60, 60, 60)
    },
    {
      txt: thirdBossMode ? `😡 옆집사장님 출몰!` : `😴 옆집사장님 대기중`,
      col: thirdBossMode ? color(190, 40, 40) : color(70, 70, 70)
    }
  ];

  const gap = panelW / items.length;

  for (let i = 0; i < items.length; i++) {
    fill(items[i].col);
    text(items[i].txt, panelX + gap * i + gap / 2, panelY + panelH / 2);

    // 구분선
    if (i < items.length - 1) {
      stroke(120, 80, 40, 80);
      strokeWeight(1);
      line(
        panelX + gap * (i + 1),
        panelY + 12,
        panelX + gap * (i + 1),
        panelY + panelH - 12
      );
      noStroke();
    }
  }

  pop();
}

function thirdDrawGameOver() {
  push();

  background(245, 238, 230);

  fill(0, 0, 0, 120);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);

  fill(255, 248, 235);
  stroke(120, 80, 40);
  strokeWeight(3);
  rectMode(CENTER);
  rect(width / 2, height / 2, width * 0.48, height * 0.34, 25);

  textFont(gameFont);
  textAlign(CENTER, CENTER);

  fill(90, 55, 30);
  noStroke();
  textSize(width * 0.045);
  text("아쉽게 실패했어요!", width / 2, height * 0.42);

  fill(120, 80, 50);
  textSize(width * 0.026);
  text(
    "손님 " + thirdScore + "/" + thirdGoal + "명",
    width / 2,
    height * 0.51
  );

  fill(217, 95, 43);
  noStroke();
  rect(width / 2, height * 0.62, 260, 58, 15);

  fill(255);
  textSize(width * 0.024);
  text("다시 시작하기", width / 2, height * 0.62);

  pop();
}

function thirdDrawClear() {
  background(240, 255, 245);

  fill(40);
  textAlign(CENTER, CENTER);
  textFont(gameFont);
  textStyle(BOLD);

  textSize(max(22, height * 0.05));
  text('🎉 하루 동안 손님을 많이 모았어요!', width / 2, height * 0.38);

  textSize(max(18, height * 0.04));
  text('가게 홍보 대성공!', width / 2, height * 0.48);

  fill(30, 150, 90);
  textSize(max(16, height * 0.035));
  text('ENTER을 눌러 마지막 화면으로 이동', width / 2, height * 0.62);

  textStyle(NORMAL);
}

function thirdMousePressed() {
  const bx = width / 2 - 120;
  const by = height * 0.62;
  const bw = 240;
  const bh = 52;

  if (thirdGameState === 'gameover' || thirdGameState === 'clear') {
    if (
      mouseX > bx &&
      mouseX < bx + bw &&
      mouseY > by &&
      mouseY < by + bh
    ) {
      thirdStartGame();
    }

    return;
  }

  if (thirdGameState === 'playing') {
    thirdPressing = true;
    thirdPressT = 0.01;
    thirdPressAimX = mouseX;
    thirdPressAimY = mouseY;
  }
}

function thirdMouseDragged() {
  if (thirdPressing) {
    thirdPressAimX = mouseX;
    thirdPressAimY = mouseY;
  }
}

function thirdMouseReleased() {
  if (!thirdPressing || thirdGameState !== 'playing') return;

  const power = min(1, thirdPressT / 1.0);
  const angle = atan2(thirdPressAimY - thirdAlbaY, thirdPressAimX - thirdAlbaX);

  thirdThrowFlyer(power, angle);

  thirdPressing = false;
  thirdPressT = 0;
}

function thirdTouchStarted() {
  thirdMousePressed();
  return false;
}

function thirdTouchMoved() {
  thirdMouseDragged();
  return false;
}

function thirdTouchEnded() {
  thirdMouseReleased();
  return false;
}

// =====================================================
// 세번째 게임 추가 끝
// =====================================================

function resetAllGame() {
  resetGame();
  restartSortGame();
  thirdStartGame();
  thirdGameState = 'ready';
}