// =====================================
// SleepLog Ver.2
// Part1
// =====================================

// ボタン
const sleepButton = document.querySelector(".sleep-btn");
const wakeButton = document.querySelector(".wake-btn");

// 表示
const sleepStartText = document.getElementById("sleepStart");
const wakeTimeText = document.getElementById("wakeTime");
const sleepTime = document.querySelector(".sleep-time");

const historyList = document.getElementById("historyList");

const weekAverage = document.getElementById("weekAverage");
const monthAverage = document.getElementById("monthAverage");

// データ保存
let sleepStart = null;

let records =
    JSON.parse(localStorage.getItem("sleepRecords")) || [];

// =====================================
// 保存
// =====================================

function saveRecords(){

    localStorage.setItem(
        "sleepRecords",
        JSON.stringify(records)
    );

}

// =====================================
// 時間表示
// =====================================

function formatTime(date){

    return date.toLocaleTimeString("ja-JP",{

        hour:"2-digit",

        minute:"2-digit"

    });

}

// =====================================
// 履歴表示
// =====================================

function renderHistory(){

    historyList.innerHTML="";

    if(records.length===0){

        historyList.innerHTML=
        "<p class='empty'>まだ記録がありません</p>";

        return;

    }

    records
    .slice()
    .reverse()
    .forEach(record=>{

        const item=document.createElement("div");

        item.className="history-item";

        item.innerHTML = `
<div style="display:flex;justify-content:space-between;align-items:center;width:100%;">

    <div>

        <div class="history-date">
            ${record.date}
        </div>

        <div class="history-duration">
            ${record.duration}
        </div>

    </div>

    <button class="delete-btn" onclick="deleteRecord(${records.indexOf(record)})">
        🗑️
    </button>

</div>
`;
        historyList.appendChild(item);

    });

}

// =====================================
// 平均計算
// =====================================

function updateAverage(){

    if(records.length===0){

        weekAverage.textContent="--時間";

        monthAverage.textContent="--時間";

        return;

    }

    let totalMinutes=0;

    records.forEach(record=>{

        totalMinutes+=record.minutes;

    });

    const avg=totalMinutes/records.length;

    const h=Math.floor(avg/60);

    const m=Math.round(avg%60);

    weekAverage.textContent=
        `${h}時間${m}分`;

    monthAverage.textContent=
        `${h}時間${m}分`;

}

// =====================================
// 初回表示
// =====================================

renderHistory();

updateAverage();
// =====================================
// Part2
// おやすみ・起床
// =====================================

// おやすみボタン
sleepButton.addEventListener("click", () => {

    sleepStart = new Date();
    localStorage.setItem(
    "currentSleepStart",
    sleepStart.toISOString()
);

    sleepStartText.textContent = formatTime(sleepStart);

    alert("🌙 おやすみなさい！");

});

// 起床ボタン
wakeButton.addEventListener("click", () => {

    if(!sleepStart){

        alert("先に『おやすみ』を押してください！");

        return;

    }

    const wakeTime = new Date();

    wakeTimeText.textContent = formatTime(wakeTime);

    const diff = wakeTime - sleepStart;

    const minutes = Math.floor(diff / 1000 / 60);

    const hours = Math.floor(minutes / 60);

    const remainMinutes = minutes % 60;

    sleepTime.textContent =
        `${hours}時間${remainMinutes}分`;

    // 今日の日付
    const today =
        new Date().toLocaleDateString("ja-JP");

    // 記録追加
    records.push({

        date: today,

        start: formatTime(sleepStart),

        end: formatTime(wakeTime),

        duration: `${hours}時間${remainMinutes}分`,

        minutes: minutes

    });

    // 保存
    saveRecords();

    // 表示更新
    renderHistory();

    updateAverage();

    // リセット
    sleepStart = null;
    localStorage.removeItem(
    "currentSleepStart"
);

    alert("☀️ おはようございます！");

});
// =====================================
// Part3
// 初期化・データ更新
// =====================================

// 最新の記録を表示
function refreshUI(){

    renderHistory();

    updateAverage();

}

// ページを開いた時
window.addEventListener("load",()=>{

    // 就寝時間を復元
    const savedSleep =
        localStorage.getItem("currentSleepStart");

    if(savedSleep){

        sleepStart = new Date(savedSleep);

        sleepStartText.textContent =
            formatTime(sleepStart);

    }

    refreshUI();

});

// ================================
// 開発用（あとでグラフを追加）
// ================================

function getRecords(){

    return records;

}

// グラフ更新用
function updateChart(){

    // Ver.3で実装予定

}

// データ保存後にグラフ更新
const originalSaveRecords = saveRecords;

saveRecords = function(){

    originalSaveRecords();

    updateChart();

};
// ======================
// 記録削除
// ======================

function deleteRecord(index){

    const ok = confirm("この記録を削除しますか？");

    if(!ok) return;

    records.splice(index,1);

    saveRecords();

    renderHistory();

    updateAverage();

    updateChart();

}
