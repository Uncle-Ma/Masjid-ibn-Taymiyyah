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

/* ==========================================================================
   NAVIGATION HIGHLIGHTER SCRIPT
   ========================================================================== */

/**
 * Function to identify the current page and apply an 'active-page' class 
 * to the corresponding navigation link.
 */
function highlightCurrentPage() {
    // 1. Get the current URL path from the browser window
    const currentPath = window.location.pathname;
    
    // 2. Extract just the filename (e.g., 'events.html') to avoid path issues
    // If the path is empty (root), default to 'index.html'
    const currentPage = currentPath.split("/").pop() || "index.html";

    // 3. Select all anchor tags within the navigation containers
    // We check both the mobile/standard links and the placeholder container
    const navLinks = document.querySelectorAll('#nav-links a, #nav-placeholder a');

    // 4. Iterate through every link found in the navigation
    navLinks.forEach(link => {
        // Clear any existing active classes to ensure a fresh state
        link.classList.remove('active-page');

        // Get the 'href' attribute value of the current link in the loop
        const linkHref = link.getAttribute('href');
        
        // Safety check: if the link has no href, skip it
        if (!linkHref) return;

        // Extract the filename from the link's href for comparison
        const linkPage = linkHref.split("/").pop();

        // LOGIC A: Direct Match
        // Checks if the current browser page matches the link's destination
        if (currentPage === linkPage) {
            link.classList.add('active-page');
        } 
        
        // LOGIC B: Special Case for Home
        // Ensures 'Home' is highlighted if the path is the root directory
        else if ((currentPage === "" || currentPage === "index.html") && linkPage === "index.html") {
            link.classList.add('active-page');
        }
    });
}

/**
 * EXECUTION:
 * We run the function on 'DOMContentLoaded' to ensure the HTML is ready.
 * NOTE: If you use an external loader (like fetch) to inject your navbar,
 * you must call highlightCurrentPage() inside that loader's callback.
 */
document.addEventListener("DOMContentLoaded", highlightCurrentPage);

// Update your fetch to call the function AFTER the data is loaded
fetch('components/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
        highlightCurrentPage(); // <--- CALL IT HERE
    });



    /**
 * APPLICATION BRANCHING LOGIC
 * Follows the Decision Tree structure defined in the organization essay.
 */

function toggleMainBranch(path) {
    const serviceBranch = document.getElementById('service-branch');
    const programBranch = document.getElementById('program-branch');

    // Reset visibility
    serviceBranch.style.display = (path === 'service') ? 'block' : 'none';
    programBranch.style.display = (path === 'program') ? 'block' : 'none';

    // Clear sub-dropdowns and sub-forms when switching main branches
    resetSubBranches();
}

function showSubBranch(parent, value) {
    // Hide all sub-branch forms
    const allSubForms = document.querySelectorAll('.sub-branch-form');
    allSubForms.forEach(form => form.style.display = 'none');

    // Show selected sub-form
    if (value) {
        const target = document.getElementById('sub-' + value);
        if (target) target.style.display = 'block';
    }
}

// Logic specifically for Zakat (Donate vs Request)
function toggleZakatView(mode) {
    const donateFields = document.getElementById('zakat-donate-fields');
    const requestFields = document.getElementById('zakat-request-fields');

    if (mode === 'request') {
        donateFields.style.display = 'none';
        requestFields.style.display = 'block';
    } else {
        donateFields.style.display = 'block';
        requestFields.style.display = 'none';
    }
}

function resetSubBranches() {
    const allSubForms = document.querySelectorAll('.sub-branch-form');
    allSubForms.forEach(form => form.style.display = 'none');
    document.getElementById('service-select').selectedIndex = 0;
    document.getElementById('program-select').selectedIndex = 0;
}