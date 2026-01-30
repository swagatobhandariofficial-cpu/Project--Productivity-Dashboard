
const input = document.getElementById("cityInput");
const button = document.getElementById("checkBtn");
const result = document.getElementById("result");

async function pqr(city) {
  try {
    result.textContent = "Loading...";
    result.className = "result";

    const raw = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93bc8c534dced6b5c372972a29ae7236&units=metric`
    );

    if (!raw.ok) {
      throw new Error("City not found");
    }

    const real = await raw.json();
    const temp = real.main.temp;

    if (temp < 0) {
      result.textContent = `Too cold outside ❄️ (${temp} °C)`;
      result.classList.add("cold");
    } else if (temp > 32) {
      result.textContent = `Too hot outside 🔥 (${temp} °C)`;
      result.classList.add("hot");
    } else {
      result.textContent = `Moderate temperature 🌤️ (${temp} °C)`;
      result.classList.add("moderate");
    }

  } catch (err) {
    result.textContent = err.message;
    result.classList.add("error");
  }
}

button.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    pqr(city);
  }
});
