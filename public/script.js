/**
 * script.js
 * Spin2Win Wheel JavaScript
 * Author: MD Asadauzzaman -Areban
 * Description: This script handles the spinning action of the Spin2Win wheel and updates the result.
 */

function letsSpin() {
    const wheel = document.getElementById('wheel');

    // Start rotating the wheel with a large rotation angle for visual effect
    wheel.style.transition = "transform 5s ease";
    wheel.style.transform = "rotate(1440deg)"; // Arbitrary large rotation to simulate spinning
    
    // Calculate the result after the spin ends
    setTimeout(() => {
        const randomRotation = Math.floor(Math.random() * 360);
        wheel.style.transition = "none"; // Stop transition to immediately set the final position
        wheel.style.transform = "rotate(" + randomRotation + "deg)";
        
        const actualDeg = randomRotation % 360; // Normalize the degree within a full circle (0-360)

        // Adjust the angle to account for the indicator pointing at the top (270 degrees)
        const topAngle = (360 - actualDeg + 270) % 360;

        // Determine the segment index based on the angle
        const segmentIndex = Math.floor(topAngle / 45);

        // Get all span elements
        const segments = document.querySelectorAll('.wheel span');
        const selectedSegment = segments[segmentIndex];

        // Wait for 2 seconds and then show the result
        setTimeout(() => {
            if (selectedSegment) {
                showResult(selectedSegment);
            }
        },);
    }, 5000); // 5 seconds of spinning
}

/**
 * Displays the result of the spin
 * @param {HTMLElement} spanElement - The selected span element containing the result text
 */
function showResult(spanElement) {
    const selectedValue = spanElement.innerText;
    document.getElementById('result').innerText = 'Result: ' + selectedValue;
}
