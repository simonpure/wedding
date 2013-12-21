var Spreadsheet = require('edit-google-spreadsheet');

var debug = true;
var google_spreadsheet_id = "0Aj0B11-8QsSXdE5DUkpLNUZBczNLWUQ1dVhXTlZBS1E";
var google_spreadsheet_worksheet = 'od6';
var google_spreadsheet_name = 'Wedding RSVPs';
var google_worksheet_name = 'website';
var google_robot_email = '811399581776@developer.gserviceaccount.com';
var google_keyFile = 'theluxwedding.pem';

exports.guest = function(data) {
 openSheet(sheetReady.bind(null, data));
}

var sheetReady = function (data, err, spreadsheet) {
  console.log(data);
  spreadsheet.receive(function(err, rows, info) {
    if (err) throw err;
    var row = {};
    row[info.nextRow] = data;
    spreadsheet.add(row);
    spreadsheet.send(function(err) {
      if (err) throw err;
    });
  });
}

var openSheet = function(callback) {
  Spreadsheet.create({
    debug: debug,
    oauth: {
      email: google_robot_email,
      keyFile: google_keyFile 
    },
    spreadsheetId: google_spreadsheet_id,
    worksheetId: google_spreadsheet_worksheet,
    callback: callback
  });
}
