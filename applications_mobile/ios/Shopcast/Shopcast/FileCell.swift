//
//  PlaylistTableController.swift
//  Shopcast
//
//  Created by chafiol on 09/10/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class UIFileCell: UITableViewCell {
    
    var _toggle = false
    var file_id: NSNumber = 0
    
    // MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var descLabel: UILabel!
    @IBOutlet weak var iconLabel: UILabel!
    @IBOutlet weak var nextLabel: UILabel!
    
    func toggle() {
        self._toggle = !self._toggle
    }
    
    func isToggle() -> Bool {
        return self._toggle
    }
    
    func setfileId(_id: NSNumber) {
        self.file_id = _id
    }
    
    func getFileId() -> NSNumber {
        return self.file_id
    }
}
