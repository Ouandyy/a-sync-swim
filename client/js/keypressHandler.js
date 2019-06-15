

$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1].toLowerCase();
    // SwimTeam.move(direction.toLowerCase());
    //run post request 
      $.ajax({
        type: 'POST',
        data: direction,
        contentType: 'text/plain',
        url: `http://127.0.0.1:3000`,
        error: () => {
          console.log('error')
        },
        success: () => {
          console.log('we posted')
          // console.log()
          // reload the page
          // window.location = window.location.href;
        }
      });
  }
});

console.log('Client is running in the browser!');
