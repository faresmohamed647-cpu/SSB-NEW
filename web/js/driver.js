// Navigation
const navLinks = document.querySelectorAll('.nav-link:not(.logout):not(.external-link)');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const themeToggleBtn = document.getElementById('themeToggle');
const THEME_STORAGE_KEY = 'safestep-theme';
const MOBILE_BREAKPOINT = 768;
const sidebarOverlay = document.createElement('div');
sidebarOverlay.className = 'sidebar-overlay';
document.body.appendChild(sidebarOverlay);

function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function setMenuToggleIcon(isOpen) {
    if (!menuToggle) return;
    const icon = menuToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
}

function setMobileSidebarState(isOpen) {
    if (!sidebar) return;

    if (!isMobileView()) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        setMenuToggleIcon(false);
        return;
    }

    sidebar.classList.toggle('active', isOpen);
    sidebarOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('sidebar-open', isOpen);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    setMenuToggleIcon(isOpen);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i><span>Light</span>'
        : '<i class="fas fa-moon"></i><span>Dark</span>';
}

function initThemeToggle() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    applyTheme(savedTheme);
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    });
}

initThemeToggle();

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        
        const pageId = link.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
        pageTitle.textContent = link.querySelector('span').textContent;
        
        if (pageId === 'route') {
            initRouteMap();
            initDriverGpsMap();
            startDriverGpsUpdates();
        } else {
            stopDriverGpsUpdates();
        }
        
        if (isMobileView()) setMobileSidebarState(false);
    });
});

// Logout
document.querySelector('.nav-link.logout').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Logging out...');
});

// Mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        setMobileSidebarState(!sidebar.classList.contains('active'));
    });
}

sidebarOverlay.addEventListener('click', () => setMobileSidebarState(false));

window.addEventListener('resize', () => {
    if (!isMobileView()) setMobileSidebarState(false);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileSidebarState(false);
});

setMobileSidebarState(false);

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('currentTime').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);

// Students Data
const studentsData = [
   { name: 'Ahmed Mohamed', grade: 'Grade 5', pickup: 'Corniche El-Nile, Alexandria', status: null },
    { name: 'Laila Ali', grade: 'Grade 3', pickup: 'El-Horreya St, Alexandria', status: null },
    { name: 'Youssef Ibrahim', grade: 'Grade 4', pickup: 'El-Gomhoreya St, Alexandria', status: null },
    { name: 'Nouran Hassan', grade: 'Grade 5', pickup: 'Sidi Gaber St, Alexandria', status: null },
    { name: 'Mariam Said', grade: 'Grade 2', pickup: 'Fleming St, Alexandria', status: null },
    { name: 'Mohamed Khaled', grade: 'Grade 4', pickup: 'Raml Station St, Alexandria', status: null },
    { name: 'Sara Abdallah', grade: 'Grade 3', pickup: 'El-Montaza St, Alexandria', status: null },
    { name: 'Omar Samir', grade: 'Grade 5', pickup: 'Sporting St, Alexandria', status: null },
    { name: 'Aya Mahmoud', grade: 'Grade 2', pickup: 'El-Raml St, Alexandria', status: null },
    { name: 'Karim Ali', grade: 'Grade 4', pickup: 'Smouha St, Alexandria', status: null },
    { name: 'Hana Mostafa', grade: 'Grade 3', pickup: 'El-Maamoura St, Alexandria', status: null },
    { name: 'Ahmed Sami', grade: 'Grade 5', pickup: 'El-Qasr El-Aini St, Alexandria', status: null },
    { name: 'Nada Ahmed', grade: 'Grade 2', pickup: 'Shubra St, Alexandria', status: null },
    { name: 'Yassin Reda', grade: 'Grade 4', pickup: 'El-Nasr St, Alexandria', status: null },
    { name: 'Donia Mahmoud', grade: 'Grade 3', pickup: 'El-Horreya St, Alexandria', status: null },
    { name: 'Ramy Mostafa', grade: 'Grade 5', pickup: 'El-Gameya St, Alexandria', status: null },
    { name: 'Hager Abdelrahman', grade: 'Grade 2', pickup: 'El-Montaza St, Alexandria', status: null },
    { name: 'Saif Mohamed', grade: 'Grade 4', pickup: 'El-Tayaran St, Alexandria', status: null },
    { name: 'Inas Ali', grade: 'Grade 3', pickup: 'El-Iskandariya St, Alexandria', status: null },
    { name: 'Ahmed Abdallah', grade: 'Grade 5', pickup: 'El-Horreya St, Alexandria', status: null },
    { name: 'Asmaa Hassan', grade: 'Grade 2', pickup: '26 July St, Alexandria', status: null },
    { name: 'Mahmoud Said', grade: 'Grade 4', pickup: 'El-Gameya St, Alexandria', status: null },
    { name: 'Nada Ali', grade: 'Grade 3', pickup: 'Fleming St, Alexandria', status: null },
    { name: 'Yassin Khaled', grade: 'Grade 5', pickup: 'Corniche El-Nile, Alexandria', status: null }
];

