document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const completeBtn = document.getElementById('completeBtn');
    const customProgress = document.getElementById('customProgress');
    const setProgressBtn = document.getElementById('setProgressBtn');
    const startAutoBtn = document.getElementById('startAutoBtn');
    const stopAutoBtn = document.getElementById('stopAutoBtn');
    
    // Initialize progress value
    let progress = 0;
    let autoInterval = null;
    const targetProgress = 70;
    const autoIncrementSpeed = 50; // milliseconds
    const autoIncrementStep = 1; // percentage
    
    // Update progress function
    function updateProgress(value) {
        // Clamp the value between 0 and 100
        progress = Math.max(0, Math.min(100, value));
        
        // Update the width of the progress fill
        progressFill.style.width = `${progress}%`;
        
        // Update the text
        progressText.textContent = `${progress}%`;
        
        // Change text color based on progress
        if (progress > 50) {
            progressText.style.color = '#fff';
        } else {
            progressText.style.color = '#333';
        }
    }
    
    // Auto increment function
    function startAutoIncrement() {
        // Clear any existing interval
        stopAutoIncrement();
        
        // Start a new interval
        autoInterval = setInterval(() => {
            if (progress < targetProgress) {
                updateProgress(progress + autoIncrementStep);
            } else {
                stopAutoIncrement();
            }
        }, autoIncrementSpeed);
    }
    
    // Stop auto increment
    function stopAutoIncrement() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
    
    // Event listeners for buttons
    decreaseBtn.addEventListener('click', function() {
        updateProgress(progress - 10);
    });
    
    resetBtn.addEventListener('click', function() {
        updateProgress(0);
    });
    
    increaseBtn.addEventListener('click', function() {
        updateProgress(progress + 10);
    });
    
    completeBtn.addEventListener('click', function() {
        updateProgress(100);
    });
    
    setProgressBtn.addEventListener('click', function() {
        const value = parseInt(customProgress.value);
        if (!isNaN(value)) {
            updateProgress(value);
        }
    });
    
    startAutoBtn.addEventListener('click', function() {
        startAutoIncrement();
    });
    
    stopAutoBtn.addEventListener('click', function() {
        stopAutoIncrement();
    });
    
    // Allow pressing Enter key in the input field
    customProgress.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const value = parseInt(customProgress.value);
            if (!isNaN(value)) {
                updateProgress(value);
            }
        }
    });
    
    // Initialize progress bar and start auto increment
    updateProgress(0);
    // Start auto increment automatically when page loads
    startAutoIncrement();
});