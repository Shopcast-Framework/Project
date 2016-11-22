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
        NSOperationQueue.mainQueue().addOperationWithBlock {
            if let _: User = User.loadUser() {
                self.performSegueWithIdentifier("dashboardSegue", sender:self)
            }
            
        }
    }

    func loginCallback(response : AnyObject?) -> Bool {

        if (response!["user"]! == nil && response!["message"]! != nil) {
            NSOperationQueue.mainQueue().addOperationWithBlock {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
        }
        
        if (response!["user"]! != nil) {

            User(
                token: response!["user"]!!["token"] as! String
            ).save()
            NSOperationQueue.mainQueue().addOperationWithBlock {
                self.performSegueWithIdentifier("dashboardSegue", sender:self)
            }
        }
        return true
    }
    
    // MARK: Actions
    @IBAction func signIn(sender: UIButton) {
        requester.post("session", body: [
            "strategy" : "local", "username" : usernameTextField.text!, "password" : passwordTextField.text!
        ], callback: loginCallback)
    }

}

