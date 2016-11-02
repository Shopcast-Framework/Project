//
//  Playlist.swift
//  Shopcast
//
//  Created by chafiol on 09/10/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class Playlist {
    var name: String
    var description: String
    
    init(_name: String, _description: String) {
        name = _name
        description = _description
    }
    
    static func parse(_ blob: AnyObject) -> Playlist {
        return Playlist(
            _name: blob["name"] as! String,
            _description: blob["description"] as! String
        )
    }
}
