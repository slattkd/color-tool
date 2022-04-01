let x = 0;
let y = 0;
let width = 0;
let height = 0;
const diff = 50;

let h = 0;
let s = 0;
let l = 0;

let justClicked = false;

const colorText = document.getElementById('color');

window.addEventListener('mousemove', function(event) {
	if (event.pageX > x + diff || event.pageX < x - diff) {
		x = event.pageX;
	}
	if (event.pageY > y + diff || event.pageY < y - diff) {
		x = event.pageX;
		y = event.pageY;
	}
})

function setSize() {
	width = window.innerWidth;
	height = window.innerHeight;
}

window.onresize = setSize;

window.onload = setSize;



mycanvas = document.getElementById("mycanvas");
window.addEventListener('mousemove', function(event) {
   mycanvas.style.top = event.clientY + "px";
   mycanvas.style.left = event.clientX + "px";
	h = Math.round((event.clientX / width) * 360);
	l = Math.round(event.clientY / height * 100);
	s = 70;
	if (!justClicked) {
		const hsl = `hsl(${h},${s}%,${l}%)`;
		mycanvas.style.backgroundColor = hsl;
	}
}, false);

window.addEventListener('click', function() {
	let bg = document.querySelector('body');
	const hsl = `hsl(${h},${s}%,${l}%)`;
	colorText.style.color = hsl;
	bg.style.backgroundColor = hsl;
	mycanvas.classList.add('clicked');
	justClicked = true;
	HSLToHex();
	setTimeout(function() {
		mycanvas.classList.remove('clicked');
		justClicked = false;
	}, 200);
})


function HSLToHex() {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  colorText.innerHTML =  "#" + r + g + b;
	navigator.clipboard.writeText("#" + r + g + b);
}

function addColorCard(hex) {
	const basic = document.getElementById('basic');
	// create duplicate node
	// update background and innerHTML
	// append to parent column wrapper
}