const serverUrl = 'http://127.0.0.1:3000'

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
        url: serverUrl,
        error: () => {
          console.log('error')
        },
        success: () => {
          console.log('we posted', direction)
          return  $.ajax({
            type: 'GET',
            url: serverUrl,
            contentType: 'text/plain',
            success: (array) => {
              JSON.parse(array).forEach(function(ele, i) {
                setTimeout(() => (SwimTeam.move(ele)), 100*i)
              })
            },
            error: () => {
              console.log('error')
            }
          })// console.log()
          // reload the page
          // window.location = window.location.href;
        }
      });
  }
});

console.log('Client is running in the browser!');