fetch('components/nav.html')
.then(response => response.text())
.then(data => document.getElementById('nav-placeholder').innerHTML = data);

fetch('components/footer.html')
.then(response => response.text())
.then(data => document.getElementById('footer-placeholder').innerHTML = data);






const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){

    if(slides.length > 0){
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 5000);

    }

}

function showSlide(index) {


    if(index >= slides.length){
        slideIndex = 0;
    }
    else if (index < 0){
        slideIndex = slides.length - 1;
    }




    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");

}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);

}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

/* ==================================
   Start of number scroll animation
   ================================== */

// Function to handle the counting logic
const animateCount = (element) => {
    const target = +element.getAttribute('data-target'); // The number to reach
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const stepTime = 20; // How often the number updates (lower is smoother)
    const increment = target / (duration / stepTime);
    
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = target.toLocaleString() + "+"; // Final number with formatting
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current).toLocaleString() + "+";
        }
    }, stepTime);
};

// Intersection Observer to trigger when visible
const observerOptions = {
    threshold: 0.5 // Trigger when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target); // Stop watching once animated
        }
    });
}, observerOptions);

// Select all elements with the class 'impact-number'
document.querySelectorAll('.number, .impact-number').forEach(num => {
    // Store the original number in a data attribute and reset text to 0
    const originalValue = num.innerText.replace(/[^0-9]/g, ''); 
    num.setAttribute('data-target', originalValue);
    num.innerText = "0+";
    observer.observe(num);
});