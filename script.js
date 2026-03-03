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
 * Follows the decision tree: first pick Service or Program, then a specific path.
 */

function toggleMainBranch(path) {                 // Shows either the Service or Program branch based on the chosen radio
    const serviceBranch = document.getElementById('service-branch'); // Grabs the container for all service-related forms
    const programBranch = document.getElementById('program-branch'); // Grabs the container for all program-related forms

    // Reset visibility so that only the active branch is visible
    serviceBranch.style.display = (path === 'service') ? 'block' : 'none'; // Displays the service branch if "service" is selected
    programBranch.style.display = (path === 'program') ? 'block' : 'none'; // Displays the program branch if "program" is selected

    // Clear sub-dropdowns and sub-forms when switching the main branches
    resetSubBranches(); // Hides all sub-branch panels and resets dropdowns to their default state
}

function showSubBranch(parent, value) {          // Reveals a specific sub-branch form (e.g. Nikkah, Hifz) based on the dropdown value
    const allSubForms = document.querySelectorAll('.sub-branch-form'); // Selects every element that represents a sub-branch panel
    allSubForms.forEach(form => form.style.display = 'none');          // Hides every sub-branch so we can cleanly show only one

    // Show the matching sub-form if a value is present
    if (value) {                                                   // Ensures a valid, non-empty selection
        const target = document.getElementById('sub-' + value);    // Builds the ID (e.g. "sub-nikkah") and looks it up in the DOM
        if (target) target.style.display = 'block';                // Makes the matched sub-form panel visible
    }
}

// Logic specifically for Sadaqah & Zakat (Donor vs Assistance applicant)
function toggleZakatView(mode) {                                   // Switches between "donate" and "request assistance" views
    const donateFields = document.getElementById('zakat-donate-fields');   // Wraps all donation-related fields
    const requestFields = document.getElementById('zakat-request-fields'); // Wraps all assistance-request fields

    if (mode === 'request') {                // When the applicant is requesting financial help
        donateFields.style.display = 'none'; // Hide donor-specific inputs
        requestFields.style.display = 'block'; // Show eligibility and hardship section
    } else {                                 // Default and "donate" selection
        donateFields.style.display = 'block'; // Show donor inputs (type, amount, method, etc.)
        requestFields.style.display = 'none'; // Hide assistance section
    }
}

function resetSubBranches() {                                   // Utility to fully reset all branch-specific sections
    const allSubForms = document.querySelectorAll('.sub-branch-form'); // Collects all sub-branch panels across Service and Program
    allSubForms.forEach(form => form.style.display = 'none');          // Hides every single sub-form panel
    document.getElementById('service-select').selectedIndex = 0;       // Resets service dropdown back to the placeholder
    document.getElementById('program-select').selectedIndex = 0;       // Resets program dropdown back to the placeholder
}