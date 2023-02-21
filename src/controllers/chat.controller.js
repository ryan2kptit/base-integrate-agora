"use strict";
const ChatTokenBuilder =
  require("../services/chatTokenBuilder.service").ChatTokenBuilder;
const axios = require("axios");
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const ORIN_NAME = process.env.ORIN_NAME;
const APP_NAME = process.env.APP_NAME;
const REST_API = process.env.REST_API;
class ChatController {
  generateChatToken = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const expirationInSeconds = 6000;
    const { username, password } = req.body;
    let userUuid;
    const appToken = ChatTokenBuilder.buildAppToken(
      APP_ID,
      APP_CERTIFICATE,
      expirationInSeconds
    );
    try {
      var userExist = await axios.get(
        `${REST_API}/${ORIN_NAME}/${APP_NAME}/users/${username}`,
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${appToken}`,
          },
          mode: "cors",
          redirect: "follow",
          referrer: "no-referrer",
        }
      );
    } catch (error) {
      console.log("error :>> ", error.data);
    }
    if (userExist) userUuid = userExist.uuid;
    else {
      var newUser = await axios.post(
        `${REST_API}/${ORIN_NAME}/${APP_NAME}/users`,
        { username: username, password: password, nickname: username },
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${appToken}`,
          },
          mode: "cors",
          redirect: "follow",
          referrer: "no-referrer",
        }
      );

      userUuid = newUser.data.entities[0].uuid;
    }
    const userToken = ChatTokenBuilder.buildUserToken(
      APP_ID,
      APP_CERTIFICATE,
      userUuid,
      expirationInSeconds
    );

    return res.json({ uid: username, token: userToken });
  };

  addSupperAdminRoom = async (req, res) => {
    const { username } = req.body;
    try {
      const expirationInSeconds = 6000;

      const appToken = ChatTokenBuilder.buildAppToken(
        APP_ID,
        APP_CERTIFICATE,
        expirationInSeconds
      );

      const superAdmin = await axios.post(
        `${REST_API}/${ORIN_NAME}/${APP_NAME}/chatrooms/super_admin`,
        {
          superadmin: username,
        },
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${appToken}`,
          },
          mode: "cors",
          redirect: "follow",
          referrer: "no-referrer",
        }
      );
      console.log(superAdmin.data);
      return res.json(superAdmin.data);
    } catch (error) {
      console.log("error.data :>> ", error.data);
    }
  };

  createRoomChat = async (req, res) => {
    const { name, description, maxusers, owner, members } = req.body;
    try {
      const expirationInSeconds = 6000;

      const appToken = ChatTokenBuilder.buildAppToken(
        APP_ID,
        APP_CERTIFICATE,
        expirationInSeconds
      );

      const room = await axios.post(
        `${REST_API}/${ORIN_NAME}/${APP_NAME}/chatrooms`,
        {
          name,
          description,
          maxusers,
          owner,
        },
        {
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${appToken}`,
          },
          mode: "cors",
          redirect: "follow",
          referrer: "no-referrer",
        }
      );
      console.log(room.data);
      return res.json(room.data);
    } catch (error) {
      console.log("error.data :>> ", error.data);
    }
  };
}

module.exports = new ChatController();
