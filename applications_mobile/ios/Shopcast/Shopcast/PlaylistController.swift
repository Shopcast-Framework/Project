//
//  PlaylistController.swift
//  Shopcast
//
//  Created by chafiol on 20/09/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var requester : Request = Request()
    
    // MARK: Properties
    
    @IBOutlet var tableView: UITableView!
    
    var playlists = [Playlist]()
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.tableView.delegate = self
        self.tableView.dataSource = self
        requester.get("playlist", callback: playlistCallback)
    }
    
    func playlistCallback(_ response : AnyObject?) -> Void {
   
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
        
        if (response!["playlists"]! == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
        }
            
        if let _playlists: Array<AnyObject> = response!["playlists"] as? Array<AnyObject> {
            
            for _playlist in _playlists {
                print(_playlist)
                playlists += [Playlist.parse(_playlist)]
            }
        }
        OperationQueue.main.addOperation {
            print("reload data")
            self.tableView.reloadData()
        }
    }
        
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.playlists.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "PlaylistCell"
        let playlist = self.playlists[(indexPath as NSIndexPath).row]
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! UIPlaylistCell
        print(playlist.name)
        cell.nameLabel?.text = playlist.name
        return cell
    }
}



