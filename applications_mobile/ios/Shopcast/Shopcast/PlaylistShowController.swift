//
//  PlaylistNewController.swift
//  Shopcast
//
//  Created by chafiol on 16/10/2016.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class PlaylistShowController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    var playlist : Playlist?

    let picker = UIImagePickerController()

    // MARK: Properties
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
        picker.delegate = self
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
}
