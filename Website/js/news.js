//JavaScript for interactivity 
document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event, .announcement');
    
    events.forEach(event => {
      event.addEventListener('click', () => {
        alert('More details coming soon!');
      });
    });
  });