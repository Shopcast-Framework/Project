//
//  Error.swift
//  Shopcast
//
//  Created by chafiol on 18/09/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class ErrorController {
    
    var controller : UIAlertController
    
    init(message: String) {
        controller = UIAlertController(
            title: "Error",
            message: message,
            preferredStyle: .Alert
        )
    }
    
    func addOkButton() {
        controller.addAction(
            UIAlertAction(title: "Ok", style: .Cancel) { (_) in }
        )
    }
    
    func display(mainController : UIViewController) {
        mainController.presentViewController(controller, animated: true) {}
    }

}