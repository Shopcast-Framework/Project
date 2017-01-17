var fs = require('fs');
var uploadPath = __dirname + '/../uploads';

// Import orm, will be upgraded
// Temporary settings about the user id
var sequelize = require('sequelize');
var orm = require(process.env.NODE_PATH + '/modules/orm');
orm.load();
var ormFile = orm.db.File;
var ormMonitor = orm.db.Monitor;
var ormUser = orm.db.User;
var ormPlanning = orm.db.Planning;
var ormPlaylistFiles = orm.db.PlaylistFile;
var ormPlaylist = orm.db.Playlist;
// ormTimetable
module.exports = {
list          : list,
		request       : request,
		upload        : upload,
		monitor_login : monitor_login,
		timetable     : timetable
};

function timetable(client, stream, meta) {
	console.log('Command [TIMETABLE] [USER ID :' + meta.client_data.user_id +' ]: ');
	console.log(ormPlanning);
	console.log(ormPlaylist);
	console.log(ormPlaylistFiles);

	from = new Date(meta.from);
	to = new Date(meta.to);
	console.log('DATE FROM ' + from.toString());
	console.log('DATE TO ' + to.toString());
	console.log(meta.client_data);

	ormPlanning.findAll({
		where : {
		user_id : meta.client_data.user_id,
		monitor_id : meta.client_data.monitor_id
		}
	}).then(function(plannings) {
		if (plannings.constructor != Array) {
			console.log('single case handling TIMETABLE');
		}
		var dataToSend = {
			event : 'timetable',
			planning : [],
			playlists : [], // all different playlists
			from : from.toString(),
			to : to.toString(),
			timestamp : new Date().toString()
		};
		for (var i = 0; i < plannings.length; i++) {
			console.log(plannings[i].dataValues);
			dataToSend.planning[i] = {
				id : plannings[i].dataValues.id,
				title : plannings[i].dataValues.title,
				range_start : plannings[i].dataValues.range_start,
				range_end : plannings[i].dataValues.range_end,
				start_at : plannings[i].dataValues.start_at,
				playlist_id : plannings[i].dataValues.playlist_id
			}
			if (dataToSend.playlists.indexOf(plannings[i].dataValues.playlist_id) == -1) {
				dataToSend.playlists.push(plannings[i].dataValues.playlist_id);
			}
		}
		console.log(dataToSend);
		client.send({}, dataToSend);
	}, function(err) {
	});




/*
   ormPlaylist.findAll({
where : {
user_id : meta.client_data.user_id
},
include : [/*{
model : ormFile,
as : 'files',
required : true,
order : ['rank', 'ASC']
},
{
model       : ormPlanning,
required    : true,
where : {
monitor_id : meta.client_data.monitor_id/*,
range_end : {
gte : from
},
range_start : {
lte : to
}
}
}
]
}
).then(function(plannings) {
//gerer le cas unique
console.log('PLANNING, result ?');
console.log(plannings);
plannings.forEach(function(plan) {
var dataToSend = {
event : 'playlist',
play_id : plan.id,
files : [],
planning : []
};
console.log('planning id : ' + plan.id);
for (var i = 0, len = plan.files.length; i < len; i++) {
dataToSend.files[dataToSend.files.length] = {
rank : i,
file_id : plan.files[i].dataValues.id,
filename : plan.files[i].filename,
file_time : 5 * 60 //plan.files[i]
};
}
for (var i = 0, len = plan.Plannings.length; i < len; i++) {
var tmpend = plan.Plannings[i].dataValues.range_end;
if (tmpend > to)
tmpend = to;
dataToSend.planning[dataToSend.planning.length] = {
planning_id : plan.Plannings[i].dataValues.id,
start : plan.Plannings[i].dataValues.range_start,
end : tmpend,
timestart : plan.Plannings[i].dataValues.start_at
};
}
console.log(dataToSend);
client.send({}, dataToSend);
stream.end();
});
}, function(err) {
});*/


}

function list(stream, meta) {
	console.log('Command [LIST] [USER ID :' + meta.client_data.user_id +' ]: ');
	fs.readdir(uploadPath, function(err, files) {

			console.log('Writing to client about files' + files);
			stream.write({files : files});
			});
}

function request(client, meta) {
	// need add checks
	var filename = uploadPath + '/' + meta.name;
	console.log('Command [REQUEST] [USER_ID : ' + meta.client_data.user_id + ' ]' + filename);

	ormFile.findOne({
where : {
user_id   : meta.client_data.user_id,
filename  : meta.name,
id        : meta.file_id
}
}).then(function (fileToSend) {

	if (!fileToSend) {
	console.log('[ERR] File ' + meta.name +' does not exist or no access');
	return ;
	}
	console.log('[USER HAS ACCESS]' + fileToSend.filename);

	// Need to export this to another function 'download'
	var file = fs.createReadStream(uploadPath + '/' + fileToSend.filename);
	var data = {
name    : meta.name,
file_id : meta.file_id,
size    : file.size,
type    : file.type
}
data.event = 'download'
client.send(file, data);

}, function (err) {
console.log('[DB] Access unauthorized.');
});
}

function upload(stream, meta) {
	console.log('Command [UPLOAD] : Allow file uplaod')

		/* Neeed to check filetupe
		   if (!supportedType.indexOf(meta.type)) {
		   stream.write({
		   err: 'Unsupported type ' + meta.type
		   });
		   stream.end();
		   return ;
		   }*/

		// Create file in the upload path
		var file = fs.createWriteStream(uploadPath + '/' + meta.name);
	stream.pipe(file);

	stream.on('data', function (data) {
			stream.write(data);
			});
	strem.on('end', function () {
			stream.write({
end: true
});
			});
}

function download(stream, cb) {
	console.log('Command [DOWNLOAD] not implemented directly');
}

function monitor_login(client, meta) {
	console.log('Client logging in with [UID :' + meta.id +']');

	ormMonitor.find({
where: {
uid: meta.id
}, include : [{model : ormUser, as : 'user'}]
}).then(function(monitor) {
	if (!monitor) {
	// tell client you failed
	console.log('[ERR] Uid not found');
	return ;
	}
	console.log('Uid valid');
	client.data = { 
user_id       : monitor.user_id,
monitor_id    : monitor.id,
access_level  : 1, //default, does not mean a thing, yet
is_identified : true
};
console.log(client.data);
console.log('Now We need the recover this data');
client.send({}, {event : 'identify', identify : meta.id});

}, function(err) {
console.log(err);
console.log('[ERR] Identification failure');
// tell client you failed
})
}
