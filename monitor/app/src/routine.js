const remote = require('electron').remote;
const fs = require('fs');
const DataFile = './savedata.json';
const FileFolder = 'files'

var identity = remote.getGlobal('monitor').identity;
var client = remote.getGlobal('monitor').client;
var planning = remote.getGlobal('monitor').planning;
var files = remote.getGlobal('monitor').files;
var playlists = remote.getGlobal('monitor').playlists;

module.exports = {
};

/*
 * files.toDownload = [
 *    {
 *        id : ---,
 *        tags :,
 *        type:
 *        duration
 *        status : downloading/not/failed
 *    }
 * ]
 * files.local = [
 *    {
 *        id :,
 *        filename,
 *        type,
 *        tags
 *        duration
 *        }
 * ]
 *
 *
 *
 */

/// THINGS TO DO
//
// Delete useless
// Launch a player.html with playlist
// Retrieve files by priority (preferable with its own page)
// Download data (have a page for downloading stuff)
// Identify monitor (splash screen)
//
//

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
        }
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
    if (fs.existsSync(__dirname + '/' + DataFile) {
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
        if (!files.downloaded.file_id && files.downloading.indexOf(file_id) == -1)
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
   // check every planning for need of playlist
}

function checkPlaylists() {
    // check what client got and download its files
    client.waitPlaylists.forEach(function(play) {
        remote.getGlobal('monitor').playlists[play.id] = play;
        client.waitPlaylists.delete(play.id);
        // check their files

        for (var i = 0; i < play.files.length; i++) {
            var file_id = play.files[i];
            if (!files.downloaded[file_id] &&
                files.toDownload.indexOf(file_id) == -1 &&
                client.waitFiles.indexOf(file_id) == -1 ) {
                files.toDownload.push(file_id);
            }
        }
    });
    client.waitPlaylists = [];
    remote.getGlobal('monitor').client.waitPlaylists = [];
}


function checkPlanningStatus() {
  downloadNewPlaylists();
  checkPlaylists();
  // add playlists to download
}

function retrievePlanning() {
}

function checkPlanning() {
  retrievePlanning();
  checkPlanningStatus();
    // retrieve planning
  //
}
