dragElement(document.getElementById("hruska"));
dragElement(document.getElementById("banan"));
var zindex = 1

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	document.getElementById(elmnt.id).onmousedown = dragMouseDown;

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

		mousemove(e)
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function mousemove(e) {
	var lednice = document.getElementById("lednicka").getBoundingClientRect();
	if (e.clientX > lednice.left  && e.clientY > lednice.top &&
		e.clientX < lednice.right && e.clientY < lednice.bottom) {
			document.getElementById("lednickaimg").src="lednicka_open.png";
	} else {
		document.getElementById("lednickaimg").src="lednicka_close.png";
	}
}