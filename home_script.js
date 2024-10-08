
// Home Logo Marquee START
document.addEventListener("DOMContentLoaded", (event) => {
  // Function to duplicate the marquee content for infinite scroll
  function duplicateMarqueeContent() {
    const marqueeContainer = document.querySelector(".marquee-container");
    const clone = marqueeContainer.cloneNode(true);
    marqueeContainer.parentNode.appendChild(clone);
  }

  duplicateMarqueeContent(); // Clone the content for smooth looping

  // GSAP animation for infinite marquee
  const marqueeAnimation = gsap.timeline({
    repeat: -1, // Infinite repeat
    defaults: { ease: "none", duration: 20 } // Adjust duration to control speed
  });

  const marqueeWidth = document.querySelector(".marquee-container").offsetWidth;

  marqueeAnimation.to(".marquee-container", { x: -marqueeWidth });
  
});
// Home Logo Marquee END


// Home Tabs Animate and IX START
document.addEventListener('DOMContentLoaded', function() {
    const breakpoint = 767;

    function moveTabPanes() {
        const tabsMenu = document.querySelector('.features_tabs-menu');
        const tabPanes = document.querySelectorAll('.features_tab-pane');
        const tabButtons = document.querySelectorAll('.features_tab-button');
        const tabsContent = document.querySelector('.features_tabs-content');

        if (window.innerWidth <= breakpoint) {
            // Move each pane into its respective tab button on small screens
            tabButtons.forEach((button, index) => {
                const pane = tabPanes[index];
                if (pane && !button.contains(pane)) {
                    button.appendChild(pane);
                }
            });
        } else {
            // Move the panes back to the content area on larger screens
            tabPanes.forEach((pane, index) => {
                if (!tabsContent.contains(pane)) {
                    tabsContent.appendChild(pane);
                }
            });
        }
    }

    function runOnDesktop(callback) {
        if (window.innerWidth > breakpoint) {
            callback();
        }
    }

    function handleResize() {
        moveTabPanes();
        runOnDesktop(function() {
            // Place your desktop-only animation code here
            
//Auto Rotate Tabs START [Code from Claude]
gsap.registerPlugin(ScrollTrigger);

// Select elements
const tabsContainer = document.querySelector('.features_tabs');
const tabButtons = tabsContainer.querySelectorAll('.features_tab-button');
const tabPanes = tabsContainer.querySelectorAll('.features_tab-pane');

let currentIndex = 0;
let progressTween;

// Function to activate a tab
function activateTab(index, autoRotate = true) {
  const prevIndex = currentIndex;
  currentIndex = index;

  // Create a timeline for smooth animation
  const tl = gsap.timeline();

  // Stop any ongoing progress animation
  if (progressTween) {
    progressTween.kill();
  }

  // Remove active class from all tabs
  tabButtons.forEach(button => {
    button.classList.remove('is-active');
  });

  // Deactivate previous tab
  tl.to(tabButtons[prevIndex].querySelector('.features_tab-button-body'), { 
    height: 0, 
    opacity: 0, 
    duration: 0.3,
    onComplete: () => {
      gsap.set(tabButtons[prevIndex].querySelector('.features_tab-button-body'), { display: 'none' });
    }
  }, 0);

  tl.to(tabButtons[prevIndex].querySelector('.load-bar'), { 
    width: '0%', 
    opacity: 0, 
    duration: 0.3 
  }, 0);

  // Hide previous pane
  tl.to(tabPanes[prevIndex], { 
    opacity: 0, 
    duration: 0.3,
    onComplete: () => {
      gsap.set(tabPanes[prevIndex], { display: 'none' });
    }
  }, 0);

  // Activate new tab
  tabButtons[index].classList.add('is-active');

  tl.set(tabButtons[index].querySelector('.features_tab-button-body'), { 
    display: 'block', 
    height: 'auto' 
  }, 0.3);

  tl.fromTo(tabButtons[index].querySelector('.features_tab-button-body'), 
    { opacity: 0, height: 0 },
    { opacity: 1, height: 'auto', duration: 0.5, ease: 'power2.out' },
    0.3
  );

  // Show new pane
  tl.set(tabPanes[index], { display: 'block' }, 0.3);
  tl.fromTo(tabPanes[index],
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    0.3
  );

  // Animate load bar for active tab
  if (autoRotate) {
    progressTween = gsap.fromTo(tabButtons[index].querySelector('.load-bar'),
      { width: '0%', opacity: 1 },
      { 
        width: '100%', 
        opacity: 1, 
        duration: 3, 
        ease: 'none',
        onComplete: () => {
          const nextIndex = (currentIndex + 1) % tabButtons.length;
          activateTab(nextIndex);
        }
      }
    );
  } else {
    tl.to(tabButtons[index].querySelector('.load-bar'), { 
      width: '100%', 
      opacity: 1, 
      duration: 0.3 
    }, 0.3);
  }
}

// Add click event listeners to tab buttons
tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (progressTween) {
      progressTween.kill();
    }
    activateTab(index, false);
  });
});

// Create a ScrollTrigger for the tabs container
ScrollTrigger.create({
  trigger: tabsContainer,
  start: 'top 80%',
  end: 'bottom 20%',
  onEnter: () => {
    activateTab(0);
  },
  onEnterBack: () => {
    activateTab(0);
  },
  onLeave: () => {
    if (progressTween) {
      progressTween.kill();
    }
  },
  onLeaveBack: () => {
    if (progressTween) {
      progressTween.kill();
    }
  }
});

// Initial setup
tabButtons.forEach((button, index) => {
  if (index !== 0) {
    gsap.set(button.querySelector('.features_tab-button-body'), { display: 'none', opacity: 0, height: 0 });
    gsap.set(tabPanes[index], { display: 'none', opacity: 0 });
    gsap.set(button.querySelector('.load-bar'), { width: '0%', opacity: 0 });
  }
});

// Initial activation
activateTab(0);
//Auto Rotate Tabs END
        });
    }

    // Run on initial load
    handleResize();

    // Run on window resize
    window.addEventListener('resize', handleResize);
});
// Home Tabs Animate and IX END


