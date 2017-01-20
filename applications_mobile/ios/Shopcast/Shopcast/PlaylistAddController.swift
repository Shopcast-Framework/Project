//
//  PlaylistAddController.swift
//  Shopcast
//
//  Created by chafiol on 17/01/2017.
//  Copyright © 2017 Shopcast. All rights reserved.
//

import UIKit

class PlaylistAddFileController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UITableViewDelegate, UITableViewDataSource {
    var playlist : Playlist?
    
    let picker = UIImagePickerController()
    
    var requester : Request = Request()
    
    var files = [File]()
    
    // MARK: Properties
    @IBOutlet weak var tableView: UITableView!
    
    @IBAction func save(_ sender: AnyObject) {
        var list = [NSNumber]()
        
        for section in 0 ..< tableView.numberOfSections {
            let rowCount = tableView.numberOfRows(inSection: section)
            
            for row in 0 ..< rowCount {
                if let cell = tableView.cellForRow(at: IndexPath(row: row, section: section)) as? UIFileCell {
                    if (cell.isToggle()) {
                        list.append(cell.getFileId())
                    }
                }
            }
        }
        
        if playlist != nil {
            requester.post("playlist/\((playlist?.id)!)/add", body: [
                "files" : list as AnyObject
                ], callback: fileAddCallback)
        }
    }
    
    func fileAddCallback(_ response : AnyObject?) -> Void {
        
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
        
        if (response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = SuccessController(
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
    
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        if playlist != nil {
            requester.get("file", callback: fileCallback)
        }
    }
    
    func parsePlaylist() -> Bool {
        
        return true
    }
    
    func fileCallback(_ response : AnyObject?) -> Void {
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
        
        if (response!["files"]! == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
        }
        
        if let _files: Array<AnyObject> = response!["files"]! as? Array<AnyObject> {
            for _blob in _files {
                let _file = File.parse(_blob)
                if (!_file.hasPlaylist(id: (playlist?.id)!)) {
                    files += [_file]
                }
            }
        }
        OperationQueue.main.addOperation {
            self.tableView.reloadData()
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.files.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "AddFileCell"
        let file = self.files[(indexPath as NSIndexPath).row]
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! UIFileCell
        cell.nameLabel?.text = file.name
        cell.descLabel?.text = file.description
        
        cell.iconLabel?.font = UIFont(name: "FontAwesome", size: 24)
        cell.iconLabel?.text = String(format: "%C", 0xF1C8)
        
        cell.nextLabel?.font = UIFont(name: "FontAwesome", size: 24)
        if (cell.isToggle()) {
            cell.nextLabel?.text = String(format: "%C", 0xF00C)
        } else {
            cell.nextLabel?.text = String(format: "%C", 0xF067)
        }
        cell.setfileId(_id: file.id)
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let cell = tableView.cellForRow(at: indexPath) as! UIFileCell
        cell.toggle()
        
        OperationQueue.main.addOperation {
            self.tableView.reloadData()
        }
    }
}
