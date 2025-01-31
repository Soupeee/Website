document.addEventListener('DOMContentLoaded', function() {
    const playerProfiles = document.querySelectorAll('.player-profile');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressIndicator = document.querySelector('.progress-indicator');
    let currentIndex = 0;

    // Function to create progress indicator dots
    function createProgressDots() {
        playerProfiles.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active'); // Highlight the current dot
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                showProfile(currentIndex);
                updateProgressDots();
            });
            progressIndicator.appendChild(dot);
        });
    }

    // Function to update progress indicator dots
    function updateProgressDots() {
        const dots = document.querySelectorAll('.progress-indicator .dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Function to show the current profile and hide others
    function showProfile(index) {
        playerProfiles.forEach((profile, i) => {
            if (i === index) {
                profile.classList.add('active');
            } else {
                profile.classList.remove('active');
            }
        });
        updateProgressDots(); // Update the progress indicator
    }

    // Show the first profile initially
    showProfile(currentIndex);

    // Create progress indicator dots
    createProgressDots();

    // Event listener for the "Next" button
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % playerProfiles.length;
        showProfile(currentIndex);
    });

    // Event listener for the "Previous" button
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + playerProfiles.length) % playerProfiles.length;
        showProfile(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % playerProfiles.length;
            showProfile(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + playerProfiles.length) % playerProfiles.length;
            showProfile(currentIndex);
        }
    });
});