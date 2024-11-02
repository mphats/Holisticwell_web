document.addEventListener("DOMContentLoaded", () => {
    // Get all preference items
    const preferenceItems = document.querySelectorAll(".preference-item");
    const footerButtons = document.querySelectorAll(".onboarding-footer button");

    // Animate preference items with fade-in effect
    preferenceItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 300); // Stagger the animation based on the index (300ms delay between each)
    });

    // Animate footer buttons to slide up
    footerButtons.forEach((button, index) => {
        button.style.opacity = "0";
        button.style.transform = "translateY(50px)";
        setTimeout(() => {
            button.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            button.style.opacity = "1";
            button.style.transform = "translateY(0)";
        }, (preferenceItems.length * 300) + (index * 300)); // Animate after preference items
    });
});

// Add click event listener to each preference item
document.addEventListener("DOMContentLoaded", () => {
    // Header animation
    const header = document.querySelector(".header");
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";

    // Insights animation
    const insights = document.querySelector(".insights");
    setTimeout(() => {
        insights.style.opacity = "1";
        insights.style.transform = "translateY(0)";
    }, 300);

    // Plan text animation
    const planText = document.querySelector(".plan h2");
    setTimeout(() => {
        planText.style.opacity = "1";
    }, 600);

    // Progress bar animation
    const progressBar = document.querySelector(".progress");
    setTimeout(() => {
        const progressBarWrapper = document.querySelector(".progress-bar");
        progressBarWrapper.style.opacity = "1";
        progressBar.style.width = "70%";
    }, 900);

    // Analyze button animation
    const analyzeBtn = document.querySelector(".analyze-btn");
    setTimeout(() => {
        analyzeBtn.style.opacity = "1";
        analyzeBtn.style.transform = "translateY(0)";
    }, 1200);

    // Tracker items animation
    const trackerItems = document.querySelectorAll(".tracker-item");
    trackerItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
        }, 1500 + (index * 200)); // Staggered animation for each item
    });

    // Upgrade button animation
    const upgradeBtn = document.querySelector(".upgrade-btn");
    setTimeout(() => {
        upgradeBtn.style.opacity = "1";
        upgradeBtn.style.transform = "translateY(0)";
    }, 1900);

    // Category items animation
    const categoryItems = document.querySelectorAll(".category-item");
    categoryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 2200 + (index * 300));
    });

    // Footer icons animation
    const footerIcons = document.querySelectorAll(".footer-icons .material-icons");
    footerIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = "1";
        }, 2800 + (index * 200));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Animate notifications on load
    const notificationItems = document.querySelectorAll(".notification-item");
    notificationItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 300 * index);
    });
});
