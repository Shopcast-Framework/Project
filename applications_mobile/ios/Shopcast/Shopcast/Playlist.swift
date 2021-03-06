//
//  Playlist.swift
//  Shopcast
//
//  Created by chafiol on 09/10/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class Playlist {
    var id: NSNumber
    var name: String
    var description: String
    
    init(_id: NSNumber, _name: String, _description: String) {
        id = _id
        name = _name
        description = _description
    }
    
    static func parse(_ blob: AnyObject) -> Playlist {
        return Playlist(
            _id: blob["id"] as! NSNumber,
            _name: blob["name"] as! String,
            _description: blob["description"] as! String
        )
    }
}
