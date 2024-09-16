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

//Select Input Color Change START
document.addEventListener("DOMContentLoaded", function() {
    // Select the input element
    const selectInput = document.querySelector(".is-select-input");

    // Check if the element exists before proceeding
    if (selectInput) {
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
    }
});
//Select Input Color Change START

//GSAP Fade Slide Bottom START
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select elements by attribute
const fadeSlideBottomElements = document.querySelectorAll('[gsap-animate="fade-slide-bottom"]');

// Apply GSAP animation to each element individually
fadeSlideBottomElements.forEach(element => {
  gsap.from(element, {
    y: 100,             // Slide up from 100px below
    opacity: 0,         // Start fully transparent
    duration: 1,        // Animation duration of 1 second
    ease: "power3.out", // Easing function for smooth movement
    scrollTrigger: {
      trigger: element,      // Each element triggers its own animation
      start: "top 80%",      // Animation starts when the element's top reaches 80% of the viewport height
      end: "bottom 20%",     // End animation when the element's bottom reaches 20% of the viewport height
      toggleActions: "play none none reverse" // Play animation on scroll into view, reverse on scroll out
    }
  });
});
//GSAP Fade Slide Bottom END