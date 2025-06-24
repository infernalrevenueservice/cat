

const petBowl = [
    'images/food1.png',
    'images/food2.png',
    'images/food3.png',
    'images/food4.png',
    'images/food5.png',
    'images/food6.png'
    ];
    const feedButton = document.getElementById('feeder');
    const food = document.getElementById('myImg');
    let index = 0; 
    feedButton.addEventListener('click', () => {
        food.src=petBowl[index];
        index++;
        if (index < petBowl.length-1){
            omnom();
        }
        if(index == petBowl.length-1){
            feedButton.innerHTML='Refill';
        }
        if (index >= petBowl.length) {
            index = 0;
            feedButton.innerHTML=' Feed ';
        }
        
        
    });




function shortPress(){
        fetch('/short')      
}
function longPress(){
    fetch('/long')
}

    
let userName = '';
let catName = '';

// Show the name modal when page loads
window.onload = function() {
    document.getElementById('nameModal').style.display = 'flex';
    document.getElementById('nameInput').focus();
};

// Handle Enter key in name input
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        saveName();
    }
});
function saveCatName() {
    const catNameInput = document.getElementById('catNameInput');
    catName = catNameInput.value.trim();
    
    if (userName === '') {
        alert("Please enter your cat's name to continue!");
        catNameInput.focus();
        return;
    }

    updatePersonalizedContent();
}
function saveName() {
    const nameInput = document.getElementById('nameInput');
    userName = nameInput.value.trim();
    
    if (userName === '') {
        alert('Please enter your name to continue!');
        nameInput.focus();
        return;
    }


    // Hide modal
    document.getElementById('nameModal').style.display = 'none';
    
    // Update greeting
    document.getElementById('greeting').textContent = `Hello ${userName}! Welcome to the Playpen!`;
    
    // Update page content with personalized messages
    updatePersonalizedContent();
}

function updatePersonalizedContent() {

    const homePage = document.getElementById('home');
    const homeIntro = homePage.querySelector('p');
    homeIntro.textContent = `Welcome ${userName}! We're happy to have you and ${catName} here.`;

    const nomPage = document.getElementById('nom');
    const nomIntro = nomPage.querySelector('p');
    nomIntro.textContent = `${userName}, would you like to feed ${catName} a snack?`;

    const playPage = document.getElementById('play');
    const playIntro = playPage.querySelector('p');
    playIntro.textContent = `${catName} is feeling energized, can you play with them for a while?`;
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}
const originalColor = '#3498db';
let currentBrightness = 0;

function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;
    l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function adjustBrightness(color, amount) {
    const [h, s, l] = hexToHsl(color);
    const newL = Math.max(0, Math.min(100, l + amount));
    return hslToHex(h, s, newL);
}
function makeLighter() {
    currentBrightness += 10;
    const newColor = adjustBrightness(originalColor, currentBrightness);
    document.body.style.backgroundColor = newColor;
}

function makeDarker() {
    currentBrightness -= 10;
    const newColor = adjustBrightness(originalColor, currentBrightness);
    document.body.style.backgroundColor = newColor;
}

function resetBackground() {
    currentBrightness = 0;
     document.body.style.backgroundColor = originalColor;
} 

function omnom(){
    const om = document.getElementById('chomp');
    if (!om || om.error) {
    } else {
        om.currentTime = 0;
        om.play().catch(e => {
            console.log('Audio play failed, using beep instead');
        });
    }
}
function high(){
    const upAud = document.getElementById('up');
    if (!upAud || upAud.error) {
        beepHigh();
    } else {
        upAud.currentTime = 0;
        upAud.play().catch(e => {
            console.log('Audio play failed, using beep instead');
        });
    }
}
function mid(){
    const reAud = document.getElementById('magic');
    if (!reAud || reAud.error) {
        beepMed();
    } else {
        reAud.currentTime = 0;
        reAud.play().catch(e => {
            console.log('Audio play failed, using beep instead');
        });
    }
}
function low(){
    const downAud = document.getElementById('down');
    if (!downAud || downAud.error) {
        beepLow();
    } else {
        downAud.currentTime = 0;
        downAud.play().catch(e => {
            console.log('Audio play failed, using beep instead');
        });
    }
}
function beepHigh() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800; // Frequency in Hz
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}
function beepMed() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 528; // Frequency in Hz
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}
function beepLow() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 120; 
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
        console.log('Web Audio API not supported');
    }
}


function updateMaxHeight(source,target) {
    const sourceElement = document.getElementById(source);
    const targetElement = document.getElementById(target);
  const sourceHeight = sourceElement.offsetHeight;
  targetElement.style.setProperty('max-height', `${sourceHeight}px`, 'important');
  
}
window.addEventListener("load",heightMaxxer)

function heightMaxxer(){
    updateMaxHeight("home","target1");
    updateMaxHeight("nom","target2");
    updateMaxHeight("nom","myImg");
    updateMaxHeight("play","target3");
}
