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

    @IBAction func save(_ sender: AnyObject) {
        requester.post("playlist", body: [
            "name" : nameField.text! as AnyObject,
            "description" : descriptionField.text! as AnyObject,
            "frequency" : frequencyField.text! as AnyObject,
            "tagField" : tagField.text! as AnyObject
        ], callback: playlistEditCallback)
    }
    
    @IBAction func back(_ send: AnyObject) {
        OperationQueue.main.addOperation {
            self.dismiss(animated: true, completion: nil);
        }        
    }
    
    func playlistEditCallback(_ response : AnyObject?) -> Void {
        
        if (response == nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: "Error: Response is nil"
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
            return
        }
        
        if (response!["playlist"]! == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
            return
        }
        OperationQueue.main.addOperation {
            self.dismiss(animated: true, completion: nil);
        }
    }
    
}



