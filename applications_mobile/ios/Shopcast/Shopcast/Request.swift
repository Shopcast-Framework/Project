//
//  Request.swift
//  Shopcast
//
//  Created by chafiol on 30/08/16.
//  Copyright © 2016 Shopcast. All rights reserved.
//

import Foundation

class Request {
    
    let apiUrl : String = "http://localhost:3001/api/"

    func exec(type: String, action: String, body: Dictionary<String, String>?, callback: (AnyObject?) -> Bool) {
        let requestUrl = apiUrl + action
        let session = NSURLSession.sharedSession()
        
        print(requestUrl)

        guard let url = NSURL(string: requestUrl) else {
            print("Error: cannot create URL")
            callback(nil)
            return
        }
        let request = NSMutableURLRequest(URL: url)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.HTTPMethod = type
        
        if (type == "POST") {
            do {
                request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(body!, options: [])
            }
            catch {
                print("Error: \(error)")
                callback(nil)
            }
        }
        
        let task = session.dataTaskWithRequest(request, completionHandler: {
            (data: NSData?, response: NSURLResponse?, error: NSError?) in
            // this is where the completion handler code goes
            do {
                let response = try NSJSONSerialization.JSONObjectWithData(data!, options:[])
                callback(response)
            }
            catch {
                print("Error: \(error)")
                callback(nil)
            }
        })
        task.resume()
    }
    
    func get(action: String, callback: (AnyObject?) -> Bool) {
        exec("GET", action: action, body: nil, callback: callback)
    }
    
    func post(action: String, body: Dictionary<String, String>?, callback: (AnyObject?) -> Bool) {
        exec("POST", action: action, body: body, callback: callback)
    }
}