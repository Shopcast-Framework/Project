const remote = require('electron').remote;
const fs = require('fs');
const DataFile = './savedata.json';
const FileFolder = 'files'

var identity = remote.getGlobal('monitor').identity;
var client = remote.getGlobal('monitor').client;
var planning = remote.getGlobal('monitor').planning;
var files = remote.getGlobal('monitor').files;

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
        client : client,
        files : files,
        planning : planning,
        identity : identity
    };
    fs.writeFile(DataFile, JSON.stringify(saveDataJSON), 'utf-8');
    client.data.is_identified = tmpbool;
}

function loadData() {
    if (fs.existsSync(__dirname + '/' + DataFile) {
        saveDataJSON = require(__dirname + '/' + DataFile);
        identity = remote.getGlobal('monitor').identity;
        client = remote.getGlobal('monitor').client;
        planning = remote.getGlobal('monitor').planning;
        files = remote.getGlobal('monitor').files;
    }
    else {
        saveData();
    }
}

function deleteOldFiles() {
    // Ignorer sauf si bonus time en vue
}

function downloadNewFiles(){
    files.toDownload = []; /////
    for (var i = 0; i < files.toDownload.length; i++) {
        if (files.toDownload[i].status) {
            ///launch request
            files.toDownload[i].status = false;
        }
    }
}

function checkLocalFiles() {
    loadData();
    checkPlanningStatus();
    /// handle error later
}

function manageFiles() {
  checkLocalFiles();
  downloadNewFiles();
  deleteOldFiles();
}

function checkPlanningStatus() {
}

function retrievePlanning() {
}

function checkPlanning() {
  retrievePlanning();
  checkPlanningStatus();
    // retrieve planning
  //
}
