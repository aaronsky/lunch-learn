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
  
  public func constantsToExport() -> [String : Any]! {
    let urls = Bundle.main.urls(forResourcesWithExtension: "mp3", subdirectory: nil)!
    let songNames = urls.map() { url in
      return url.lastPathComponent.replacingOccurrences(of: ".mp3", with: "")
    }
    return [ "songs": songNames ]
  }
  
  @objc func play(_ song: String) -> Void {
    if player.currentItem == nil {
      reset(song)
    }
    player.play()
  }
  
  @objc func pause() -> Void {
    player.pause()
  }
  
  @objc func stop() -> Void {
    pause()
    reset()
  }
  
  func reset(_ songName: String? = nil) -> Void {
    guard let song = songName else {
      player.replaceCurrentItem(with: nil)
      return
    }
    guard let url = Bundle.main.url(forResource: song, withExtension: "mp3") else {
      player.replaceCurrentItem(with: nil)
      return
    }
    let playerItem = AVPlayerItem(url: url)
    player.replaceCurrentItem(with: playerItem)
  }
}
