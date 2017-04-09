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
  fileprivate var players: [AVAudioPlayer]
  
  override init() {
      players = []
  }
  
  public static func moduleName() -> String! {
    return "AudioPlayer"
  }
  
  public func constantsToExport() -> [String : Any]! {
    let urls = Bundle.main.urls(forResourcesWithExtension: "wav", subdirectory: nil)!
    let songNames = urls.map() { url in
      return url.lastPathComponent.replacingOccurrences(of: ".wav", with: "")
    }
    return [ "songs": songNames ]
  }
  
  @objc func play(_ songName: String) -> Void {
    guard let url = Bundle.main.url(forResource: songName, withExtension: "wav") else {
      print("\(songName).wav not found in bundle")
      return
    }
    do {
      let player = try AVAudioPlayer(contentsOf: url)
      player.volume = 1.0
      player.delegate = self
      players.append(player)
      player.prepareToPlay()
      player.play()
    } catch {
      print(error)
    }
  }
}

extension AudioPlayer: AVAudioPlayerDelegate {
  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    _ = EventEmitter.application(UIApplication.shared, songEnded: nil)
    if let index = players.index(of: player) {
      players.remove(at: index)
    }
  }
}
