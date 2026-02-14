function openFeatures() {
    var allElems = document.querySelectorAll(".elem");
    var fullElemPage = document.querySelectorAll(".fullElem");
    var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");
    var mainSection = document.querySelector(".allElems");

    allElems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            mainSection.style.display = "none";   // hide dashboard
            fullElemPage[elem.id].style.display = "block";
        });
    });

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener("click", function () {
            fullElemPage[back.id].style.display = "none";
            mainSection.style.display = "block";  // show dashboard again
        });
    });
}

openFeatures();

function todoList() {
    var currentTask = [];

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
        console.log("Task list is Empty");
    }

    function renderTask() {
        var allTask = document.querySelector(".allTask");

        var sum = "";

        currentTask.forEach(function (elem, idx) {
            sum += `
    <div class="task">
        <div class="task-left">
            <h5 class="task-title" data-index="${idx}">
                ${elem.task}
                <span class="${elem.imp ? "true" : "false"}">imp</span>
            </h5>
            <p class="task-details" id="details-${idx}" style="display:none;">
                ${elem.details || "No details"}
            </p>
        </div>
        <button class="completebtn" data-index="${idx}">Mark as Completed</button>
    </div>`;
        });

        allTask.innerHTML = sum;

        document.querySelectorAll(".task-title").forEach(function (title) {
            title.addEventListener("click", function () {
                const index = title.dataset.index;
                const details = document.querySelector(`#details-${index}`);

                details.style.display =
                    details.style.display === "none" ? "block" : "none";
            });
        });

        localStorage.setItem("currentTask", JSON.stringify(currentTask));

        document.querySelectorAll(".completebtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const taskElement = btn.closest(".task");
        const index = btn.dataset.index;

        taskElement.classList.add("slide-out");

        setTimeout(function () {
            currentTask.splice(index, 1);
            renderTask();
        }, 400);
    });
});

    }
    renderTask();

    let form = document.querySelector(".addTask form");
    let taskInput = document.querySelector(".addTask form #task-input");
    let taskDetailsInput = document.querySelector(".addTask form textarea");
    let taskCheckbox = document.querySelector(".addTask form #check");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked,
        });
        renderTask();

        taskCheckbox.checked = false;
        taskInput.value = "";
        taskDetailsInput.value = "";
    });
}
todoList();

function dailyPlanner() {
    var dayPlanner = document.querySelector(".day-planner");

    var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

    var hours = Array.from({ length: 24 }, function (elem, idx) {
        const startHour = idx;
        const endHour = idx + 1 === 24 ? 0 : idx + 1;

        return `${String(startHour).padStart(2, "0")}:00 - ${String(endHour).padStart(2, "0")}:00`;
    });

    var wholeDaySum = " ";
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || "";

        wholeDaySum =
            wholeDaySum +
            `
            <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value="${savedData}">
            </div> `;
    });

    dayPlanner.innerHTML = wholeDaySum;

    var dayPlannerInput = document.querySelectorAll(".day-planner input");

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
        });
    });
}
dailyPlanner();

function motivationalQuote() {
    var motivationQuoteContent = document.querySelector(".motivation-2 h1");
    var motivationAuthor = document.querySelector(".motivation-3 h1");

    async function fetchQuote() {
        let response = await fetch("https://api.quotable.io/random");
        let data = await response.json();

        motivationQuoteContent.innerHTML = data.content;
        motivationAuthor.innerHTML = data.author;
    }

    fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
    let timer = document.querySelector(".pomo-timer h1");
    var startBtn = document.querySelector(".pomo-timer .start-timer");
    var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
    var resetBtn = document.querySelector(".pomo-timer .reset-timer");
    var session = document.querySelector(".pomodoro-fullpage .session");
    var isWorkSession = true;
    let totalSeconds = 25 * 60;
    let timerInterval = null;

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
    }

    function startTimer() {
        clearInterval(timerInterval);

        if (isWorkSession) {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimer();
                } else {
                    isWorkSession = false;
                    clearInterval(timerInterval);
                    timer.innerHTML = "05:00";
                    session.innerHTML = "Take a Break";
                    session.style.backgroundColor = "var(--blue)";
                    totalSeconds = 5 * 60;
                }
            }, 1000);
        } else {
            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimer();
                } else {
                    isWorkSession = true;
                    clearInterval(timerInterval);
                    timer.innerHTML = "25:00";
                    session.innerHTML = "Work Session";
                    session.style.backgroundColor = "var(--green)";
                    totalSeconds = 25 * 60;
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        totalSeconds = 25 * 60;
        clearInterval(timerInterval);
        updateTimer();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function head() {
    var apiKey = '6392884f89fd46879e4200600261202';
    var city = "Kolkata";

    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null
    async function weatherAPICall() {
        var response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,);
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`

    }
    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var date = new Date();
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarikh = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarikh} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);
}
head();

function dailyGoals() {
    let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

    const form = document.querySelector(".daily-goals-fullpage form");
    const titleInput = form.querySelector("#task-input");
    const detailsInput = form.querySelector("textarea");
    const allTaskBox = document.querySelector(".daily-goals-fullpage .allTask");

    function renderGoals() {
        allTaskBox.innerHTML = "";

        let sortedGoals = [
            ...goals.filter(g => g.pinned),
            ...goals.filter(g => !g.pinned)
        ];

        sortedGoals.forEach((goal, index) => {
            let goalDiv = document.createElement("div");
            goalDiv.className = `goal ${goal.pinned ? "pinned" : ""}`;

            goalDiv.innerHTML = `
                <div class="goal-left">
                    <h4>${goal.title}</h4>
                    <p>${goal.details || "No details"}</p>
                </div>
                <div class="goal-actions">
                    <button class="pin">${goal.pinned ? "Unpin" : "Pin"}</button>
                    <button class="delete">Done</button>
                </div>
            `;

            goalDiv.querySelector(".pin").addEventListener("click", () => {
                goal.pinned = !goal.pinned;
                saveAndRender();
            });

            goalDiv.querySelector(".delete").addEventListener("click", () => {
                goalDiv.classList.add("slide-out");

                setTimeout(() => {
                    goals = goals.filter(g => g !== goal);
                    saveAndRender();
                }, 400);
            });


            allTaskBox.appendChild(goalDiv);
        });
    }

    function saveAndRender() {
        localStorage.setItem("dailyGoals", JSON.stringify(goals));
        renderGoals();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        goals.push({
            title: titleInput.value,
            details: detailsInput.value,
            pinned: false
        });

        titleInput.value = "";
        detailsInput.value = "";
        saveAndRender();
    });

    renderGoals();
}
dailyGoals();


function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#20324bc8')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 3
        } else if (flag == 3) {
            rootElement.style.setProperty('--pri', '#F0E3CA')
            rootElement.style.setProperty('--sec', '#1B1A17')
            rootElement.style.setProperty('--tri2', 'linear-gradient(135deg, #ce5d0d, #bd7f14, #c18c05)')
            rootElement.style.setProperty('--tri1', '#ffb803')
            flag = 0
        }
    })
}
changeTheme()