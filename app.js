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

let totalScore = 0;

let result = [[5, 2, 2, 2, 2],[2, 4, 5, 2, 1],[3, 5, 1, 1, 2]];

function storeScore(selector,step) {
    
    for(let i=0;i<selector.length;i++){
        result[step][i] = parseInt($(selector[i]).val()) || 0;
    }
}

function calculateTotalScore(){
    totalScore = 0;
    for(const arr of result){
        for(let i of arr){
            totalScore += i;
        }
    }
}

function showResult(){
    let estimatedTime = '';
    if (totalScore >= 121) {
        estimatedTime = '10-12 months';
    } else if (totalScore >= 101) {
        estimatedTime = '7-8 months';
    } else if (totalScore >= 81) {
        estimatedTime = '6-7 months';
    } else if (totalScore >= 51) {
        estimatedTime = '4-5 months';
    } else if (totalScore >= 31) {
        estimatedTime = '3-4 months';
    } else if (totalScore >= 20) {
        estimatedTime = '2-3 months';
    } else {
        estimatedTime = '1-1.5 months';
    }
    console.log(totalScore);
    $('#resultText').text(`Estimated project duration: ${estimatedTime}.`);
    $('#resultModal').modal('show');
}

// Stepper

var stepper;
$(document).ready(function () {
   stepper = new Stepper($('.bs-stepper')[0],{
        linear: false,
        animation: true
    });
     stepper.storeScore = function() {
        if(this._currentIndex >= 1){
            $('#next-button').text('Submit');
        }else{
            $('#next-button').text('Next'); //next
        }
        var selects = $(`#step-${this._currentIndex}-form select`);
        storeScore(selects, this._currentIndex);
        if(this._currentIndex == 2){// final step
            $('.loader-section').show();
            setTimeout(()=>{
                calculateTotalScore();
                showResult();
                $('.loader-section').hide();
            },2500);
            return;
        }
    };
    stepper.onPrevious = function() {
        console.log(this._currentIndex);
        if(this._currentIndex <= 2){
            $('#next-button').text('Next'); //next
        }else{
            $('#next-button').text('Submit');
        }
    };
})

 function goNext(){
    stepper.storeScore();
    stepper.next();
  }

  function back(){
    stepper.onPrevious();
    stepper.previous();
  }
