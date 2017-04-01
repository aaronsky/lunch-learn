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
  var player: AVPlayer
  
  override init() {
    player = AVPlayer()
  }
  
  public static func moduleName() -> String! {
    return "AudioPlayer"
  }
  
  @objc func play() -> Void {
    if player.currentItem == nil {
      reset()
    }
    player.play()
  }
  
  @objc func pause() -> Void {
    player.pause()
  }
  
  @objc func reset() -> Void {
    let url = Bundle.main.url(forResource: "Capsule Silence", withExtension: "mp3")!
    let playerItem = AVPlayerItem(url: url)
    player.replaceCurrentItem(with: playerItem)
  }
}
