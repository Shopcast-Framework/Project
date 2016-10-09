//
//  PlaylistController.swift
//  Shopcast
//
//  Created by chafiol on 20/09/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistController: UITableViewController {
    
    var requester : Request = Request()
    
    // MARK: Properties
    var playlists = [Playlist]()
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        requester.get("playlist", callback: playlistCallback)
    }
    
    func playlistCallback(response : AnyObject?) -> Bool {
        
        if (response!["playlists"]! == nil && response!["message"]! != nil) {
            NSOperationQueue.mainQueue().addOperationWithBlock {
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
        NSOperationQueue.mainQueue().addOperationWithBlock {
            self.tableView.reloadData()
        }
        return true
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return playlists.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cellIdentifier = "PlaylistCell"
        let playlist = playlists[indexPath.row]
        
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as! UIPlaylistCell
        cell.nameLabel.text = playlist.name
        return cell
    }
}



