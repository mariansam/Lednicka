var zindex = 1;
var IDs = ["hruska", "banan"];
var destroy = 0;

function init() {
	console.log("initing")
	destroy = 0
	for (i = 0; i < IDs.length; i++) {
		dragElement(document.getElementById(IDs[i]));
	}
}

function reinit() {
	console.log("reiniting")
	destroy = IDs.length;
	init();
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var elmntRect = elmnt.getBoundingClientRect();
	var startposX = elmntRect.left;
	var startposY = elmntRect.top;
	var box = document.getElementById(elmnt.id+"box")
	var boxRect = box.getBoundingClientRect();
	var vratse = true;
	var pageHeight = window.innerHeight;
	var pageWidth = window.innerWidth;
	
	box.style.backgroundColor = "red";
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		elmnt.style.zIndex = (zindex + 1).toString();
		zindex += 1;
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
		if (destroy > 0) {
			remove();
			destroy -= 1;
		}
	}
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		if (elmntRect.top > -1 && elmntRect.bottom < pageHeight + 1) { //v
			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		}
		else if (elmntRect.bottom > (pageHeight)) { //pod
			elmnt.style.top = (pageHeight - elmnt.offsetHeight) + "px";
		}
		else if (elmntRect.top < 0) { //nad
			elmnt.style.top = 0 + "px";
		}

		if (elmntRect.left > -1 && elmntRect.right < pageWidth + 1) { //v
			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}
		else if (elmntRect.right > pageWidth) { //vpravo
			elmnt.style.left = (pageWidth - elmnt.offsetWidth) + "px";
		}
		else if (elmntRect.left < 0) { //vlevo
			elmnt.style.left = 0 + "px";
		}

		boxCheck(e);
	}
	function boxCheck(e) {
		if (e.clientX > boxRect.left  && e.clientY > boxRect.top &&
			e.clientX < boxRect.right && e.clientY < boxRect.bottom) { //uvnitr
			document.getElementById(elmnt.id + "uvnitr").textContent = elmnt.id + " uvnitr=true"; //debug pise do divu
			box.style.backgroundColor = "green";
			vratse = false;
		} else { //mimo
			document.getElementById(elmnt.id + "uvnitr").textContent = elmnt.id + " uvnitr=false"; //debug pise do divu
			box.style.backgroundColor = "red";
			vratse = true;
		}
	}
	function closeDragElement() {
		if (vratse) {
			translate(startposX, startposY);
		}
		else {
			translate(((boxRect.left + boxRect.right) / 2) - (elmnt.offsetWidth / 2), (boxRect.top + boxRect.bottom) / 2 - (elmnt.offsetHeight / 2));
		}
		document.onmouseup = null;
		document.onmousemove = null;
	}
	function translate(x, y) {
		console.log(elmnt.id, x, y);
		var left = parseInt(window.getComputedStyle(elmnt, null).getPropertyValue('left'), 10);
		var top = parseInt(window.getComputedStyle(elmnt, null).getPropertyValue('top'), 10);
		var dx = left - x;
		var dy = top - y;
		var i = 1;
		var count = 20;
		var delay = 20;
	
		function loop() {
			if (i >= count) { return; }
			i += 1;
			elmnt.style.left = (left - (dx * i / count)).toFixed(0) + 'px';
			elmnt.style.top = (top - (dy * i / count)).toFixed(0) + 'px';
			setTimeout(loop, delay);
		}
		loop();
	}
	function remove() {
		document.onmouseup = null;
		document.onmousemove = null;
		elmnt.onmousedown = null;
	}
}