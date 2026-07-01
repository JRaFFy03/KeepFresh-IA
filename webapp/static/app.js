// Sesión del usuario establecida por defecto a José Maldonado
let userSession = {
    name: "José",
    lastname: "Maldonado",
    username: "KeepFresh_User",
    idCard: "4-831-1204",
    bio: "¡Pensemos en la naturaleza!",
    password: "password123"
};

let foodHistory = [
    { id: 1, name: "Lechuga Romana 🥬", date: "24/06/2026", daysLeft: 2, status: "warning" },
    { id: 2, name: "Leche Entera 🥛", date: "20/06/2026", daysLeft: 0, status: "expired" }
];

const catalogData = {
    fruits: [
        { name: "Manzana", emoji: "🍎", shelfLife: "15-20 días", care: "Mantener en un lugar fresco o refrigeradas si están muy maduras. Separar de otras frutas porque aceleran su maduración.", recipe: "Compota de manzana express con canela o rodajas delgadas horneadas con avena.", expiredAction: "♻️ Excelente para compost doméstico. Si no presenta moho severo y solo está blanda, puedes enterrar la cáscara en macetas." },
        { name: "Plátano / Banano", emoji: "🍌", shelfLife: "5-7 días", care: "No refrigerar mientras estén verdes. Envolver los tallos superiores en plástico transparente.", recipe: "Pan de banano casero, panquecas saludables o licuado energético congelando trozos.", expiredAction: "🍌 ¡Abono de Potasio! Corta la cáscara en trozos y ponla a hervir en agua por 15 minutos para crear un té de riego nutritivo." },
        { name: "Fresas", emoji: "🍓", shelfLife: "3-5 días", care: "No lavarlas ni quitarles el tallo verde hasta consumirlas. Guardar en envase ventilado con papel absorbente.", recipe: "Mermelada rápida machacándolas a fuego lento con una cucharada de azúcar.", expiredAction: "⚠️ Alerta de Hongos: Si muestran micelio blanco o gris, NO deben compostarse; deséchalas en la basura orgánica cerrada." },
        { name: "Aguacate", emoji: "🥑", shelfLife: "4-6 días", care: "Si está abierto, deja la semilla adentro, unta unas gotas de limón y envuelve firmemente en film plástico.", recipe: "Guacamole casero tradicional o crema untable sazonada para emparedados.", expiredAction: "🌱 Si su pulpa se ennegrece, retira el hueso central para germinar tu propio árbol. La pulpa va directo al contenedor de compost." },
        { name: "Naranja", emoji: "🍊", shelfLife: "10-14 días", care: "Conservar a temperatura ambiente en frutero ventilado. Evitar bolsas plásticas cerradas.", recipe: "Zumo natural matutino o usar la ralladura fina de la cáscara para aromatizar bizcochos.", expiredAction: "🦟 ¡Repelente natural! Deja secar su cáscara al sol y tritúrala; esparcida alrededor de las plantas repele hormigas." }
    ],
    vegetables: [
        { name: "Tomate", emoji: "🍅", shelfLife: "7-10 días", care: "Guardar boca abajo sobre su tallo fuera de la nevera si les falta madurar. El frío altera su textura.", recipe: "Salsa pomodoro casera para pastas, sopa concentrada o tomates asados.", expiredAction: "🍅 Extracción de semillas. Si está demasiado blando, córtalo, extrae las semillas, sécalas y siémbralas en tu huerto." },
        { name: "Zanahoria", emoji: "🥕", shelfLife: "21-30 días", care: "Cortar las hojas verdes antes de guardar. Colocar en el cajón de la nevera en un paño húmedo.", recipe: "Crema caliente de zanahoria y jengibre o bastoncillos sazonados horneados.", expiredAction: "♻️ Pícala en rodajas muy delgadas antes de echarla a la pila de compostaje para acelerar la descomposición por microorganismos." },
        { name: "Brócoli", emoji: "🥦", shelfLife: "5-7 días", care: "Envolver ramilletes de forma suelta en un plástico perforado húmedo dentro del refrigerador.", recipe: "Tortitas de brócoli rallado con queso, crema vegetal o salteado al wok.", expiredAction: "🥦 Nutrientes del suelo. Cuando se torna amarillo pierde sus vitaminas pero es rico en azufre. Trocéalo e incorpóralo al jardín." },
        { name: "Espinaca", emoji: "🥬", shelfLife: "4-6 días", care: "Asegurarse de que estén secas. Almacenar en recipiente hermético intercalando papel toalla.", recipe: "Espinacas salteadas express con ajo o integradas directamente en una tortilla.", expiredAction: "🍂 Nitrógeno puro. Las hojas marchitas son un 'ingrediente verde' idóneo para balancear tu compostera húmeda." },
        { name: "Papa / Patata", emoji: "🥔", shelfLife: "30-45 días", care: "Almacenar en lugar oscuro, seco y bien aireado. Nunca guardar junto a las cebollas.", recipe: "Puré de papas rústico o papas en gajo sazonadas al horno.", expiredAction: "🌱 Si le salen brotes ya no se come por la solanina. ¡Siembrala entera en una maceta para cosechar nuevas papas!" }
    ]
};