function renderStudents() {
    const studentsGrid = document.getElementById('studentsGrid');
    studentsGrid.innerHTML = '';
    
    studentsData.forEach((student, index) => {
        const initials = student.name.split(' ').map(n => n[0]).join('');
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <div class="student-info">
                <div class="student-avatar">${initials}</div>
                <div class="student-details">
                    <h4>${student.name}</h4>
                    <p>${student.grade} • ${student.pickup}</p>
                </div>
            </div>
            <div class="attendance-buttons">
                <button class="attendance-btn present" onclick="markAttendance(${index}, true)" 
                    ${student.status === true ? 'disabled' : ''}>
                    <i class="fas fa-check"></i> Present
                </button>
                <button class="attendance-btn absent" onclick="markAttendance(${index}, false)"
                    ${student.status === false ? 'disabled' : ''}>
                    <i class="fas fa-times"></i> Absent
                </button>
            </div>
        `;
        studentsGrid.appendChild(studentCard);
    });
    
    updateAttendanceSummary();
}

function markAttendance(index, isPresent) {
    studentsData[index].status = isPresent;
    renderStudents();
    if (!isPresent) {
        moveToNextStudentAfterCancel(index);
    }
}

function updateAttendanceSummary() {
    const presentCount = studentsData.filter(s => s.status === true).length;
    const absentCount = studentsData.filter(s => s.status === false).length;
    
    document.getElementById('summaryPresent').textContent = presentCount;
    document.getElementById('summaryAbsent').textContent = absentCount;
    document.getElementById('presentCount').textContent = presentCount;
}

renderStudents();

// Route Map + GPS
const stops = [
    { name: 'Terminal', address: 'School Bus Terminal, Alexandria', students: 0 },
    { name: 'Stop 1', address: 'Corniche El-Nile, Alexandria', students: 2 },
    { name: 'Stop 2', address: 'El-Horreya St, Alexandria', students: 3 },
    { name: 'Stop 3', address: 'Sidi Gaber St, Alexandria', students: 4 },
    { name: 'Stop 4', address: 'Fleming St, Alexandria', students: 2 },
    { name: 'Stop 5', address: 'Smouha St, Alexandria', students: 3 },
    { name: 'Stop 6', address: 'El-Montaza St, Alexandria', students: 5 },
    { name: 'Stop 7', address: 'Sporting St, Alexandria', students: 3 },
    { name: 'School', address: 'Alexandria National School', students: 0 }
];

function renderStops() {
    const stopsList = document.getElementById('stopsList');
    stopsList.innerHTML = '';
    
    stops.forEach((stop, index) => {
        const stopItem = document.createElement('div');
        stopItem.className = 'stop-item';
        stopItem.setAttribute('data-address', stop.address);
        stopItem.innerHTML = `
            <div class="stop-number">${index + 1}</div>
            <div class="stop-details">
                <h4>${stop.name}</h4>
                <p>${stop.address}${stop.students > 0 ? ` • ${stop.students} students` : ''}</p>
            </div>
            <i class="fas fa-${index === 0 ? 'flag' : (index === stops.length - 1 ? 'flag-checkered' : 'map-marker-alt')}"></i>
        `;
        stopsList.appendChild(stopItem);
    });
}

renderStops();

function initRouteMap() {
    const canvas = document.getElementById('routeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const routePoints = [
        { x: 50, y: 450 },
        { x: 150, y: 400 },
        { x: 250, y: 350 },
        { x: 350, y: 300 },
        { x: 450, y: 250 },
        { x: 550, y: 200 },
        { x: 650, y: 150 },
        { x: 750, y: 100 },
        { x: 850, y: 50 }
    ];
    
    // Draw route line
    ctx.strokeStyle = '#3182CE';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(routePoints[0].x, routePoints[0].y);
    for (let i = 1; i < routePoints.length; i++) {
        ctx.lineTo(routePoints[i].x, routePoints[i].y);
    }
    ctx.stroke();
    
    // Draw stops
    routePoints.forEach((point, index) => {
        // Stop circle
        ctx.fillStyle = index === 0 ? '#2ECC71' : (index === routePoints.length - 1 ? '#E74C3C' : '#3182CE');
        ctx.beginPath();
        ctx.arc(point.x, point.y, 12, 0, 2 * Math.PI);
        ctx.fill();
        
        // Stop number
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index + 1, point.x, point.y);
    });
}

let driverMap;
let driverMarker;
let nextStudentMarker;
let driverGpsInterval = null;

const stopCoordinatesByAddress = {
    'Corniche El-Nile, Alexandria': [31.2187, 29.9553],
    'El-Horreya St, Alexandria': [31.2089, 29.9116],
    'Sidi Gaber St, Alexandria': [31.2338, 29.9496],
    'Fleming St, Alexandria': [31.2350, 29.9756],
    'Smouha St, Alexandria': [31.2151, 29.9493],
    'El-Montaza St, Alexandria': [31.2816, 30.0130],
    'Sporting St, Alexandria': [31.2250, 29.9430],
    'Raml Station St, Alexandria': [31.1999, 29.8996],
    'El-Gomhoreya St, Alexandria': [31.1974, 29.9039],
    'El-Raml St, Alexandria': [31.2065, 29.9068],
    'El-Qasr El-Aini St, Alexandria': [31.2052, 29.9205],
    'Shubra St, Alexandria': [31.2098, 29.9259],
    'El-Nasr St, Alexandria': [31.2140, 29.9320],
    'El-Gameya St, Alexandria': [31.2169, 29.9408],
    'El-Tayaran St, Alexandria': [31.2246, 29.9348],
    'El-Iskandariya St, Alexandria': [31.2128, 29.9365],
    '26 July St, Alexandria': [31.2216, 29.9372]
};

function activatePage(pageId) {
    const navLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (navLink) navLink.click();
}

function getNextPendingStudentIndex(startFromIndex) {
    for (let i = startFromIndex + 1; i < studentsData.length; i++) {
        if (studentsData[i].status === null) return i;
    }
    for (let i = 0; i < studentsData.length; i++) {
        if (studentsData[i].status === null) return i;
    }
    return -1;
}

function highlightNextStopByAddress(address) {
    const stopItems = document.querySelectorAll('.stop-item');
    stopItems.forEach(item => item.classList.remove('current-target'));

    stopItems.forEach(item => {
        const details = item.querySelector('.stop-details p');
        if (details && details.textContent.includes(address)) {
            item.classList.add('current-target');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

function focusMapOnNextStudent(student) {
    if (!driverMap || !student) return;

    const coords = stopCoordinatesByAddress[student.pickup];
    if (!coords) return;

    driverMap.setView(coords, 14);

    if (!nextStudentMarker) {
        nextStudentMarker = L.marker(coords).addTo(driverMap);
    } else {
        nextStudentMarker.setLatLng(coords);
    }

    nextStudentMarker
        .bindPopup(`<strong>Next Pickup</strong><br>${student.name}<br>${student.pickup}`)
        .openPopup();
}

function moveToNextStudentAfterCancel(cancelledStudentIndex) {
    const nextIndex = getNextPendingStudentIndex(cancelledStudentIndex);
    if (nextIndex < 0) {
        alert('No remaining students waiting for pickup.');
        return;
    }

    const nextStudent = studentsData[nextIndex];
    activatePage('route');

    setTimeout(() => {
        highlightNextStopByAddress(nextStudent.pickup);
        focusMapOnNextStudent(nextStudent);
        alert(`Student canceled. Go to next pickup: ${nextStudent.name} - ${nextStudent.pickup}`);
    }, 250);
}

function initDriverGpsMap() {
    const el = document.getElementById('driverGpsMap');
    if (!el || typeof L === 'undefined') return;

    if (!driverMap) {
        driverMap = L.map('driverGpsMap').setView([31.21564, 29.95527], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(driverMap);

        driverMarker = L.marker([31.21564, 29.95527]).addTo(driverMap)
            .bindPopup('Current Bus Position');
    }

    updateDriverGpsFromApi();
}

async function updateDriverGpsFromApi() {
    try {
        const res = await fetch('http://localhost:4000/api/tracking');
        if (!res.ok) return;
        const data = await res.json();
        const { lat, lng } = data;

        if (driverMarker) {
            driverMarker.setLatLng([lat, lng]);
            if (driverMap) {
                driverMap.setView([lat, lng], driverMap.getZoom());
            }
        }
    } catch (err) {
        console.warn('Driver GPS API error', err);
    }
}

function startDriverGpsUpdates() {
    if (driverGpsInterval) return;
    driverGpsInterval = setInterval(updateDriverGpsFromApi, 10000);
}

function stopDriverGpsUpdates() {
    if (driverGpsInterval) {
        clearInterval(driverGpsInterval);
        driverGpsInterval = null;
    }
}

// Trip Management
let tripStartTime = null;
let tripInterval = null;
let tripDistance = 0;
let currentStop = 0;
let speedInterval = null;

const startTripBtn = document.getElementById('startTripBtn');
const pauseTripBtn = document.getElementById('pauseTripBtn');
const endTripBtn = document.getElementById('endTripBtn');
const tripStatus = document.getElementById('tripStatus');

function startTrip() {
    if (!tripStartTime) {
        tripStartTime = new Date();
        tripInterval = setInterval(updateTripInfo, 1000);
    }
    
    startTripBtn.disabled = true;
    pauseTripBtn.disabled = false;
    endTripBtn.disabled = false;
    
    tripStatus.innerHTML = '<i class="fas fa-circle" style="color: #2ECC71;"></i><span>Trip In Progress</span>';
    
    const statusCard = document.querySelector('.status-card');
    statusCard.className = 'card status-card on-route';
    document.getElementById('busStatusBadge').textContent = 'On Route';
    
    if (!speedInterval) {
        speedInterval = setInterval(() => {
            const speed = Math.floor(Math.random() * 20) + 35;
            document.getElementById('currentSpeed').textContent = speed;
            
            tripDistance += speed / 3600;
            document.getElementById('tripDistance').textContent = tripDistance.toFixed(1) + ' km';
        }, 1000);
    }
}

function pauseTrip() {
    if (tripInterval) {
        clearInterval(tripInterval);
        tripInterval = null;
    }
    if (speedInterval) {
        clearInterval(speedInterval);
        speedInterval = null;
    }
    
    startTripBtn.disabled = false;
    pauseTripBtn.disabled = true;
    
    tripStatus.innerHTML = '<i class="fas fa-circle" style="color: #F39C12;"></i><span>Trip Paused</span>';
}

function endTrip() {
    if (tripInterval) {
        clearInterval(tripInterval);
        tripInterval = null;
    }
    if (speedInterval) {
        clearInterval(speedInterval);
        speedInterval = null;
    }
    
    tripStartTime = null;
    tripDistance = 0;
    currentStop = 0;
    
    startTripBtn.disabled = false;
    pauseTripBtn.disabled = true;
    endTripBtn.disabled = true;
    
    tripStatus.innerHTML = '<i class="fas fa-circle" style="color: #95A5A6;"></i><span>Trip Completed</span>';
    
    const statusCard = document.querySelector('.status-card');
    statusCard.className = 'card status-card completed';
    document.getElementById('busStatusBadge').textContent = 'Trip Completed';
    
    document.getElementById('currentSpeed').textContent = '0';
    
    alert('Trip completed successfully!');
}

function updateTripInfo() {
    if (!tripStartTime) return;
    
    const now = new Date();
    const elapsed = Math.floor((now - tripStartTime) / 1000);
    
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    
    document.getElementById('tripDuration').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update progress
    const presentStudents = studentsData.filter(s => s.status === true).length;
    document.getElementById('tripStudents').textContent = `${presentStudents}/24`;
    
    // Simulate stops completion
    const progress = Math.min((elapsed / 180) * 100, 100);
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.floor(progress) + '% Complete';
    
    const completedStops = Math.floor((progress / 100) * 8);
    document.getElementById('tripStops').textContent = `${completedStops}/8`;
    document.getElementById('stopsText').textContent = `${completedStops}/8 Stops`;
}

if (startTripBtn) {
    startTripBtn.addEventListener('click', startTrip);
}

if (pauseTripBtn) {
    pauseTripBtn.addEventListener('click', pauseTrip);
}

if (endTripBtn) {
    endTripBtn.addEventListener('click', endTrip);
}

function saveTripNotes() {
    const notes = document.getElementById('tripNotes').value;
    if (notes.trim()) {
        alert('Trip notes saved successfully!');
    } else {
        alert('Please enter some notes before saving.');
    }
}

function sendAlert() {
    alert('Emergency alert sent to all parents!');
}

// Driver Notifications
const driverNotifications = [
    { id: 1, type: 'info', icon: 'fa-info-circle', title: 'Route Update', message: 'Stop 3 address changed to Fleming St, Alexandria', time: '2 hours ago', read: false },
    { id: 2, type: 'warning', icon: 'fa-exclamation-triangle', title: 'Weather Alert', message: 'Heavy rain expected tomorrow. Drive safely.', time: '5 hours ago', read: false },
    { id: 3, type: 'success', icon: 'fa-check-circle', title: 'Trip Completed', message: 'Morning route completed successfully at 8:15 AM', time: 'Yesterday', read: true }
];

function consumeParentAbsenceAlert() {
    try {
        const rawAlert = localStorage.getItem('driver_absence_alert');
        if (!rawAlert) return;

        const alertData = JSON.parse(rawAlert);
        if (!alertData || !alertData.child) return;

        driverNotifications.unshift({
            id: Date.now(),
            type: 'warning',
            icon: 'fa-user-slash',
            title: 'Student Absent Today',
            message: `${alertData.child} will not go to school today.`,
            time: 'Just now',
            read: false
        });

        renderDriverNotifications();
        localStorage.removeItem('driver_absence_alert');
    } catch (error) {
        console.warn('Failed to consume parent absence alert', error);
    }
}

function renderDriverNotifications() {
    const list = document.getElementById('driverNotificationsList');
    if (!list) return;
    list.innerHTML = driverNotifications.map(n => `
        <div class="notification-item ${n.read ? 'read' : ''}" data-id="${n.id}">
            <div class="notification-icon-wrap ${n.type}">
                <i class="fas ${n.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
                <span class="notification-time">${n.time}</span>
            </div>
        </div>
    `).join('');
}

// Trip History
const tripHistoryData = [
    { date: '2025-02-19', route: 'Morning Route', type: 'Pickup', duration: '1h 15m', students: 24, status: 'Completed' },
    { date: '2025-02-18', route: 'Afternoon Route', type: 'Drop-off', duration: '1h 10m', students: 24, status: 'Completed' },
    { date: '2025-02-18', route: 'Morning Route', type: 'Pickup', duration: '1h 12m', students: 23, status: 'Completed' },
    { date: '2025-02-17', route: 'Afternoon Route', type: 'Drop-off', duration: '1h 18m', students: 24, status: 'Completed' },
    { date: '2025-02-17', route: 'Morning Route', type: 'Pickup', duration: '1h 14m', students: 24, status: 'Completed' }
];

function renderTripHistory() {
    const tbody = document.getElementById('tripHistoryBody');
    if (!tbody) return;
    tbody.innerHTML = tripHistoryData.map(t => `
        <tr>
            <td>${new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</td>
            <td>${t.route}</td>
            <td><span class="badge badge-${t.type === 'Pickup' ? 'info' : 'success'}">${t.type}</span></td>
            <td>${t.duration}</td>
            <td>${t.students}</td>
            <td><span class="status-badge completed">${t.status}</span></td>
        </tr>
    `).join('');
}

// Init on notifications/trip-history page show
document.addEventListener('DOMContentLoaded', () => {
    renderDriverNotifications();
    renderTripHistory();
    consumeParentAbsenceAlert();
});

// Notification icon click -> go to notifications page
const notificationIcon = document.querySelector('.notification-icon');
if (notificationIcon) {
    notificationIcon.addEventListener('click', () => {
        const link = document.querySelector('.nav-link[data-page="notifications"]');
        if (link) {
            link.click();
        }
    });
}

console.log('🚌 Driver Dashboard initialized successfully!');
