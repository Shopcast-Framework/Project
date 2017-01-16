//
//  DashboardController.swift
//  Shopcast
//
//  Created by chafiol on 18/09/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class DashboardController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var requester : Request = Request()
    
    // MARK: Properties
    
    @IBOutlet var tableView: UITableView!
    @IBOutlet weak var amountLabel: UILabel!

    var histories = [History]()
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        requester.get("history", callback: historyCallback)
    }

    func historyCallback(_ response : AnyObject?) -> Void {
        
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
        
        if (response!["history"]! == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
        }
        
        if let _histories: Array<AnyObject> = response!["history"] as? Array<AnyObject> {
            
            for _history in _histories {
                print(_history)
                histories += [History.parse(_history)]
            }
        }
        OperationQueue.main.addOperation {
            self.tableView.reloadData()
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return histories.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "HistoryCell"
        let history = histories[(indexPath as NSIndexPath).row]
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! UIHistoryCell
        cell.nameLabel?.text = history.playlist.name
        cell.dateLabel?.text = history.date.value()
        amountLabel?.text = String(histories.count)
        
        cell.iconLabel?.font = UIFont(name: "FontAwesome", size: 24)
        cell.iconLabel?.text = String(format: "%C", 0xF1DA)
        return cell
    }

}
