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
    
    init(_name: String) {
        name = _name
    }
    
    static func parse(_ blob: AnyObject) -> Playlist {
        return Playlist(_name: blob["name"] as! String)
    }
}
