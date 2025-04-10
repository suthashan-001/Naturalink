
//store the selected date from the UI calendar
var selectedDate = null;

$(document).ready(function () {
  $("#calendar").fullCalendar({
    height: 444,  
    
    // When a day is clicked by the user, update the date input
    dayClick: function (date, jsEvent, view) {
      selectedDate = date.format("YYYY-MM-DD");
      $("#appointmentDate").val(selectedDate);
    },
  });
});

/**
 * Handles the submission of the selected date and time.
 */
function handleAppointmentSubmission() {
  var pickedDate = document.getElementById("appointmentDate").value;
  var pickedTime = document.getElementById("appointmentTime").value;
  var patientId = localStorage.getItem("User");
  if (!pickedDate) {
    alert("Please select or enter a date.");
    return;
  }
  if (!pickedTime) {
    alert("Please select or enter a time.");
    return;
  }

  fetch("http://localhost:3000/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // patientID is demo user for now because we assume there is only one user for testing purposes
    body: JSON.stringify({ date: pickedDate, time: pickedTime, patientId: patientId })
  })
  .then(response => response.json())
  .then(data => {
    alert("Appointment booked successfully!");
    window.location.href = "../index.html";

    // Optionally, update the calendar events or redirect to a confirmation page.
  })
  .catch(err => {
    console.error(err);
    alert("Error booking appointment. Please try again.");
  });
}
