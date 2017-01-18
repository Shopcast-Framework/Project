//
//  ViewController.swift
//  Shopcast
//
//  Created by chafiol on 11/08/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class SigninController: UIViewController {

    var requester : Request = Request()

    // MARK: Properties
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        OperationQueue.main.addOperation {
            if let _: User = User.loadUser() {
                self.performSegue(withIdentifier: "dashboardSegue", sender:self)
            }
            
        }
    }

    func loginCallback(_ response : AnyObject?) -> Void {
        
        if (response == nil) {
            print("Error can't connect to server")
            return
        }

        if (response!["user"]! == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
            return
        }
        
        guard let user = response!["user"] as? [String: Any] else {
            let ctrl = ErrorController(
                message: response!["message"] as! String
            )
            ctrl.addOkButton()
            ctrl.display(self)
            return
        }
        
        guard let token = user["token"] as? String else {
            let ctrl = ErrorController(
                message: response!["message"] as! String
            )
            ctrl.addOkButton()
            ctrl.display(self)
            return
        }

        User(
            token: token
        ).save()
        OperationQueue.main.addOperation {
            self.performSegue(withIdentifier: "dashboardSegue", sender:self)
        }
    }
    
    // MARK: Actions
    @IBAction func signIn(_ sender: UIButton) {
        requester.post("session", body: [
            "strategy" : "local" as AnyObject, "username" : usernameTextField.text! as AnyObject, "password" : passwordTextField.text! as AnyObject
        ], callback: loginCallback)
    }

}

