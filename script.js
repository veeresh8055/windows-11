function setTimeDate() {
  let time = document.getElementById("time");
  let dateDisplay = document.getElementById("date");

  // console.log(new Date());

  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();

  // console.log(hours)
  // console.log(minutes)

  time.innerHTML = `${hours}:${minutes}`;

  let day = date.getDay() + 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

//   console.log(day, month, year);
  dateDisplay.innerHTML = `${day}-${month}-${year}`;
}

setInterval(setTimeDate, 1000);
setTimeDate();
function createSlider(containerId, barId, circleId) {
  var container = document.getElementById(containerId);
  var bar = document.getElementById(barId);
  var circle = document.getElementById(circleId);

  var isDragging = false;

  circle.addEventListener("mousedown", function () {
    isDragging = true;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      var rect = container.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var width = rect.width;

      var percentage = (mouseX / width) * 100;

      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      bar.style.width = percentage + "%";
      circle.style.left = percentage + "%";
    }
  });
}

// Create two independent sliders
createSlider("container1", "bar1", "circle1");
createSlider("container2", "bar2", "circle2");


const side = document.querySelector('.side');
const toggle = document.querySelector('.taskbar .rightIcon .second');

if (toggle && side) {
  toggle.addEventListener('click', () => {
    side.classList.toggle('hidden');
  });
}

// menu image toggle (use `.open` class)
const menu = document.querySelector('.menuBar');
const menuImg = document.querySelector('.menuImg');

if (menu && menuImg) {
  menu.addEventListener('click', () => {
    menuImg.classList.toggle('open');
  });
}


//draggable icons in window  using interact.js cdn 
const icons = document.querySelectorAll(".icons");

Draggable.create(".icons", {
  type: "x,y",
  bounds: ".top",
  inertia: true, // Optional: requires InertiaPlugin for extra smoothness

  onPress: function() {
    // Store the exact position where the drag started
    this.originalX = this.x;
    this.originalY = this.y;
    
    // Visual feedback: bring the dragged element to the front
    gsap.set(this.target, { zIndex: 100 });
  },

  onDragEnd: function() {
    let hasCollision = false;

    for (let icon of icons) {
      if (icon !== this.target) {
        // "20%" threshold is usually better for UX than "100%" 
        // as it allows for slight overlaps before rejection
        if (this.hitTest(icon, "20%")) {
          hasCollision = true;
          break;
        }
      }
    }

    if (hasCollision) {
      // Smoothly animate back to the start if it hits something
      gsap.to(this.target, {
        x: this.originalX,
        y: this.originalY,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      // Success! Reset z-index
      gsap.set(this.target, { zIndex: 1 });
    }
  }
});