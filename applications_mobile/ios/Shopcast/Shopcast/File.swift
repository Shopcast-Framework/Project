//
//  File.swift
//  Shopcast
//
//  Created by chafiol on 09/10/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class File {
    var id: NSNumber
    var name: String
    var description: String
    var playlists: [Playlist]
    
    init(_id: NSNumber, _name: String, _description: String, _playlists: [Playlist]) {
        id = _id
        name = _name
        description = _description
        playlists = _playlists
    }
    
    static func parse(_ blob: AnyObject) -> File {
        var _playlists = [Playlist]()
        let __playlists = (blob["playlists"]! as AnyObject!)
        if (__playlists != nil) {
            if let ___playlists: Array<AnyObject> = __playlists as? Array<AnyObject> {
                for _playlist in ___playlists {
                    _playlists += [Playlist.parse(_playlist)]
                }
            }
        }

        return File(
            _id: blob["id"] as! NSNumber,
            _name: blob["name"] as! String,
            _description: blob["description"] as! String,
            _playlists: _playlists
        )
    }
    
    func hasPlaylist(id: NSNumber) -> Bool {
        for _playlist in playlists {
            if (_playlist.id == id) {
                return true
            }
        }
        return false
    }
}
