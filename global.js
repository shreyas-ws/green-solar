//Navbar BG to White START
// Function to check scroll percentage
function getScrollPercentage() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / windowHeight) * 100;
}

// Variables to store the current state of the classes
let isDarkClassPresent = true; // Assuming the 'is-dark' class is present initially
let isDarkTransparentClassPresent = true; // Assuming the 'is-dark-transparent' class is present initially

window.addEventListener('scroll', function() {
    const scrollPercentage = getScrollPercentage();
    const navbar = document.querySelector('.navbar_component');

    // Handle 'is-dark' class
    if (scrollPercentage > 2 && isDarkClassPresent) {
        navbar.classList.remove('is-dark');
        isDarkClassPresent = false;
    } else if (scrollPercentage <= 2 && !isDarkClassPresent) {
        navbar.classList.add('is-dark');
        isDarkClassPresent = true;
    }

    // Handle 'is-dark-transparent' class
    if (scrollPercentage > 2 && isDarkTransparentClassPresent) {
        navbar.classList.remove('is-dark-transparent');
        isDarkTransparentClassPresent = false;
    } else if (scrollPercentage <= 2 && !isDarkTransparentClassPresent) {
        navbar.classList.add('is-dark-transparent');
        isDarkTransparentClassPresent = true;
    }
});

//Navbar BG to White END

document.addEventListener("DOMContentLoaded", function() {
    const selectInput = document.querySelector(".is-select-input");

    // Function to update the color based on the selected option
    function updateSelectColor() {
        if (selectInput.value === "") {
            // Apply custom color var(--content--secondary) when the default option is selected
            selectInput.style.color = "var(--content--secondary)";
        } else {
            // Reset color to inherit for other options
            selectInput.style.color = "inherit";
        }
    }

    // Initial color update when the page loads
    updateSelectColor();

    // Update color when the selection changes
    selectInput.addEventListener("change", updateSelectColor);
});

//GSAP Fade Slide Bottom START
// Select elements by attribute
const fadeSlideBottomElements = document.querySelectorAll('[data-animate="fade-slide-bottom"]');

// Apply GSAP animation to each element with a stagger effect
gsap.from(fadeSlideBottomElements, {
  y: 100,             // Slide up from 100px below
  opacity: 0,         // Start fully transparent
  duration: 1,        // Animation duration of 1 second
  ease: "power3.out", // Easing function for smooth movement
  stagger: 0.3,       // Delay between each element’s animation (0.3 seconds)
  scrollTrigger: {
    trigger: fadeSlideBottomElements, // Trigger the animation when the first element comes into view
    start: "top 80%",  // Adjust based on when the animation should start
    toggleActions: "play none none reverse" // Play once when scrolled in, reverse on scroll out
  }
});
//GSAP Fade Slide Bottom END