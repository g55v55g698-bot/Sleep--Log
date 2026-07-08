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

        item.innerHTML=`

            <span class="history-date">
                ${record.date}
            </span>

            <span class="history-duration">
                ${record.duration}
            </span>

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
