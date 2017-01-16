//
//  Date.swift
//  Shopcast
//
//  Created by chafiol on 16/01/2017.
//  Copyright © 2017 Shopcast. All rights reserved.
//

import Foundation

class MDate {
    var date: Date
    
    init(_date: Date) {
        date = _date
    }
    
    func value() -> String {
        let formatter: DateFormatter = DateFormatter()
        formatter.dateFormat = "EEEE, MMMM dd yyyy' at 'h:mma"

        return formatter.string(from: date)
    }
    
    static func parse(_ blob: String) -> MDate {
        let formatter: DateFormatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
        
        return MDate(
            _date: (formatter.date(from: String(blob.characters.dropLast(5))) as Date?)!
        )
    }
}
