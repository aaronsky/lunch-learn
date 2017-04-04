//
//  EventEmitter.swift
//  LunchLearn
//
//  Created by Aaron Sky on 4/3/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import CoreMedia
import UIKit

fileprivate let kAVPlayerSongTimeChanged = Notification.Name("EventEmitter/timechange")

@objc(EventEmitter)
class EventEmitter: RCTEventEmitter {
  override func constantsToExport() -> [String : Any]! {
    return [
      "timechange": kAVPlayerSongTimeChanged.rawValue
    ]
  }
  
  override func supportedEvents() -> [String]! {
    return [kAVPlayerSongTimeChanged.rawValue]
  }
  
  override func startObserving() {
    NotificationCenter.default.addObserver(self, selector: #selector(EventEmitter.handleSongTimeChangedNotification(notification:)), name: kAVPlayerSongTimeChanged, object: nil)
  }
  
  override func stopObserving() {
    NotificationCenter.default.removeObserver(self)
  }
  
  class func application(_ application: UIApplication, songTimeChanged time: CMTime) -> Bool {
    let payload = [
      "time": time.value
    ]
    NotificationCenter.default.post(name: kAVPlayerSongTimeChanged, object: self, userInfo: payload)
    return true
  }
  
  @objc func handleSongTimeChangedNotification(notification: Notification) -> Void {
    self.sendEvent(withName: kAVPlayerSongTimeChanged.rawValue, body: notification.userInfo)
  }
}
