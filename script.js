// You can choose to have an element with the class "window-top" inside of your draggable window that will act as the "handle" for the window or it will attach to the element itself

const windows = document.querySelectorAll(".window")

let z = 0;

windows.forEach(window => {
    window.addEventListener("click", () => {
        z++
        window.style.zIndex = z
    })
})


const container = document.getElementById('window1Content');
const img = document.getElementById('image_1');

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// Dragging starts
img.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    img.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    // Constrain the image to the container
    x = Math.max(0, Math.min(x, rect.width - img.offsetWidth));
    y = Math.max(0, Math.min(y, rect.height - img.offsetHeight));

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    container.appendChild(img); // Ensure image is inside the container
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    img.style.cursor = 'grab';
});

function makeDraggable (element) {
    // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

		// If there is a window-top classed element, attach to that element instead of full window
    if (element.querySelector('.window-top')) {
        // If present, the window-top element is where you move the parent element from
        element.querySelector('.window-top').onmousedown = dragMouseDown;
    } 
    else {
        // Otherwise, move the element itself
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Get the mouse cursor position and set the initial previous positions to begin
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // When the mouse is let go, call the closing event
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag (e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Calculate the new cursor position by using the previous x and y positions of the mouse
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;
        // Replace the previous positions with the new x and y positions of the mouse
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // Set the element's new position
        element.style.top = (element.offsetTop - currentPosY) + 'px';
        element.style.left = (element.offsetLeft - currentPosX) + 'px';
    }

    function closeDragElement () {
        // Stop moving when mouse button is released and release events
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Make myWindow and myWindow2 draggable in different ways...

// myWindow will only be able to be moved via the top bar (.window-top element). The main element does nothing on mouse down.
makeDraggable(document.querySelector('#myWindow'));

// myWindow2 will be able to moved by grabbing the entire element
makeDraggable(document.querySelector('#myWindow2'));

//Close the window on click of a red button
document.addEventListener('click', e => {
	if (e.target.closest('.round')) {
		e.target.closest('.window').remove();
	}
});

// JavaScript for dynamic scaling
const myWindow = document.querySelector("#myWindow");
const baseWidth = 400; // Original width of the window
const baseHeight = 250; // Original height of the window

function scaleWindow(newWidth) {
    const scaleFactor = newWidth / baseWidth;
    myWindow.style.transform = `scale(${scaleFactor})`;
    myWindow.style.transformOrigin = "top left"; // Align scaling neatly
}

// Example: Scale when the window resizes
window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;
    const newWidth = Math.min(600, windowWidth * 0.5); // Max width and relative scaling
    scaleWindow(newWidth);
});

// Initial scaling
scaleWindow(baseWidth);


const image_pane = document.getElementById("image_1");

image_pane.addEventListener('click', () => {
image_pane.classList.toggle('active');
});
