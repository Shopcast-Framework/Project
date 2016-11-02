//
//  PlaylistNewController.swift
//  Shopcast
//
//  Created by chafiol on 16/10/2016.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistShowController: UIViewController {
    var playlist : Playlist?

    // MARK: Properties
    @IBOutlet weak var _name: UILabel!
    @IBOutlet weak var _description: UILabel!

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if playlist != nil {
            _name.text = playlist?.name
            _description.text = playlist?.description
        }
    }
}



