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

@end
