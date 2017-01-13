//
//  PlaylistNewController.swift
//  Shopcast
//
//  Created by chafiol on 16/10/2016.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistShowController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate, UITableViewDelegate, UITableViewDataSource {
    var playlist : Playlist?

    let picker = UIImagePickerController()
    
    var requester : Request = Request()
    
    var files = [File]()

    // MARK: Properties
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var _name: UILabel!
    @IBOutlet weak var _description: UILabel!
    
    // MARK: Actions
    @IBAction func takePhoto(_ sender: AnyObject) {
        picker.allowsEditing = false
        picker.sourceType = UIImagePickerControllerSourceType.camera
        picker.cameraCaptureMode = .photo
        picker.modalPresentationStyle = .fullScreen
        present(picker, animated: true, completion: nil)
    }
    
    @IBAction func selectPictureAction(_ sender: AnyObject) {
        picker.allowsEditing = false
        picker.sourceType = .photoLibrary
        picker.mediaTypes = UIImagePickerController.availableMediaTypes(for: .photoLibrary)!
        present(picker, animated: true, completion: nil)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.picker.delegate = self
        self.tableView.delegate = self
        self.tableView.dataSource = self
        if playlist != nil {
            print("JE GET SUR PLAYLIST")
            requester.get("playlist/\((playlist?.id)!)", callback: fileCallback)
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        if playlist != nil {
            _name.text = playlist?.name
            _description.text = playlist?.description
        }
    }
    
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated:true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any])
    {
        if let type = info[UIImagePickerControllerMediaType] as! String! {
            if type == "public.movie" {
                print("VIDEO CHOSEN")
            } else if type == "public.image" {
                print("PICTURE CHOSEN")
//                let chosenImage = info[UIImagePickerControllerOriginalImage] as! UIImage
//                image.contentMode = .scaleAspectFit
//                image.image = chosenImage
            }
        }
        dismiss(animated:true, completion: nil)
    }
    
    func fileCallback(_ response : AnyObject?) -> Void {
        
        print("JAI UNE REPONSE SUR FILECALLBACK")
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
        }
        let _files = (response!["playlist"]! as AnyObject!)["files"]!
        if (_files == nil && response!["message"]! != nil) {
            OperationQueue.main.addOperation {
                let ctrl = ErrorController(
                    message: response!["message"] as! String
                )
                ctrl.addOkButton()
                ctrl.display(self)
            }
        }
        
        
        if let __files: Array<AnyObject> = _files as? Array<AnyObject> {
            for _file in __files {
                print(_file)
                files += [File.parse(_file)]
            }
        }
        OperationQueue.main.addOperation {
            print("reload data")
            self.tableView.reloadData()
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.files.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "FileCell"
        let file = self.files[(indexPath as NSIndexPath).row]
        
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! UIFileCell
        print(file.name)
        cell.nameLabel?.text = file.name
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "fileShowSegue", sender:self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "fileShowSegue")
        {
            if let indexPath = self.tableView.indexPathForSelectedRow {
                let upcoming: FileShowController = segue.destination as! FileShowController
                upcoming.file = files[indexPath.row]
            }
        }
    }
}



