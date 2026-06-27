// Time Zone Configuration
const timeZones = {
    'Pacific/Honolulu': { name: 'Hawaii', shortName: 'HST' },
    'America/Anchorage': { name: 'Alaska', shortName: 'AKST/AKDT' },
    'America/Los_Angeles': { name: 'Pacific', shortName: 'PST/PDT' },
    'America/Denver': { name: 'Mountain', shortName: 'MST/MDT' },
    'America/Chicago': { name: 'Central', shortName: 'CST/CDT' },
    'America/New_York': { name: 'Eastern', shortName: 'EST/EDT' }
};

// DOM Elements
const sourceTimezone = document.getElementById('source-timezone');
const targetTimezone = document.getElementById('target-timezone');
const datetimeInput = document.getElementById('datetime-input');
const swapBtn = document.getElementById('swap-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeDateTime();
    setupEventListeners();
    updateLiveTimes();
    loadTheme();
    
    // Update every second
    setInterval(updateLiveTimes, 1000);
});

// Initialize with current date/time in source timezone
function initializeDateTime() {
    const now = new Date();
    const sourceTz = sourceTimezone.value;
    
    // Get current time in source timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceTz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const getValue = (type) => parts.find(p => p.type === type)?.value;
    
    const year = getValue('year');
    const month = getValue('month');
    const day = getValue('day');
    const hours = getValue('hour');
    const minutes = getValue('minute');
    
    datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    updateComparison();
}

// Setup Event Listeners
function setupEventListeners() {
    sourceTimezone.addEventListener('change', () => {
        updateTimezoneInfo('source');
        updateComparison();
    });
    
    targetTimezone.addEventListener('change', () => {
        updateTimezoneInfo('target');
        updateComparison();
    });
    
    datetimeInput.addEventListener('change', updateComparison);
    datetimeInput.addEventListener('input', updateComparison);
    
    swapBtn.addEventListener('click', swapTimezones);
    
    copyBtn.addEventListener('click', copyToClipboard);
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize timezone info
    updateTimezoneInfo('source');
    updateTimezoneInfo('target');
}

// Update Timezone Info (abbreviation)
function updateTimezoneInfo(type) {
    const select = type === 'source' ? sourceTimezone : targetTimezone;
    const timezone = select.value;
    const date = new Date();
    
    // Get timezone abbreviation
    const abbr = getTimezoneAbbreviation(timezone, date);
    document.getElementById(`${type}-abbr`).textContent = abbr;
}

// Get Timezone Abbreviation
function getTimezoneAbbreviation(timezone, date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(part => part.type === 'timeZoneName');
    return tzPart ? tzPart.value : '';
}

// Update Comparison - THE FIX
function updateComparison() {
    if (!datetimeInput.value) return;
    
    const inputValue = datetimeInput.value; // e.g., "2026-06-20T11:17"
    const [datePart, timePart] = inputValue.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    const sourceTz = sourceTimezone.value;
    const targetTz = targetTimezone.value;
    
    // Create a moment in time by treating the input as being in the SOURCE timezone
    // We'll use UTC as our reference point
    const sourceOffset = getTimezoneOffset(sourceTz, year, month, day, hours, minutes);
    
    // This is the UTC timestamp for the selected time IN THE SOURCE TIMEZONE
    const utcTimestamp = Date.UTC(year, month - 1, day, hours, minutes, 0) - (sourceOffset * 60 * 1000);
    const referenceDate = new Date(utcTimestamp);
    
    // Now format this moment in both timezones
    const sourceTimeStr = formatTime(referenceDate, sourceTz);
    const sourceDateStr = formatDate(referenceDate, sourceTz);
    
    document.getElementById('source-time').textContent = sourceTimeStr;
    document.getElementById('source-date').textContent = sourceDateStr;
    
    const targetTimeStr = formatTime(referenceDate, targetTz);
    const targetDateStr = formatDate(referenceDate, targetTz);
    
    document.getElementById('target-time').textContent = targetTimeStr;
    document.getElementById('target-date').textContent = targetDateStr;
    
    // Calculate the difference in standard offsets
    const targetOffset = getTimezoneOffset(targetTz, year, month, day, hours, minutes);
    const diffMinutes = targetOffset - sourceOffset;
    
    const diffText = formatTimeDifference(diffMinutes);
    document.getElementById('time-diff').textContent = diffText;
}

// Get timezone offset in minutes from UTC
function getTimezoneOffset(timezone, year, month, day, hour, minute) {
    // Create a date in UTC
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
    
    // Format it in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(utcDate);
    const getValue = (type) => parts.find(p => p.type === type)?.value;
    
    const tzYear = parseInt(getValue('year'), 10);
    const tzMonth = parseInt(getValue('month'), 10);
    const tzDay = parseInt(getValue('day'), 10);
    const tzHour = parseInt(getValue('hour'), 10);
    const tzMinute = parseInt(getValue('minute'), 10);
    
    // Calculate the difference
    const utcTime = Date.UTC(year, month - 1, day, hour, minute, 0);
    const tzTime = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, 0);
    
    // Offset in minutes
    return (tzTime - utcTime) / (1000 * 60);
}

// Format time in 12-hour format
function formatTime(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return formatter.format(date);
}

// Format date
function formatDate(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return formatter.format(date);
}

// Format time difference
function formatTimeDifference(minutes) {
    if (minutes === 0) {
        return 'Same time';
    }
    
    const hours = Math.floor(Math.abs(minutes) / 60);
    const mins = Math.abs(minutes) % 60;
    const sign = minutes > 0 ? '+' : '-';
    
    if (mins === 0) {
        return `${sign}${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    return `${sign}${hours}h ${mins}m`;
}

// Swap Timezones
function swapTimezones() {
    const sourceValue = sourceTimezone.value;
    const targetValue = targetTimezone.value;
    
    sourceTimezone.value = targetValue;
    targetTimezone.value = sourceValue;
    
    updateTimezoneInfo('source');
    updateTimezoneInfo('target');
    updateComparison();
}

// Copy to Clipboard
function copyToClipboard() {
    const targetTime = document.getElementById('target-time').textContent;
    const targetDate = document.getElementById('target-date').textContent;
    const targetTzName = targetTimezone.options[targetTimezone.selectedIndex].text;
    
    if (targetTime === '--:--' || !targetTime) {
        showToast('⚠️ Please select a date and time first');
        return;
    }
    
    const text = `${targetTime} on ${targetDate} (${targetTzName})`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('✅ Copied to clipboard!');
        }).catch(() => {
            showToast('❌ Failed to copy');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('✅ Copied to clipboard!');
        } catch (err) {
            showToast('❌ Failed to copy');
        }
        document.body.removeChild(textArea);
    }
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update Live Times
function updateLiveTimes() {
    const now = new Date();
    
    Object.keys(timeZones).forEach(tz => {
        const timeStr = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);
        
        const zoneName = timeZones[tz].name.toLowerCase();
        const liveTimeEl = document.getElementById(`live-${zoneName}`);
        
        if (liveTimeEl) liveTimeEl.textContent = timeStr;
    });
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load Theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}
