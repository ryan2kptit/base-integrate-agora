"use strict";

const {
  TOKEN_TYPE_UID,
  TOKEN_TYPE_USER_ACCOUNT,
} = require("../common/constants");
const {
  RtcTokenBuilder,
  RtcRole,
  RtmTokenBuilder,
  RtmRole,
} = require("agora-access-token");
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

class VideoCallController {
  generateRTCToken = async (req, res, next) => {
    try {
      const { channel, uid, tokenType, role } = req.params;
      // get the expire time
      let expireTime = req.query.expiry;
      if (!expireTime || expireTime === "") {
        expireTime = 3600;
      } else {
        expireTime = parseInt(expireTime, 10);
      }

      // calculate privilege expire time
      const currentTime = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;
      let token;
      if (tokenType === TOKEN_TYPE_USER_ACCOUNT) {
        token = RtcTokenBuilder.buildTokenWithAccount(
          APP_ID,
          APP_CERTIFICATE,
          channel,
          uid,
          role,
          privilegeExpireTime
        );
      } else if (tokenType === TOKEN_TYPE_UID) {
        token = RtcTokenBuilder.buildTokenWithUid(
          APP_ID,
          APP_CERTIFICATE,
          channel,
          uid,
          role,
          privilegeExpireTime
        );
      } else {
        return res.status(400).json({ error: "token type is invalid" });
      }

      // return the token
      return res.json({ rtcToken: token });
    } catch (error) {
      next(error);
    }
  };

  generateRTMToken = (req, resp) => {
    // set response header
    resp.header("Access-Control-Allow-Origin", "*");

    // get uid
    let uid = req.params.uid;
    if (!uid || uid === "") {
      return resp.status(400).json({ error: "uid is required" });
    }
    // get role
    let role = RtmRole.Rtm_User;
    // get the expire time
    let expireTime = req.query.expiry;
    if (!expireTime || expireTime === "") {
      expireTime = 3600;
    } else {
      expireTime = parseInt(expireTime, 10);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // build the token
    console.log(APP_ID, APP_CERTIFICATE, uid, role, privilegeExpireTime);
    const token = RtmTokenBuilder.buildToken(
      APP_ID,
      APP_CERTIFICATE,
      uid,
      role,
      privilegeExpireTime
    );
    // return the token
    return resp.json({ rtmToken: token });
  };

  generateRTEToken = (req, resp) => {
    // set response header
    resp.header("Access-Control-Allow-Origin", "*");
    // get channel name
    const channelName = req.params.channel;
    if (!channelName) {
      return resp.status(400).json({ error: "channel is required" });
    }
    // get uid
    let uid = req.params.uid;
    if (!uid || uid === "") {
      return resp.status(400).json({ error: "uid is required" });
    }
    // get role
    let role;
    if (req.params.role === "publisher") {
      role = RtcRole.PUBLISHER;
    } else if (req.params.role === "audience") {
      role = RtcRole.SUBSCRIBER;
    } else {
      return resp.status(400).json({ error: "role is incorrect" });
    }
    // get the expire time
    let expireTime = req.query.expiry;
    if (!expireTime || expireTime === "") {
      expireTime = 3600;
    } else {
      expireTime = parseInt(expireTime, 10);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    // build the token
    const rtcToken = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      role,
      privilegeExpireTime
    );
    const rtmToken = RtmTokenBuilder.buildToken(
      APP_ID,
      APP_CERTIFICATE,
      uid,
      role,
      privilegeExpireTime
    );
    // return the token
    return resp.json({ rtcToken: rtcToken, rtmToken: rtmToken });
  };
}

module.exports = new VideoCallController();
