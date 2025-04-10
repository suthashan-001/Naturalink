new Vue({
    el: '#app',
    data: {
      appointments: [],
      showPopup: false
    },
    created() {
      // Trying both endpoints - use static data if both fail
      const endpoints = [
        'http://localhost:3000/api/appointments',  // Node server
        '/api/appointments'                       // Relative path
      ];
      
      const fetchPromises = endpoints.map(url => 
        fetch(url).then(res => res.ok ? res.json() : Promise.reject())
      );
  
      Promise.any(fetchPromises)
        .then(data => {
          this.appointments = data;
        })
        .catch(() => {
          // Fallback static data if API isn't available
          this.appointments = [
            { date: "Dec 2", time: "2:00 PM", type: "virtual" },
            { date: "Dec 4", time: "12:30 PM", type: "in-person" }
          ];
          console.warn("Using fallback appointment data");
        });
    },
    methods: {
      togglePopup() {
        this.showPopup = !this.showPopup;
      }
    }
  });