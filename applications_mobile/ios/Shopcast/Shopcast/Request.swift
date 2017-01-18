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
    
    func getAuthToken() -> String? {
        return nil
    }

    func exec(_ type: String, action: String, body: Dictionary<String, AnyObject>?, callback: @escaping (AnyObject?) -> Void) {
        let requestUrl = apiUrl + action
        let session = URLSession.shared
        
        print(requestUrl)

        guard let url = URL(string: requestUrl) else {
            print("Error: cannot create URL")
            callback(nil)
            return
        }
        let request = NSMutableURLRequest(url: url)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        if let user: User = User.loadUser() {
            request.addValue("Bearer " + user.token, forHTTPHeaderField: "Authorization")
        }
        request.httpMethod = type
        
        if (type == "POST") {
            do {
                request.httpBody = try JSONSerialization.data(withJSONObject: body!, options: [])
            }
            catch {
                print("Error json: \(error)")
                callback(nil)
            }
        }
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: {
            (data, response, error) in
            
            guard let _:Data = data, let _:URLResponse = response  , error == nil else {
                print("Error")
                return
            }
            // this is where the completion handler code goes
            do {
                if let httpResponse = response as? HTTPURLResponse {
                    if (httpResponse.statusCode != 200) {
                        print("Error statusCode: \(httpResponse.statusCode) \(error)")
                        callback(nil)
                    } else {
                        let response = try JSONSerialization.jsonObject(with: data!, options:[])
                        callback(response as AnyObject?)
                    }
                } else {
                    print("Error response: \(error)")
                    callback(nil)
                }
            }
            catch {
                print("Error: \(error)")
                callback(nil)
            }
        })
        task.resume()
    }
    
    func get(_ action: String, callback: @escaping (AnyObject?) -> Void) {
        exec("GET", action: action, body: nil, callback: callback)
    }
    
    func post(_ action: String, body: Dictionary<String, AnyObject>?, callback: @escaping (AnyObject?) -> Void) {
        exec("POST", action: action, body: body, callback: callback)
    }
}
