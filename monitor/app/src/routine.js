const remote = require('electron').remote;
const fs = require('fs');
const DataFile = './savedata.json';
const FileFolder = 'files'
const moment = require('moment');

var identity = remote.getGlobal('monitor').identity;
var client = remote.getGlobal('monitor').client;
var planning = remote.getGlobal('monitor').planning;
var files = remote.getGlobal('monitor').files;
var playlists = remote.getGlobal('monitor').playlists;

// Goddamn this is a lot of work

module.exports = {
  checkPlanning : checkPlanning, // (from, to)
  retrievePlanning : retrievePlanning, /// (from, to)
  checkPlanningStatus : checkPlanningStatus,
  checkPlaylists : checkPlaylists,
  downloadNewPlaylists : downloadNewPlaylists,
  checkLocalFiles : checkLocalFiles,
  downloadNewFiles : downloadNewFiles,
  loadData  : loadData,
  saveData : saveData,
  calculateUntil : calculateUntil
};

function calculateUntil() {
    var day = new Date();
    var today = new Date();
    var max = new Date();
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    max.setHours(23);
    max.setMinutes(59);
    max.setSeconds(59);
    max.setMilliseconds(999);

    if (planning && planning[day]) {
        var j = 0;
        while (j < planning[day].timetable.length) {
            var at = moment(planning[day].timetable[j].start_at, 'HH:mm:ss').toDate();
            today.setHours(at.getHours());
            today.setMinutes(at.getMinutes());
            today.setSeconds(at.getSeconds());
            if (today.getTime() > Date.now().getTime) {
                return today;
            } 
        }
    } else {
        return max;
    }
}

function saveData() {
    var tmpbool = client.data.is_identified;
    client.data.is_identified = false;
    var saveDataJSON = {
        client : {
          data          : client.data,
          waitPlaylists : client.waitPlaylists,
          waitPlannings : client.waitPlannings,
          waitFiles     : client.waitFiles,
          readyFiles    : client.readyFiles
        },
        files : files,
        planning : planning,
        playlists : playlists,
        identity : identity
    };
    fs.writeFile(DataFile, JSON.stringify(saveDataJSON), 'utf-8');
    client.data.is_identified = tmpbool;
}

function loadData() {
    saveData();
    if (fs.existsSync(__dirname + '/' + DataFile)) {
        saveDataJSON = require(__dirname + '/' + DataFile);
        remote.getGlobal('monitor').identity = saveDataJSON.identity;
        remote.getGlobal('monitor').files = saveDataJSON.files;
       
        remote.getGlobal('monitor').client.data = saveDataJSON.client.data;
        remote.getGlobal('monitor').client.waitPlaylists = saveDataJSON.client.waitPlaylists;
        remote.getGlobal('monitor').client.waitPlannings = saveDataJSON.client.waitPlannings;
        remote.getGlobal('monitor').client.waitFiles = saveDataJSON.client.waitFiles;
        remote.getGlobal('monitor').client.readyFiles = saveDataJSON.client.readyFiles;
        
      client = remote.getGlobal('monitor').client;
    }
}

function deleteOldFiles() {
    // Ignorer sauf si bonus time en vue
}

function downloadNewFiles(){
    if (files.toDownload) {
      files.toDownload.append(client.waitFiles);
    } else {
      files.toDownload = client.waitFiles;
    }
    for (var i = 0; i < files.toDownload.length; i++) {
        var file_id = files.toDownload[i];
        if (!files.downloaded.file_id && files.downloading.indexOf(file_id) == -1) {
            client.request(file_id);
            files.downloading.push(file_id)
        }
    }
    remote.getGlobal('monitor').files = files;
}

function checkLocalFiles() {
    loadData();
    for (var i = 0; i < client.readyFiles; i++) {
        var file_id = client.readyFiles[i].id
        if (!files.downloaded[file_id]) {
            files.downloaded[file_id] = client.readyFiles[i]
        }
    }
    client.readyFiles = [];
    remote.getGlobal('monitor').client.readyFiles = [];
    //checkPlanningStatus(); seems useless now
    /// handle error later
}

function manageFiles() {
  checkLocalFiles(); // avoid multiple downloads
  downloadNewFiles(); // download what is left
  deleteOldFiles(); // not yet
}

function downloadNewPlaylists() {
    // only download unknown playlists
    if (playlists.toDownload) {
      playlists.toDownload.append(client.waitPlaylists);
    } else {
      playlists.toDownload = client.waitPlaylists;
    }

    playlists.toDownload.forEach(function(play) {
        if (play.status) {
            return ;
        }
        client.retrievePlaylist(play.id);
    });
}

function checkPlaylists() {
    // check what client got and download its files
    client.waitPlaylists.forEach(function(play) {
        if (play.status == false) {
            if (play.id in playlists.dowloaded ||
                playlists.downloading.indexOf(play.id) ||
                playlists.toDownload.indexOf(play.id)) {
                return ;
            }
            playlists.toDownload.push(play.id);
            remote.getGlobal('monitor').playlists.toDownload = playlists.toDownload;
            return ;
        }
        remote.getGlobal('monitor').playlists.downloaded[play.id] = play;
        // check their files

        for (var i = 0; i < play.files.length; i++) {
            var file_id = play.files[i];
            if (!files.downloaded[file_id] &&
                files.toDownload.indexOf(file_id) == -1 &&
                client.waitFiles.indexOf(file_id) == -1 ) {
                files.toDownload.push(file_id);
            }
        }
        client.waitPlaylists.delete(play.id);
        remote.getGlobal('monitor').client.waitPlaylists = client.waitPlaylists;
    });
}


function checkPlanningStatus() {
  client.waitPlannings.forEach(function(plan) {
      var from = new Date(plan.from);
      var to = new Date(plan.to);
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setMilliseconds(0);

      while (from <= to) {
          var day = new Date(from); // obviously
          if (day in planning == false) {
              planning[day] = {
                  timestamp : null,
                  timtable : []
              };
          }
          if (planning[day] == null || Date(plan.timestamp).getTime() >
              Date(planning[day].timestamp).getTime()) {

              planning[day].timestamp = plan.timestamp;
              planning[day].timetable = []; // reset for the timestamp is new
              
              for (var i = 0; i < plan.planning.length; i++) {
                  if (Date(plan.planning[i].range_start) - day >= 0 &&
                      day - Date(plan.planning[i].range_end)) {
                          // insert
                        // find where to insert
                          var j = 0;
                          var st_at = moment(plan.planning[i].start_at, 'HH:mm:ss').toDate().getTime();
                          //neeed to check this part
                          while (j < planning[day].timetable.length &&
                                moment(planning[day].timetable[j].start_at, 'HH:mm:ss').toDate().getTime() - st_at > 0) {
                                    j++;
                                }
                          planning[day].timetable.splice(j, 0, plan[i]);
                      }
              }
          }
          from.setDay(from.getDay() + 1);
      }
      remote.getGlobal('monitor').planning = planning;
      /// key : day
  });
  downloadNewPlaylists();
  checkPlaylists();
  // add playlists to download
}

function retrievePlanning(from, to) {
    client.requestTimetable(from, to);
}

function checkPlanning(from, to) {
  retrievePlanning(from, to);
  checkPlanningStatus();
    // retrieve planning
  //
}
