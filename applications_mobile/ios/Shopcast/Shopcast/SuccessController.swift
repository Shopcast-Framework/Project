//
//  SuccessController.swift
//  Shopcast
//
//  Created by chafiol on 18/01/2017.
//  Copyright © 2017 Shopcast. All rights reserved.
//

import UIKit

class SuccessController {
    
    var controller : UIAlertController
    
    init(message: String) {
        controller = UIAlertController(
            title: "Success",
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
