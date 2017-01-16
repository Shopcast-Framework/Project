//
//  History.swift
//  Shopcast
//
//  Created by chafiol on 16/01/2017.
//  Copyright © 2017 Shopcast. All rights reserved.
//

import UIKit

class History {
    var playlist: Playlist
    var date: MDate
    
    init(_playlist: Playlist, _date: MDate) {
        date = _date
        playlist = _playlist
    }
    
    static func parse(_ blob: AnyObject) -> History {

        return History(
            _playlist: Playlist.parse(blob["playlist"] as! NSDictionary),
            _date: MDate.parse(blob["created_at"] as! String)
        )
    }
}
