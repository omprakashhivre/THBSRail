$(document).ready(function () {
    var numRating, avgRating, currentRating;
    var email, feedback;
    var validateEmail = true, validateRating = false;
  
    numRating = 234;      //get the value from the server here 234 is taken as an example
    avgRating = 3;        //get the value from the server here 3 is taken as an example
  
    //click events on 'close' button on the modal = simply close the modal
    $('#closeOnly').click(function () {
      $('#feedbackSection').removeClass('visible');
    });
    //--- click events on 'Feedback' button on the page = bring up the modal
    function takefeedback()   //default click event
    {
      $('#feedbackSection').addClass('visible');
    }
    function sentfeedback()     //click event attached when feedback succesfully submitted
    {
      $('#feedbackSection').addClass('visible');
      console.log('changing feedback section');
      $('form').prepend('<br /><span style="color:red; margin-left:20px;">' +
        'You have already submitted a rating</span><br />');
      $('#closeSend').prop('disabled', true);
      $('#email').prop('disabled', true);
      $('#feedback').prop('disabled', true);
    }
    $('#userFeedback').on('click', takefeedback);
    //--- 
    //-------updating the rating stars according to total number of ratings & its average
    var avg = $('#r'.concat(avgRating.toString()));
    avg.prevAll().addClass('oldRating');
    avg.addClass('oldRating');
    $('#showNumRating').text(numRating.toString());
    $('#showAvgRating').text(avgRating.toString());
    //-------
    function hoverOut() {
      $('.star').removeClass('glyphicon-star tmpRating');
      $('.star').addClass('glyphicon-star-empty');
    }
    function hoverIn() {
      $(this).prevAll().removeClass('glyphicon-star-empty');
      $(this).prevAll().addClass('glyphicon-star tmpRating');
      $(this).removeClass('glyphicon-star-empty');
      $(this).addClass('glyphicon-star tmpRating');
      $('.star').on('mouseleave', hoverOut);
    }
    // attaching mouseenter & mouseleave events on rating stars
    $('.star').on('mouseenter', hoverIn);
  
    // click event on stars
    $('.star').click(function (elem) {
      currentRating = parseInt((elem.target.id).substring(1, 2));//taking no. of stars from id of star clicked
  
      $('*').removeClass('tmpRating newRating');
      $('*').find('.glyphicon-star').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
  
      $(this).prevAll().removeClass('glyphicon-star-empty');
      $(this).prevAll().addClass('glyphicon-star newRating');
      $(this).removeClass('glyphicon-star-empty');
      $(this).addClass('glyphicon-star newRating');
      //$('.star').unbind('mouseleave');
      $('.star').off('mouseleave', hoverOut);
      validateRating = true;                  //ensures the stars has been clicked atleast once
    });
  
    //click event on 'close' button on the modal = simply close the modal
    $('#closeOnly').click(function () {
      $('#feedbackSection').removeClass('visible');
    });
    // when 'Done' button on modal is clicked = close the modal and send the data(actually data isn't going anywhere its ficticious)
    $('#closeSend').click(function () {
      email = $('#email').val();
      feedback = $('#feedback').val();
      //validating the email field
      var atpos = email.indexOf("@");
      var dotpos = email.lastIndexOf(".");
      if ((atpos < 1) || (dotpos < atpos + 2) || (dotpos + 2 >= dotpos.length) || (email.length < 0)) {
        validateEmail = false;
      }
  
      if ((validateEmail == true) && (validateRating == true))   //feedback comment field is optional
      {
        //NOTE : The value of numRating, avgRating are updated here but actually it must be done on server side
        //Calculating updating
        var prevNum = numRating, prevAvg = avgRating;
        numRating = prevNum + 1;
        avgRating = Math.round((currentRating + prevAvg * prevNum) / numRating);//taking int val of 'avgRating'
        //Update done
  
        var feedbackObj = new Object();
        feedbackObj.email = email;
        feedbackObj.feedback = feedback;
        feedbackObj.rating = currentRating;
        var jsonFeedback = JSON.stringify(feedbackObj);
        //send the values back to server eamil, feedback, numRating, avgRating,
        console.log(jsonFeedback);
        //disable the 'Done' button in feedback section & Show that feedback is submitted
        $('#userFeedback').off('click', takefeedback);
        $('#userFeedback').on('click', sentfeedback);
        $('#feedbackSection').removeClass('visible');
      }
      else {
        if ((validateEmail == false) && (validateRating == false)) {
          alert('Kindly choose a valid email address and rating.');
        }
        else {
          if (validateEmail == false) { alert('Please enter a valid email address'); }
          if (validateRating == false) { alert('Please select a rating'); }
        }
      }
    });     // end of code for 'Done' button
  });

  function submitfeedback(){
      let name = document.getElementById("name").value
      let email = document.getElementById("email").value
      let comment =document.getElementById("comment").value
      let islogin = false
      let rate = 4
      if(localStorage.getItem("email")){
        islogin = true
      }
     var data = {
        "email": email,
        "comment": comment,
        "name": name,
        "isuserlogin":islogin,
        "rate":rate
    }
    //console.log(data);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    let fres = fetch("http://localhost:8080/thbs/addfeedback", options);
    if(fres){
        alert("thank you for your Valuable Feedback")
    }
  }