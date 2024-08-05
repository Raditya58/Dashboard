const MAX_LOG_ENTRIES = 1; // Maximum number of log entries to keep

// Helper function to get formatted date and time
function getFormattedDateTime() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const now = new Date();
    const dayOfWeek = days[now.getDay()]; // Day of the week (0-6)
    const day = now.getDate(); // Day of the month (1-31)
    const month = months[now.getMonth()]; // Month (0-11)
    const year = now.getFullYear(); // Year
    const hours = String(now.getHours()).padStart(2, '0'); // Hours (00-23)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes (00-59)

    return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}`;
}

// Check if enough time has passed since the last click
function canClickAgain(buttonType) {
    const lastClick = localStorage.getItem(buttonType);
    if (!lastClick) return true;

    const now = new Date().getTime();
    const lastClickTime = new Date(lastClick).getTime();
    const oneMinute = 60 * 1000; // 1 minute in milliseconds

    return (now - lastClickTime) >= oneMinute;
}

// Update the button click state with the current timestamp
function updateClickState(buttonType) {
    const now = new Date().toISOString();
    localStorage.setItem(buttonType, now);
}

// Add activity to the log and save to localStorage
function addActivity(activityText) {
    // Get the current formatted date and time
    const formattedDateTime = getFormattedDateTime();
    const logItemText = `${formattedDateTime}: ${activityText}`;

    // Retrieve existing log items from localStorage
    let logEntries = JSON.parse(localStorage.getItem('logEntries')) || [];

    // Add the new entry
    logEntries.push(logItemText);

    // Ensure we keep only the latest MAX_LOG_ENTRIES entries
    if (logEntries.length > MAX_LOG_ENTRIES) {
        logEntries.shift(); // Remove the oldest entry
    }

    // Save updated log entries to localStorage
    localStorage.setItem('logEntries', JSON.stringify(logEntries));

    // Update the displayed log list
    updateLogList();
}

// Function to handle button clicks
function handleButtonClick(buttonType) {
    if (canClickAgain(buttonType)) {
        addActivity(buttonType === 'jamMasuk' ? 'Jam Masuk' : 'Jam Keluar');
        updateClickState(buttonType);

        // Disable the button after clicking
        const button = document.querySelector(`button[onclick="handleButtonClick('${buttonType}')"]`);
        if (button) {
            button.disabled = true;
            button.style.backgroundColor = 'grey'; // Change color to indicate disabled state
        }

        alert(`Anda telah berhasil mengklik ${buttonType === 'jamMasuk' ? 'Jam Masuk' : 'Jam Keluar'}`);
    } else {
        const remainingTime = Math.ceil(((new Date().getTime() - new Date(localStorage.getItem(buttonType)).getTime()) / 1000 / 60));
        alert(`Anda harus menunggu ${remainingTime} menit sebelum mengklik lagi.`);
    }
}

// Update the displayed log list from localStorage
function updateLogList() {
    const logList = document.getElementById('log-list');
    logList.innerHTML = ''; // Clear the current list

    const logEntries = JSON.parse(localStorage.getItem('logEntries')) || [];
    logEntries.forEach(entry => {
        const logItem = document.createElement('li');
        logItem.textContent = entry;
        logItem.style.fontWeight = 'bold'; // Make the log item text bold
        logList.appendChild(logItem);
    });
}

// Update clock
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = 'AM';

    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12; // Midnight case
    }

    // Pad minutes with leading zeros if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Format hours to 12-hour format
    hours = hours < 10 ? '0' + hours : hours;

    // Construct the time string
    const timeString = `${hours}:${minutes} ${period}`;

    // Update the clock element
    clockElement.textContent = timeString;
}

// Update the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize button states and log list on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize buttons state
    if (!canClickAgain('jamMasuk')) {
        const jamMasukButton = document.querySelector('button[onclick="handleButtonClick(\'jamMasuk\')"]');
        if (jamMasukButton) {
            jamMasukButton.disabled = true;
            jamMasukButton.style.backgroundColor = 'grey'; // Change color to indicate disabled state
        }
    }

    if (!canClickAgain('jamKeluar')) {
        const jamKeluarButton = document.querySelector('button[onclick="handleButtonClick(\'jamKeluar\')"]');
        if (jamKeluarButton) {
            jamKeluarButton.disabled = true;
            jamKeluarButton.style.backgroundColor = 'grey'; // Change color to indicate disabled state
        }
    }

    // Update the log list
    updateLogList();
});
