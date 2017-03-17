//
//  AudioPlayer.swift
//  LunchLearn
//
//  Created by Aaron Sky on 3/16/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(AudioPlayer)
class AudioPlayer: NSObject, RCTBridgeModule {
  var player: AVQueuePlayer
  
  override init() {
    player = AVQueuePlayer()
  }
  
  public static func moduleName() -> String! {
    return "AudioPlayer"
  }
  
  func playSound(with urlString: String) -> Void {
    guard let url = URL(string: urlString) else {
      return
    }
    player.removeAllItems()
    let playerItem = AVPlayerItem(url: url)
    player.insert(playerItem, after: nil)
    player.play()
  }
}
