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
    
    static let DocumentsDirectory = NSFileManager().URLsForDirectory(.DocumentDirectory, inDomains: .UserDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.URLByAppendingPathComponent("shopcast")
    
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

    func encodeWithCoder(aCoder: NSCoder) {
        aCoder.encodeObject(token, forKey: PropertyKey.tokenKey)
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        self.init(
            token: aDecoder.decodeObjectForKey(PropertyKey.tokenKey) as! String
        )
    }
    
    func save() {
        let isSuccessfulSave = NSKeyedArchiver.archiveRootObject([self], toFile: User.ArchiveURL.path!)
        if !isSuccessfulSave {
            print("Failed to save meals...")
        }
    }
    
    static func loadUser() -> User? {
        if let users: [User] = NSKeyedUnarchiver.unarchiveObjectWithFile(User.ArchiveURL.path!) as! [User]? {
            return users[0]
        }
        return nil
    }

}