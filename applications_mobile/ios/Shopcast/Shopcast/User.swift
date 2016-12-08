//
//  Signin.swift
//  Shopcast
//
//  Created by chafiol on 20/09/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import UIKit

class User: NSObject, NSCoding {
    
    var token: String
    
    // MARK: Archiving path
    
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("shopcast")
    
    // MARK: Types
    
    struct PropertyKey {
        static let tokenKey = "token"
    }
    
    // MARK: Initialization
    
    init(token: String) {
        
        self.token = token

        super.init()
    }
    
    // MARK: NSCoding

    func encode(with aCoder: NSCoder) {
        aCoder.encode(token, forKey: PropertyKey.tokenKey)
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        self.init(
            token: aDecoder.decodeObject(forKey: PropertyKey.tokenKey) as! String
        )
    }
    
    func save() {
        let isSuccessfulSave = NSKeyedArchiver.archiveRootObject([self], toFile: User.ArchiveURL.path)
        if !isSuccessfulSave {
            print("Failed to save meals...")
        }
    }
    
    static func loadUser() -> User? {
        if let users: [User] = NSKeyedUnarchiver.unarchiveObject(withFile: User.ArchiveURL.path) as! [User]? {
            return users[0]
        }
        return nil
    }

}
