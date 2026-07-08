// SleepLog Ver.1

const sleepButton = document.querySelector(".sleep-btn");
const wakeButton = document.querySelector(".wake-btn");

const sleepTime = document.querySelector(".sleep-time");

const timeCards = document.querySelectorAll(".times h3");

let sleepStart = null;

sleepButton.addEventListener("click", () => {

    sleepStart = new Date();

    timeCards[0].textContent =
        sleepStart.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit"
        });

    alert("🌙 おやすみなさい！");
});

wakeButton.addEventListener("click", () => {

    if (!sleepStart) {
        alert("先に『おやすみ』を押してください！");
        return;
    }

    const wake = new Date();

    timeCards[1].textContent =
        wake.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit"
        });

    const diff = wake - sleepStart;

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    sleepTime.textContent =
        `${hours}時間${minutes}分`;

    alert("☀️ おはようございます！");
});
