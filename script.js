
let currentSlide = 0;

// Open modal when clicking project card image
document.querySelectorAll(".project-card-archive").forEach(card => {
    card.addEventListener("click", () => {
        // Title & Description
        document.getElementById("modalTitle").textContent = card.dataset.title || "Untitled Project";
        document.getElementById("modalDescription").textContent = card.dataset.description || "No description available.";

        // ✅ Handle Multiple Images
        const carouselContainer = document.querySelector("#modalCarousel .carousel-images");
        carouselContainer.innerHTML = "";
        let images = [];

        if (card.dataset.images) {
            images = card.dataset.images.split(",");
            images.forEach(src => {
                let img = document.createElement("img");
                img.src = src.trim();
                img.onload = () => updateCarousel(); // ensure width updates after load
                carouselContainer.appendChild(img);
            });

            // Show carousel only if 1+ images
            document.getElementById("modalCarousel").style.display = "block";
            document.querySelector(".carousel-btn.prev").style.display = images.length > 1 ? "block" : "none";
            document.querySelector(".carousel-btn.next").style.display = images.length > 1 ? "block" : "none";
            currentSlide = 0;
        } else {
            document.getElementById("modalCarousel").style.display = "none";
        }
        function getEmbedUrl(url) {
            return url.includes("watch?v=")
                ? url.replace("watch?v=", "embed/")
                : url;
        }


        // Video handling
        const videoEl = document.getElementById("modalVideo");
        if (card.dataset.video && card.dataset.video.trim() !== "") {
            videoEl.src = getEmbedUrl(card.dataset.video);
            videoEl.style.display = "block";
        } else {
            videoEl.style.display = "none";
        }

        // Link handling
        const linkEl = document.getElementById("modalLink");
        if (card.dataset.link && card.dataset.link.trim() !== "") {
            linkEl.href = card.dataset.link;
            linkEl.style.display = "inline-block";
        } else {
            linkEl.style.display = "none";
        }

        // Handle Skills
        const skillsContainer = document.getElementById("modalSkills");
        skillsContainer.innerHTML = ""; // clear previous skills
        if (card.dataset.skills && card.dataset.skills.trim() !== "") {
            let skillsArray = card.dataset.skills.split(",");
            skillsArray.forEach(skill => {
                let tag = document.createElement("span");
                tag.textContent = skill.trim();
                skillsContainer.appendChild(tag);
            });
            skillsContainer.style.display = "flex";
        } else {
            skillsContainer.style.display = "none";
        }


        // Show modal
        document.getElementById("projectModal").style.display = "flex";
    });
});

function updateCarousel() {
    const width = document.querySelector(".carousel").offsetWidth;
    document.querySelector(".carousel-images").style.transform = `translateX(-${currentSlide * width}px)`;
}

// Carousel Navigation
document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
    const total = document.querySelectorAll(".carousel-images img").length;
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : total - 1;
    updateCarousel();
});

document.querySelector(".carousel-btn.next").addEventListener("click", () => {
    const total = document.querySelectorAll(".carousel-images img").length;
    currentSlide = (currentSlide + 1) % total;
    updateCarousel();
});


// Close modal
document.querySelector(".close-btn").addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target.id === "projectModal") closeModal();
});

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.getElementById("modalVideo").src = ""; // stop video
}

// Link handling
const linkEl = document.getElementById("modalLink");
if (card.dataset.link && card.dataset.link.trim() !== "") {
    linkEl.href = card.dataset.link;
    linkEl.style.display = "inline-block";
} else {
    linkEl.style.display = "none"; // Hide button if no link
}