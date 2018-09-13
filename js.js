var zindex = 1
var IDs = ["hruska", "banan"];

function resize() {
	IDs.forEach(element => {
		dragElement(document.getElementById(element));
	});
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var rect = elmnt.getBoundingClientRect();
	var startposX = rect.left;
	var startposY = rect.top;
	var ebox = document.getElementById(elmnt.id+"box")
	var box = ebox.getBoundingClientRect();
	var vratse = true;
	ebox.style.backgroundColor = "red";
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
	}
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		var offsets = elmnt.getBoundingClientRect();
		var top = offsets.top;
		var left = offsets.left;
		var bottom = offsets.bottom;
		var right = offsets.right;
		var pageHeight = window.innerHeight;
		var pageWidth = window.innerWidth;

		if (top > -1 && bottom < pageHeight + 1) //v
		{ elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; }
		else if (bottom > (pageHeight)) //pod
		{ elmnt.style.top = (pageHeight - elmnt.offsetHeight) + "px"; }
		else if (top < 0) //nad
		{ elmnt.style.top = 0 + "px"; }

		if (left > -1 && right < pageWidth + 1) //v
		{ elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; }
		else if (right > pageWidth) //vpravo
		{ elmnt.style.left = (pageWidth - elmnt.offsetWidth) + "px"; }
		else if (left < 0) //vlevo
		{ elmnt.style.left = 0 + "px"; }

		vboxu(e)
	}
	function vboxu(e) {
		if (e.clientX > box.left  && e.clientY > box.top &&
			e.clientX < box.right && e.clientY < box.bottom) { //uvnitr
			document.getElementById(elmnt.id + "uvnitr").textContent = elmnt.id + " uvnitr=true";
			ebox.style.backgroundColor = "green";
			vratse = false
		} else { //mimo
			document.getElementById(elmnt.id + "uvnitr").textContent = elmnt.id + " uvnitr=false";
			ebox.style.backgroundColor = "red";
			vratse = true
		}
	}
	function closeDragElement() {
		if (vratse) {
			translate(elmnt, startposX, startposY)
		}
		document.onmouseup = null;
		document.onmousemove = null;
	}
	function drop() {
		translate(elmnt, startposX, startposY)
		document.onmouseup = null;
		document.onmousemove = null;
	}
	function translate(elem, x, y) {
		var left = parseInt(window.getComputedStyle(elem, null).getPropertyValue('left'), 10);
		var top = parseInt(window.getComputedStyle(elem, null).getPropertyValue('top'), 10);
		var dx = left - x;
		var dy = top - y;
		var i = 1;
		var count = 20;
		var delay = 20;
	
		function loop() {
			if (i >= count) { return; }
			i += 1;
			elem.style.left = (left - (dx * i / count)).toFixed(0) + 'px';
			elem.style.top = (top - (dy * i / count)).toFixed(0) + 'px';
			setTimeout(loop, delay);
		}
		loop();
	}
}

document.mouseleave(function () {
    alert()
});