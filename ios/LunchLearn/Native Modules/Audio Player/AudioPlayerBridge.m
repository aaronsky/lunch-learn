//
//  AudioPlayerBridge.m
//  LunchLearn
//
//  Created by Aaron Sky on 3/16/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AudioPlayer, NSObject)

RCT_EXTERN_METHOD(play:(NSString *)songName)
RCT_EXTERN_METHOD(pause)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(getCurrentSong:(RCTPromiseResolveBlock)resolve andRejecter:(RCTPromiseRejectBlock)reject)

@end
