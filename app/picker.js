const refresh = require('passport-oauth2-refresh');
const User = require('./models/users');

module.exports = (userId) => {  
  var pickerApiLoaded = false;
  var oauthToken;

  //refresh the user's access token - google's expires after 1 hour
  User.findById(userId)
    .then(user => {
      refresh.requestNewAccessToken('google', user.refreshToken, 
        (err, accessToken, refreshToken) => {
          oauthToken = accessToken;
          loadPicker();
      })
    })

  // Use the Google API Loader script to load the google.picker script.
  function loadPicker() {
    gapi.load('picker', {'callback': onPickerApiLoad});
  }

  function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
  }

  // Create and render a Picker object
  function createPicker() {
    if (pickerApiLoaded && oauthToken) {
      //sets the view - here, google drive documents
      var view = new google.picker.View(google.picker.ViewId.DOCUMENTS);
      //creates the picker
      var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setAppId(`${process.env.GOOGLE_APP_ID}`)
          .setOAuthToken(oauthToken)
          .addView(view)
          // .addView(new google.picker.DocsUploadView.setIncludeFolders(true))
          .setDeveloperKey(`${process.env.GOOGLE_API_KEY}`)
          .setCallback(pickerCallback)
          .build();
       picker.setVisible(true);
    }
  }

  // A simple callback implementation.
  function pickerCallback(data) {
    console.log('data from picker: ', data)
    if (data.action == google.picker.Action.PICKED) {
      var fileId = data.docs[0].id;
      alert('The user selected: ' + fileId);
    }
  }

}