// Testimonials Swiper START
// Initialize Swiper and set it as a global variable
let testimonialsSwiper;

// Custom function to update the progress bar
function updateProgressBar() {
  if (testimonialsSwiper && testimonialsSwiper.slides && testimonialsSwiper.slides.length > 0) {
    const totalSlides = testimonialsSwiper.slides.length;
    const activeIndex = testimonialsSwiper.activeIndex;
    const slidesPerView = testimonialsSwiper.params.slidesPerView;
    
    // Calculate progress based on the last visible slide
    const lastVisibleSlideIndex = Math.min(activeIndex + slidesPerView, totalSlides);
    const progress = lastVisibleSlideIndex / totalSlides;
    
    const progressBar = document.querySelector('.swiper-progress-bar');
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    } else {
      console.error('Progress bar element not found');
    }
  } else {
    console.error('Swiper is not fully initialized or no slides are available');
  }
}

// Function to initialize Swiper
function initSwiper() {
  testimonialsSwiper = new Swiper('.swiper', {
    // Enable accessibility
    a11y: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
    
    // Ensure progress bar updates after Swiper initializes
    on: {
      init: function () {
        // Delay the initial update to ensure slides are rendered
        setTimeout(updateProgressBar, 0);
      },
      slideChange: updateProgressBar,
      resize: updateProgressBar
    },
    // Swiper options
    spaceBetween: 30,
    centeredSlides: false,
    freeMode: false,
    navigation: {
        nextEl: ".arrow-right",
        prevEl: ".arrow-left",
      },
    // Breakpoints for responsiveness
    breakpoints: {
      1200: {
        slidesPerView: 3.25,
        spaceBetween: 30,
      },
      991: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        centeredSlides: false,
        slideToClickedSlide: false
      },
      767: {
        slidesPerView: 1.75,
        spaceBetween: 15,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        centeredSlides: false,
        slideToClickedSlide: false
      },
      478: {
        slidesPerView: 1.25,
        spaceBetween: 10,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        centeredSlides: false,
        slideToClickedSlide: false
      }
    }
  });
}

// Ensure DOM is fully loaded before initializing Swiper
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Swiper
  initSwiper();
  
  // Add a small delay to update progress bar after initialization
  setTimeout(updateProgressBar, 100);
  
  // Update progress bar when all images are loaded
  window.addEventListener('load', updateProgressBar);
});
// Testimonials Swiper END


