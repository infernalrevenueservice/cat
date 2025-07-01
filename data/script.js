
const petBowl = [
    'images/bowl2.png',
    'images/bowl3.png',
    'images/bowl4.png',
    'images/bowl5.png',
    'images/bowl6.png',
    'images/bowl7.png',
    'images/bowl1.png'
    ];
    const feedButton = document.getElementById('feeder');
    let index = 0;
    let food = document.getElementById('bowlImg');
     
    feedButton.addEventListener('click', () => {
        food.src = petBowl[index];
        
        if (index < 5 || index == 6){
            omnom();
        }
        if(index == petBowl.length-2){
            feedButton.innerHTML='Refill';
        }
        
        index++;

        if (index >= petBowl.length) {
            index = 0;
            feedButton.innerHTML=' Feed ';
        }
        
        
    });

function farRightBean(){
    fetch('/short')      
}
function farLeftBean(){
    fetch('/long')
}
function leftBean(){
    high();
    makeLighter();
}
function rightBean(){
    low();
    makeDarker();
}
function pawPad(){
    mid();
    resetBackground();
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


window.addEventListener('resize', () => {
  let con = document.getElementById('target3');
  let image = document.getElementById('paw');
  let inWidth = con.clientWidth;
  let outWidth = image.offsetWidth;
  image.style.left = inWidth/2 - outWidth/2 + 'px';
});

window.addEventListener('resize', () => {
  let con = document.getElementById('target1');
  let image = document.getElementById('cat');
  let inWidth = con.clientWidth;
  let outWidth = image.offsetWidth;
  image.style.left = inWidth/2 - outWidth/2 + 'px';
});

window.addEventListener('resize', () => {
  let con = document.getElementById('target2');
  let image = document.getElementById('bowlImg');
  let inWidth = con.clientWidth;
  let outWidth = image.offsetWidth;
  image.style.left = inWidth/2 - outWidth/2 + 'px';
});

const targetDiv = document.getElementById('paw');

targetDiv.addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    where_paw_pressed = WherePressed(rect.width, rect.height, x, y);
});

function WherePressed(width, height, x, y){
  console.log(`total width:${width} total height:${height} clicked f:${x} clicked y:${y}`);
  
  const xp = (x/width)*100;
  const yp = (y/height)*100;
 
  if(((xp<=85.7)&&(xp>=75.4))&&((yp>=43.3)&&(yp<=46.9))||
((xp<=75.4)&&(xp>=71.4))&&((yp>=44.2)&&(yp<=46.9))||
((xp<=86.4)&&(xp>=67.7))&&((yp>=46.9)&&(yp<=55.7))||
((xp<=85.3)&&(xp>=68.6))&&((yp>=55.7)&&(yp<=58.4))||
((xp<=80.3)&&(xp>=72.1))&&((yp>=58.4)&&(yp<=59.1))){
    console.log("pressed RIGHT RIGHT");
    farRightBean();
  }
  if(((xp>=14.3)&&(xp<=24.6))&&((yp>=43.3)&&(yp<=46.9))||((xp>=24.6)&&(xp<=28.6))&&((yp>=44.2)&&(yp<=46.9))||((xp>=13.6)&&(xp<=32.3))&&((yp>=46.9)&&(yp<=55.7))||((xp>=14.7)&&(xp<=31.4))&&((yp>=55.7)&&(yp<=58.4))||((xp>=19.7)&&(xp<=27.9))&&((yp>=58.4)&&(yp<=59.1))){
    console.log("pressed LEFT LEFT");
    farLeftBean();
  }
  if(((xp<=70.6)&&(xp>=54.3))&&((yp>=26.3)&&(yp<=30.0))||
((xp<=72.4)&&(xp>=53.0))&&((yp>=30.0)&&(yp<=40.4))||
((xp<=65.7)&&(xp>=57.0))&&((yp>=42.7)&&(yp<=44.0))||
((xp<=69.2)&&(xp>=54.1))&&((yp>=40.4)&&(yp<=42.7))){
    console.log("pressed RIGHT");
    rightBean();
  }
  if(((xp>=29.4)&&(xp<=45.7))&&((yp>=26.3)&&(yp<=30.0))||((xp>=27.6)&&(xp<=47.0))&&((yp>=30.0)&&(yp<=40.4))||((xp>=34.3)&&(xp<=43.0))&&((yp>=42.7)&&(yp<=44.0))||((xp>=30.8)&&(xp<=45.9))&&((yp>=40.4)&&(yp<=42.7))){
    console.log("pressed LEFT");
    leftBean();
  }
  if(((xp>=44.3)&&(xp<=46.1))&&((yp>=44.4)&&(yp<=46.3))||((xp>=42.5)&&(xp<=46.1))&&((yp>=46.3)&&(yp<=48.2))||((xp>=40.5)&&(xp<=46.1))&&((yp>=48.2)&&(yp<=50.0))||((xp>=39.9)&&(xp<=40.5))&&((yp>=50.0)&&(yp<=50.9))||((xp>=38.3)&&(xp<=40.5))&&((yp>=50.9)&&(yp<=52.7))||((xp>=36.4)&&(xp<=40.5))&&((yp>=52.7)&&(yp<=55.1))||((xp>=34.3)&&(xp<=40.5))&&((yp>=55.1)&&(yp<=58.2))||((xp>=32.8)&&(xp<=34.0))&&((yp>=58.0)&&(yp<=61.0))||((xp>=31.7)&&(xp<=34.0))&&((yp>=61.0)&&(yp<=69.2))
||((xp<=66.0)&&(xp>=34.0))&&((yp<=71.4)&&(yp>=58.2))||((xp<=59.5)&&(xp>=40.5))&&((yp<=58.2)&&(yp>=50.0))||((xp<=46.1)&&(xp>=53.9))&&((yp<=50.0)&&(yp>=43.2))||((xp<=55.7)&&(xp>=53.9))&&((yp>=44.4)&&(yp<=46.3))||
((xp<=57.5)&&(xp>=53.9))&&((yp>=46.3)&&(yp<=48.2))||
((xp<=59.5)&&(xp>=53.9))&&((yp>=48.2)&&(yp<=50.0))||
((xp<=60.1)&&(xp>=59.5))&&((yp>=50.0)&&(yp<=50.9))||
((xp<=61.7)&&(xp>=59.5))&&((yp>=50.9)&&(yp<=52.7))||
((xp<=63.6)&&(xp>=59.5))&&((yp>=52.7)&&(yp<=55.1))||
((xp<=65.7)&&(xp>=59.5))&&((yp>=55.1)&&(yp<=58.2))||
((xp<=67.2)&&(xp>=66.0))&&((yp>=58.0)&&(yp<=61.0))||
((xp<=68.3)&&(xp>=66.0))&&((yp>=61.0)&&(yp<=69.2))
){
    console.log("pressed PAWPAD");
    pawPad();

  }
}
