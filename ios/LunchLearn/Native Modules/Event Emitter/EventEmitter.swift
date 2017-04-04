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

fileprivate let kAVPlayerSongTimeChanged = Notification.Name("EventEmitter/timechange")
fileprivate let kAVPlayerSongEnded = Notification.Name("EventEmitter/ended")

@objc(EventEmitter)
class EventEmitter: RCTEventEmitter {
  override func constantsToExport() -> [String : Any]! {
    return [
      "timechange": kAVPlayerSongTimeChanged.rawValue,
      "ended": kAVPlayerSongEnded.rawValue
    ]
  }
  
  override func supportedEvents() -> [String]! {
    return [kAVPlayerSongTimeChanged.rawValue, kAVPlayerSongEnded.rawValue]
  }
  
  override func startObserving() {
    NotificationCenter.default.addObserver(self, selector: #selector(EventEmitter.handleSongTimeChangedNotification(notification:)), name: kAVPlayerSongTimeChanged, object: nil)
    NotificationCenter.default.addObserver(self, selector: #selector(EventEmitter.handleSongEndedNotification(notification:)), name: kAVPlayerSongEnded, object: nil)
  }
  
  override func stopObserving() {
    NotificationCenter.default.removeObserver(self)
  }
  
  class func application(_ application: UIApplication, songTimeChanged time: CMTime) -> Bool {
    let payload = [
      "time": String(time: time)
    ]
    NotificationCenter.default.post(name: kAVPlayerSongTimeChanged, object: self, userInfo: payload)
    return true
  }
  
  class func application(_ application: UIApplication, songEnded song: AVPlayerItem) -> Bool {
    let payload = [
      "song": AudioPlayer.itemTo(rnPayload: song)
    ]
    NotificationCenter.default.post(name: kAVPlayerSongEnded, object: self, userInfo: payload)
    return true
  }
  
  @objc func handleSongTimeChangedNotification(notification: Notification) -> Void {
    self.sendEvent(withName: kAVPlayerSongTimeChanged.rawValue, body: notification.userInfo)
  }
  
  @objc func handleSongEndedNotification(notification: Notification) -> Void {
    self.sendEvent(withName: kAVPlayerSongEnded.rawValue, body: notification.userInfo)
  }
}
