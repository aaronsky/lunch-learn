//
//  CMTimeExtensions.swift
//  LunchLearn
//
//  Created by Aaron Sky on 4/4/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import CoreMedia

extension String {
  init(time: CMTime) {
    let seconds = CMTimeGetSeconds(time) as TimeInterval
    let now = Date()
    let date = Date(timeInterval: seconds, since: now)
    let components = Calendar.current.dateComponents([.minute, .second], from: now, to: date)
    var newSelf = "--"
    if let minute = components.minute {
      newSelf += "\(minute < 10 ? "0" + String(minute) : String(minute))"
    }
    newSelf += ":"
    if let second = components.second {
      newSelf += "\(second < 10 ? "0" + String(second) : String(second))"
    } else {
      newSelf += "--"
    }
    self = newSelf
  }
}
