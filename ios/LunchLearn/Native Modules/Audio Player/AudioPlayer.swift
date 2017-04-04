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
  fileprivate var timeChangeObserver: Any?
  
  override init() {
    player = AVPlayer()
    timeChangeObserver = nil
  }
  
  deinit {
    if let observer = timeChangeObserver {
        player.removeTimeObserver(observer)
    }
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
  
  @objc func play(_ songName: String) -> Void {
    if player.currentItem == nil {
      reset(songName)
    }
    let seconds = Float64(0.1)
    let timeScale = Int32(NSEC_PER_SEC)
    let interval = CMTimeMakeWithSeconds(seconds, timeScale)
    timeChangeObserver = player.addPeriodicTimeObserver(forInterval: interval, queue: nil) { time in
      _ = EventEmitter.application(UIApplication.shared, songTimeChanged: time)
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
  
  @objc func getCurrentSong(_ resolve: RCTPromiseResolveBlock, andRejecter reject: RCTPromiseRejectBlock) -> Void {
    guard let song = player.currentItem else {
      resolve([
        "title": "",
        "artist": "",
        "totalTime": ""
      ])
      return
    }
    var payload = [
      "totalTime": String(song.duration.value)
    ]
    let metadata = song.asset.commonMetadata
    for meta in metadata {
      guard payload["title"] == nil || payload["artist"] == nil else {
        break
      }
      if meta.commonKey == "title" {
        payload["title"] = meta.stringValue!
      } else if meta.commonKey == "artist" {
        payload["artist"] = meta.stringValue!
      }
    }
    resolve(payload)
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
    if let observer = timeChangeObserver {
      player.removeTimeObserver(observer)
    }
    let playerItem = AVPlayerItem(url: url)
    player.replaceCurrentItem(with: playerItem)
  }
  
  func currentTime() -> CMTime {
    guard let song = player.currentItem else {
      return kCMTimeInvalid
    }
    if song.status == .readyToPlay {
      return song.duration
    }
    return kCMTimeInvalid
  }
}
