//
//  ImagePickerController.swift
//  Shopcast
//
//  Created by chafiol on 04/11/2016.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class ImagePickerController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    let picker = UIImagePickerController()

    @IBOutlet weak var image: UIImageView!
    
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
    override func viewDidLoad() {
        super.viewDidLoad()
        picker.delegate = self
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
                let chosenImage = info[UIImagePickerControllerOriginalImage] as! UIImage
                image.contentMode = .scaleAspectFit
                image.image = chosenImage
            }
        }
        dismiss(animated:true, completion: nil)
    }

}
