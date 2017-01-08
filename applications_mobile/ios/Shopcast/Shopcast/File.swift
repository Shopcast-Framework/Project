//
//  Playlist.swift
//  Shopcast
//
//  Created by chafiol on 09/10/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class File {
    var name: String
    var description: String
    
    init(_name: String, _description: String) {
        name = _name
        description = _description
    }
    
    static func parse(_ blob: AnyObject) -> File {
        return File(
            _name: blob["name"] as! String,
            _description: blob["description"] as! String
        )
    }
}
