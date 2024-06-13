function validateForm() {
    let isValid = true;

    $('#assessmentForm select').each(function() {
        // Check if the select element's value is falsy which covers "", null, and undefined
        if (!$(this).val()) {
            isValid = false;
            return false; 
        }
    });

    if (isValid) {
        calculateScore();
    } else {
        alert('Please answer all questions before submitting.');
    }
}


function calculateScore() {
    let totalScore = 0;
    $('#assessmentForm select').each(function() {
        totalScore += parseInt($(this).val()) || 0;
    });

    let estimatedTime = '';
    if (totalScore >= 121) {
        estimatedTime = '12 months';
    } else if (totalScore >= 101) {
        estimatedTime = '7-8 months';
    } else if (totalScore >= 81) {
        estimatedTime = '6 months';
    } else if (totalScore >= 51) {
        estimatedTime = '4 months';
    } else if (totalScore >= 31) {
        estimatedTime = '3 months';
    } else if (totalScore >= 20) {
        estimatedTime = '2 months';
    } else {
        estimatedTime = '1-1.5 months';
    }

    $('#resultText').text(`Estimated project duration: ${estimatedTime}.`);
    $('#resultModal').modal('show');
}