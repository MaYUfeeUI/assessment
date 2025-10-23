"use strict";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivision = document.getElementById("result-area");
const tweetDivision = document.getElementById("tweet-area");
assessmentButton.addEventListener("click", () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  console.log(userName);

  // 診断結果表示エリアの作成
  resultDivision.innerText = "";
  const heading = document.createElement("h3");
  heading.innerText = "診断結果";
  resultDivision.appendChild(heading);

  const paragraph = document.createElement("p");
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivision.appendChild(paragraph);

  // ツイートエリアの作成
  tweetDivision.innerText = "";
  const anchor = document.createElement("a");
  const hrefValue =
    "https://x.com/intent/tweet?button_hashtag=" +
    encodeURIComponent("あなたのいいところ") +
    "&ref_src=twsrc%5Etfw";

  anchor.setAttribute("href", hrefValue);
  anchor.setAttribute("class", "twitter-hashtag-button");
  anchor.setAttribute("data-text", result);
  anchor.innerText = "Tweet #あなたのいいところ";

  tweetDivision.appendChild(anchor);

  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  tweetDivision.appendChild(script);
});

userNameInput.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    assessmentButton.dispatchEvent(new Event("click"));
  }
});
const answers = [
  "✨###userName###のいいところは笑顔です😊 ###userName###のふんわりした笑顔は、まわりを明るく照らします🌸",
  "🫶###userName###のいいところはやさしさです🌷 ###userName###の思いやりある言葉が、みんなの心をあたためます☕",
  "🎧###userName###のいいところは声です💫###userName###のやわらかい声は、聞く人を癒してくれます🕊️",
  "🎨###userName###のいいところはセンスです💎###userName###のセンスは、日常に小さなきらめきを運びます🌈",
  "💪###userName###のいいところは努力です🌼どんなときも前向きな###userName###の姿に、周りは元気をもらっています✨",
  "🌞###userName###のいいところは明るさです🌻###userName###の太陽みたいな笑顔が、場をパッと照らします☀️",
  "🍃###userName###のいいところは穏やかさです🫧###userName###の落ち着いた雰囲気は、まわりに安心を届けます🌿",
  "💗###userName###のいいところは思いやりです🐰###userName###のさりげない気づかいが、誰かの心を救っています🌷",
  "🍀###userName###のいいところはがんばり屋なところです🧸コツコツ努力する###userName###の姿がとっても素敵です✨",
  "😂###userName###のいいところは笑いのセンスです🎉###userName###のユーモアがある一言で、みんなの笑顔が増えます💫",
  "☁️###userName###のいいところは自然体なところです🐚背伸びしない###userName###の姿が、まわりをほっとさせます🍃",
  "🕯️###userName###のいいところは癒しです🍰###userName###と一緒にいると、不思議と心が落ち着きます🫖",
  "💎###userName###のいいところはピュアな心です🌸まっすぐで素直な###userName###の気持ちが、人をあたためます☀️",
  "🌙###userName###のいいところは想像力です🩵###userName###のふんわりした発想が、まわりをやさしい世界に導きます🌈",
  "🌈###userName###のいいところはバランス感覚です🧁###userName###は自分もまわりも大事にできる、調和の達人です🎀",
  "🐰###userName###のいいところは可愛げです🩷 ###userName###のちょっとした仕草や表情が、まわりを“きゅん”とさせます💞",
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  //ブラウザのコンソールにインデックスを表示し、どの診断結果になるか確かめる
  console.log(`${userName} のインデックスは ${index} です`);
  let result = answers[index];
  result = result.replaceAll("###userName###", userName);
  return result;
}
// テストを行う関数
function test() {
  console.log("診断結果の文章のテスト");

  //太郎
  console.log("太郎");
  console.assert(
    assessment("太郎") ===
      "🍀太郎のいいところはがんばり屋なところです🧸コツコツ努力する太郎の姿がとっても素敵です✨",
    "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
  );

  //次郎
  console.log("次郎");
  console.assert(
    assessment("次郎") ===
      "🐰次郎のいいところは可愛げです🩷 次郎のちょっとした仕草や表情が、まわりを“きゅん”とさせます💞",
    "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
  );

  //花子
  console.log("花子");
  console.assert(
    assessment("花子") ===
      "🫶花子のいいところはやさしさです🌷 花子の思いやりある言葉が、みんなの心をあたためます☕",
    "診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。"
  );

  console.log("診断結果の文章のテスト終了");

  console.log("同じ名前なら、同じ結果を出力することのテスト");
  //ここにテストを追加

  console.log("太郎");
  console.assert(
    assessment("太郎") === assessment("太郎"),
    "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
  );

  console.log("次郎");
  console.assert(
    assessment("次郎") === assessment("次郎"),
    "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
  );

  console.log("花子");
  console.assert(
    assessment("花子") === assessment("花子"),
    "入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。"
  );
  console.log("同じ名前なら、同じ結果を出力することのテスト終了");
}

test();
