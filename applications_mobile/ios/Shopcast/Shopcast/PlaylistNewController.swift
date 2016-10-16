//
//  PlaylistNewController.swift
//  Shopcast
//
//  Created by chafiol on 16/10/2016.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistNewController: UIViewController {
    
    var requester : Request = Request()
    
    // MARK: Properties
    @IBOutlet weak var nameField: UITextField!
    @IBOutlet weak var descriptionField: UITextField!
    @IBOutlet weak var frequencyField: UITextField!
    @IBOutlet weak var tagField: UITextField!

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    @IBAction func save(sender: AnyObject) {
        requester.post("playlist", body: [
            "name" : nameField.text!,
            "description" : descriptionField.text!,
            "frequency" : frequencyField.text!,
            "tagField" : tagField.text!
        ], callback: playlistEditCallback)
    }
    
    func playlistEditCallback(response : AnyObject?) -> Bool {
        
        if (response == nil) {
            NSOperationQueue.mainQueue().addOperationWithBlock {
                let ctrl = ErrorController(
                    message: "Error: Response is nil"
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
            return false;
        }
        
        if (response!["playlists"]! == nil && response!["message"]! != nil) {
            NSOperationQueue.mainQueue().addOperationWithBlock {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
            return false
        }
        NSOperationQueue.mainQueue().addOperationWithBlock {
            self.performSegueWithIdentifier("dashboardSegue", sender:self)
        }
        return true
    }
    
}



