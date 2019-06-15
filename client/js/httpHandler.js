(function () {

  const serverUrl = 'http://127.0.0.1:3000';


  //
  // TODO: build the swim command fetcher here
  //

  const directionFetch = () => {
    $.ajax({
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
    })
  }

  directionFetch(); //wrap in settimeout instead of getting in success case 

  // const clientPoster = () => {
  //   $.ajax({
  //     type: 'POST',
  //     data: direction.toLowerCase(),
  //     url: serverUrl,
  //     cache: false,
  //     contentType: false,
  //     processData: false,
  //     error: () => {
  //       console.log('error')
  //     },
  //     success: () => {
  //       console.log('great success')
  //       // reload the page
  //       window.location = window.location.href;
  //     }
  //   });
  // }
  //background image get request
  // $.ajax({
  //   type: 'GET',
  //   url: serverUrl, ///<----image url
  //   dataType //<====? image?
  // })

  //for the sucess section of our next ajax request
  //instead css updated background image
  //$('.div_image').html('<img src="data:image/png;base64,' + data + '" />')

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