let currentScanMode = "individual"; 
let currentCatalogTab = "fruits";

// CONTROL DE SCROLL DINÁMICO (Scroll-to-Hide) STYLE YOUTUBE
let lastScrollTop = 0;
function handleScrollDetection(element) {
    const navBar = document.getElementById('app-bottom-nav');
    if (!navBar || navBar.style.display === 'none') return;

    let scrollTop = element.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 10) {
        navBar.classList.add('nav-hidden');
    } else {
        navBar.classList.remove('nav-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// FUNCIÓN PRINCIPAL DE CAMBIO DE PANTALLA (CON FILTRADO ESTRICTO DE BARRA INFERIOR)
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    const navBar = document.getElementById('app-bottom-nav');
    const systemMainViews = ['screen-scan-selector', 'screen-catalog', 'screen-history', 'screen-profile'];
    
    if (navBar) {
        if (systemMainViews.includes(screenId)) {
            navBar.style.display = 'flex';
            navBar.classList.remove('nav-hidden'); 
            updateActiveNavTab(screenId);
        } else {
            navBar.style.display = 'none';
        }
    }

    // GESTIÓN AUTOMÁTICA DE LA CÁMARA E IA DESDE EL HTML
    if (screenId === 'screen-app-main') {
        if (typeof iniciarWebcamIA === 'function') {
            iniciarWebcamIA();
        }
        setupCameraModeUI();
    } else {
        if (typeof detenerWebcam === 'function') {
            detenerWebcam();
        }
    }

    if (screenId === 'screen-history') { renderHistoryList(); }
    if (screenId === 'screen-catalog') { renderCatalog(); }
}

function updateActiveNavTab(screenId) {
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    if (screenId === 'screen-scan-selector') document.getElementById('nav-item-home').classList.add('active');
    if (screenId === 'screen-catalog') document.getElementById('nav-item-catalog').classList.add('active');
    if (screenId === 'screen-history') document.getElementById('nav-item-history').classList.add('active');
    if (screenId === 'screen-profile') document.getElementById('nav-item-profile').classList.add('active');
}

function updateUIElements() {
    document.getElementById('profile-display-name').innerText = userSession.name;
    document.getElementById('profile-val-name').innerText = userSession.name;
    document.getElementById('profile-val-id').innerText = userSession.idCard;
    document.getElementById('profile-val-user').innerText = userSession.username;
    document.getElementById('profile-val-bio').innerText = userSession.bio;
}

function selectScanMode(mode) {
    currentScanMode = mode;
    switchScreen('screen-app-main');
}

function setupCameraModeUI() {
    const title = document.getElementById('camera-title-mode');
    const instructions = document.getElementById('camera-instructions-text');
    const btn = document.getElementById('action-camera-btn');

    if (currentScanMode === "individual") {
        title.innerText = "Modo Individual";
        instructions.innerText = "Enfoque un único alimento para analizarlo en tiempo real.";
        btn.innerText = "📍 Analizar Producto";
    } else {
        title.innerText = "Modo Múltiple";
        instructions.innerText = "Enfoque el grupo de productos para un escaneo rápido.";
        btn.innerText = "📍 Analizar Grupo";
    }
}

// FUNCIÓN PARA ENLAZAR LA IA DEL HTML CON LA LISTA EN MEMORIA DEL HISTORIAL
function addScannedToHistory() {
    const nameText = document.getElementById("scanned-name").innerText;
    const statusText = document.getElementById("scanned-status").innerText;
    
    if (nameText && nameText !== "Alimento") {
        const today = new Date();
        const dateString = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
        
        // Mapear estados visuales a las clases del historial
        let internalStatus = "fresh";
        if (statusText.includes("Riesgo") || statusText.includes("Vencido") || statusText.includes("Mal")) {
            internalStatus = "expired";
        }

        // Agregar al inicio del array del historial local
        foodHistory.unshift({
            id: Date.now(),
            name: nameText,
            date: dateString,
            daysLeft: internalStatus === "fresh" ? 7 : 0, // Días sugeridos base
            status: internalStatus
        });

        alert(`¡${nameText} guardado con éxito en el historial!`);
        switchScreen('screen-history');
    }
}

function renderHistoryList() {
    const container = document.getElementById('history-list');
    const clearAllBtn = document.getElementById('clear-all-btn');
    container.innerHTML = "";

    if (foodHistory.length === 0) {
        container.innerHTML = `<div class="history-empty">No hay registros de alimentos.</div>`;
        clearAllBtn.style.display = "none";
        return;
    }

    clearAllBtn.style.display = "block";

    foodHistory.forEach(item => {
        let badgeClass = item.status;
        let countdownText = `${item.daysLeft} días`;

        if (item.status === 'expired') countdownText = "🔴 Controlar";
        else if (item.status === 'warning') countdownText = `🔸 Quedan ${item.daysLeft} d`;

        const card = document.createElement('div');
        card.className = "history-card";
        card.innerHTML = `
            <div class="history-info-main">
                <span class="history-food-name">${item.name}</span>
                <span class="history-food-date">Ingreso: ${item.date}</span>
            </div>
            <div class="history-right-side">
                <div class="countdown-badge ${badgeClass}">${countdownText}</div>
                <button class="delete-item-btn" onclick="deleteSingleFood(${item.id})">🗑️</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function deleteSingleFood(id) {
    if (confirm("¿Estás seguro de eliminar este registro del historial?")) {
        foodHistory = foodHistory.filter(item => item.id !== id);
        renderHistoryList();
    }
}

function clearEntireHistory() {
    if (confirm("¿Seguro que deseas borrar TODO el historial de registros?")) {
        foodHistory = [];
        renderHistoryList();
    }
}

function switchCatalogTab(tab) {
    currentCatalogTab = tab;
    document.getElementById('tab-cat-fruits').classList.toggle('active', tab === 'fruits');
    document.getElementById('tab-cat-vegetables').classList.toggle('active', tab === 'vegetables');
    renderCatalog();
}

function renderCatalog() {
    const container = document.getElementById('catalog-list');
    container.innerHTML = "";
    const items = catalogData[currentCatalogTab];

    items.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = "catalog-item-card";
        itemCard.id = `cat-card-${index}`;
        itemCard.innerHTML = `
            <div class="catalog-item-header" onclick="toggleCatalogAccordion(${index})">
                <div class="catalog-title-side">
                    <span>${item.emoji}</span>
                    <span>${item.name}</span>
                </div>
                <span class="catalog-days-badge">⏳ ~${item.shelfLife}</span>
            </div>
            <div class="catalog-item-details">
                <div class="detail-section">
                    <h5>💡 Cuidados Esenciales:</h5>
                    <p>${item.care}</p>
                </div>
                <div class="detail-section">
                    <h5>🍳 Receta Anti-Desperdicio:</h5>
                    <p>${item.recipe}</p>
                </div>
                <div class="detail-section expired-action-box">
                    <h5>♻️ Acción ante Vencimiento:</h5>
                    <p>${item.expiredAction}</p>
                </div>
            </div>
        `;
        container.appendChild(itemCard);
    });
}

function toggleCatalogAccordion(index) {
    const card = document.getElementById(`cat-card-${index}`);
    if (card) {
        const isExpanded = card.classList.contains('expanded');
        document.querySelectorAll('.catalog-item-card').forEach(c => c.classList.remove('expanded'));
        if (!isExpanded) card.classList.add('expanded');
    }
}

function handleRegister() {
    userSession.name = document.getElementById('reg-name').value || "José";
    userSession.lastname = document.getElementById('reg-lastname').value || "Maldonado";
    userSession.username = document.getElementById('reg-username').value;
    userSession.password = document.getElementById('reg-password').value;
    userSession.idCard = document.getElementById('reg-id').value || "No registrada";

    alert("¡Cuenta creada con éxito!");
    updateUIElements();
    switchScreen('screen-login');
}

function handleLogin() {
    const u = document.getElementById('login-username').value;
    const p = document.getElementById('login-password').value;
    if (u === userSession.username && p === userSession.password) {
        updateUIElements();
        switchScreen('screen-scan-selector');
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function openBioModal() { 
    document.getElementById('input-new-bio').value = userSession.bio; 
    document.getElementById('modal-bio').style.display = 'flex'; 
}
function closeBioModal() { document.getElementById('modal-bio').style.display = 'none'; }
function saveBio() { 
    userSession.bio = document.getElementById('input-new-bio').value || "¡Pensemos en la naturaleza!"; 
    updateUIElements(); 
    closeBioModal(); 
}

function openPassModal() { 
    document.getElementById('input-new-pass').value = ""; 
    document.getElementById('modal-password').style.display = 'flex'; 
}
function closePassModal() { document.getElementById('modal-password').style.display = 'none'; }
function savePassword() {
    const np = document.getElementById('input-new-pass').value;
    if(!np.trim()) { alert("La contraseña no puede estar vacía."); return; }
    userSession.password = np;
    alert("Contraseña modificada con éxito.");
    closePassModal();
}

function logout() { switchScreen('screen-welcome'); }

window.onload = function() { updateUIElements(); };