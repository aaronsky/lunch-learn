//
//  EventEmitter.swift
//  LunchLearn
//
//  Created by Aaron Sky on 4/3/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import AVFoundation
import UIKit

fileprivate let kAVPlayerSongEnded = Notification.Name("EventEmitter/ended")

@objc(EventEmitter)
class EventEmitter: RCTEventEmitter {
  override func constantsToExport() -> [String : Any]! {
    return [
      "ended": kAVPlayerSongEnded.rawValue
    ]
  }
  
  override func supportedEvents() -> [String]! {
    return [kAVPlayerSongEnded.rawValue]
  }
  
  override func startObserving() {
    NotificationCenter.default.addObserver(self, selector: #selector(EventEmitter.handleSongEndedNotification(notification:)), name: kAVPlayerSongEnded, object: nil)
  }
  
  override func stopObserving() {
    NotificationCenter.default.removeObserver(self)
  }
  
  class func application(_ application: UIApplication, songEnded song: AVAsset?) -> Bool {
    let payload: [String: Any] = [:]
    NotificationCenter.default.post(name: kAVPlayerSongEnded, object: self, userInfo: payload)
    return true
  }
  
  @objc func handleSongEndedNotification(notification: Notification) -> Void {
    self.sendEvent(withName: kAVPlayerSongEnded.rawValue, body: notification.userInfo)
  }
}
