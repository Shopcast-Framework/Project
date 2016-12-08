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
            preferredStyle: .alert
        )
    }
    
    func addOkButton() {
        controller.addAction(
            UIAlertAction(title: "Ok", style: .cancel) { (_) in }
        )
    }
    
    func display(_ mainController : UIViewController) {
        mainController.present(controller, animated: true) {}
    }

}