//Calculator START
document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        elements: {
            monthlyBill: document.getElementById('monthlyBill'),
            systemType: document.querySelectorAll('input[name="systemType"]'),
            panelProvider: document.querySelectorAll('input[name="panelProvider"]'),
            batteryProvider: document.querySelectorAll('input[name="batteryProvider"]'),
            inverterProvider: document.querySelectorAll('input[name="inverterProvider"]'),
            itemizedCostsDisplay: document.querySelector('.itemized_costs'), // New section for itemized costs
            resultDisplay: document.querySelector('.calculator_results div:last-child')
        },
        constants: {
            perKwhCost: 10,
            dailySunlightHours: 4,
            daysInMonth: 30,
            batteryEfficiency: 0.8 // Assuming 80% efficiency for batteries
        },
        init: function() {
            this.attachEventListeners();
            console.log('Calculator initialized');
        },
        attachEventListeners: function() {
            this.elements.monthlyBill.addEventListener('input', () => {
                this.elements.monthlyBill.value = this.filterNumbers(this.elements.monthlyBill.value);
                this.elements.monthlyBill.value = this.formatWithIndianCommas(this.elements.monthlyBill.value);
                this.calculate();
            });
            ['systemType', 'panelProvider', 'batteryProvider', 'inverterProvider'].forEach(type => {
                this.elements[type].forEach(input => {
                    input.addEventListener('change', () => this.calculate());
                });
            });
        },
        getSelectedValue: function(name) {
            const selected = document.querySelector(`input[name="${name}"]:checked`);
            return selected ? { value: selected.value, price: parseFloat(selected.dataset.price) } : null;
        },
        calculate: function() {
            const monthlyBill = parseFloat(this.elements.monthlyBill.value.replace(/,/g, ''));
            const systemType = this.getSelectedValue('systemType');
            const panelProvider = this.getSelectedValue('panelProvider');
            const batteryProvider = this.getSelectedValue('batteryProvider');
            const inverterProvider = this.getSelectedValue('inverterProvider');

            if (!monthlyBill || !systemType || !panelProvider || !batteryProvider || !inverterProvider) {
                this.displayResult('Please fill in all fields');
                return;
            }

            console.log('Inputs:', { monthlyBill, systemType, panelProvider, batteryProvider, inverterProvider });

            const dailyEnergyUsage = (monthlyBill / this.constants.perKwhCost) / this.constants.daysInMonth;
            const totalKWRequired = dailyEnergyUsage / this.constants.dailySunlightHours;
            const totalCostOfPanels = totalKWRequired * panelProvider.price;

            let batteryStorageRequired = dailyEnergyUsage; // Always calculate battery storage
            if (systemType.value === 'off-grid' || systemType.value === 'hybrid') {
                batteryStorageRequired = dailyEnergyUsage / this.constants.batteryEfficiency;
            }
            const totalCostOfBatteries = batteryStorageRequired * batteryProvider.price;

            const totalCost = totalCostOfPanels + totalCostOfBatteries + inverterProvider.price;

            console.log('Calculation details:', {
                dailyEnergyUsage,
                totalKWRequired,
                totalCostOfPanels,
                batteryStorageRequired,
                totalCostOfBatteries,
                inverterCost: inverterProvider.price,
                totalCost
            });

            // Display individual costs
            this.displayItemizedCosts(totalCostOfPanels, totalCostOfBatteries, inverterProvider.price);

            // Display total cost
            this.displayResult(`Total Cost: ₹${this.formatWithIndianCommas(totalCost.toFixed(2))}`);
        },
        displayItemizedCosts: function(panelCost, batteryCost, inverterCost) {
            if (this.elements.itemizedCostsDisplay) {
                this.elements.itemizedCostsDisplay.innerHTML = `
                    <p>Panel Cost: ₹${this.formatWithIndianCommas(panelCost.toFixed(2))}</p>
                    <p>Battery Cost: ₹${this.formatWithIndianCommas(batteryCost.toFixed(2))}</p>
                    <p>Inverter Cost: ₹${this.formatWithIndianCommas(inverterCost.toFixed(2))}</p>
                `;
            } else {
                console.warn('Itemized costs display element not found');
            }
        },
        displayResult: function(message) {
            if (this.elements.resultDisplay) {
                this.elements.resultDisplay.textContent = message;
            } else {
                console.warn('Result display element not found');
                const resultElement = document.createElement('div');
                resultElement.textContent = message;
                document.querySelector('.calculator_results').appendChild(resultElement);
            }
            console.log('Displayed result:', message);
        },
        formatWithIndianCommas: function(value) {
            const parts = value.toString().split(".");
            let integerPart = parts[0];
            let decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

            // Apply Indian numbering format for the integer part
            const lastThreeDigits = integerPart.slice(-3);
            const otherDigits = integerPart.slice(0, -3);

            if (otherDigits !== "") {
                integerPart = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits;
            }

            return integerPart + decimalPart;
        },
        filterNumbers: function(value) {
            return value.replace(/[^0-9]/g, ''); // Allows only numbers
        }
    };

    calculator.init();
});

//Calculator END