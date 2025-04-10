new Vue({
  el: '#app',
  data: {
      appointments: [],
      showPopup: false
  },
  created() {
      this.fetchAppointments();
  },
  methods: {
      fetchAppointments() {
          fetch('http://localhost:3000/api/appointments')
              .then(res => res.json())
              .then(data => {
                  console.log("Appointments data:", data); // Debug log
                  this.appointments = data;
              })
              .catch(() => {
                  console.warn("Using fallback data");
                  this.appointments = [
                      {
                          title: "Sample Appointment",
                          start: new Date().toISOString().split('T')[0] + "T09:00",
                          end: new Date().toISOString().split('T')[0] + "T10:00"
                      }
                  ];
              });
      },
      formatDate(isoString) {
          const date = new Date(isoString);
          return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
          });
      },
      formatTime(isoString) {
          const date = new Date(isoString);
          return date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
          });
      },
      togglePopup() {
          this.showPopup = !this.showPopup;
      }
  }
});