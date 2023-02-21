<!-- ABOUT THE PROJECT -->
# About The Project

This project shows a picture about how to integrate with Agora fundamentally
### Built With

* express

<!-- GETTING STARTED -->
### Prerequisites
* Reading docs about agora: https://docs.agora.io/en/
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
- Install the dependencies
```node
npm install
```
- Create a copy of the `.env.example` file and save it as `.env`
- Add your Agora App ID and App Certificate:
```
APP_ID=ca123xxxxxx
APP_CERTIFICATE=12za123xxxxxx
APP_CHAT_KEY=xxxxx#xxxxxx
ORIN_NAME=xxxxxxx
APP_NAME=xxxxxx
DOMAIN=https://a61.......
```
You can obtain these values by selecting your project in the [Agora console projects section](https://console.agora.io/projects). Optionally, you can also define a port.

- Start the service ( recommend node 18 )
```node
node --watch server.js
```


# Endpoints ##


## video-call ###


### RTC Token ###
The `rtc` token endpoint requires a `channelName`, `role` ('publisher' or 'audience'), `tokentype` ('uid' || 'userAccount') and the user's `uid` (type varies based on `tokentype` (example: `1000` for uid, `ekaansh` for userAccount). 
`(optional)` Pass an integer to represent the token lifetime in seconds.

**endpoint structure** 
```
/video-call/rtc/:channelName/:role/:tokentype/:uid/?expiry=
```

response:
``` 
{"rtcToken":" "} 
```

### RTM Token ###
The `rtm` token endpoint requires the user's `uid`. 
`(optional)` Pass an integer to represent the privelege lifetime in seconds.
**endpoint structure** 
```
/video-call/rtm/:uid/?expiry=
```

response:
``` 
{"rtmToken":" "} 
```

### Both Tokens ###
The `rte` token endpoint generates both the `rtc` and `rtm` tokens with a single request.
`(optional)` Pass an integer to represent the token lifetime in seconds.

**endpoint structure** 
```
/video-call/rte/:channelName/:role/:tokentype/:uid/?expiry=
```

response:
``` 
{
  "rtcToken":" ",
  "rtmToken":" " 
} 
```

## Chat ###

### RTC chat token ###
Getting token to chat one to one.

**endpoint structure** 
```
/chat/token
```
body:
``` 
{
  "username":" ",
  "password":" " 
} 
```

response:
``` 
{
  "rtcToken":" "
}
```

### Adding super admin ###
Assign role super admin in order to manage a room chat.

**endpoint structure** 
```
/chat/super-admin
```
body:
``` 
{
  "username":" "
} 
```

response:
``` 
{ }

```


# Web demo ##
* Agora's web demo: https://webdemo.agora.io/basicVideoCall/index.html

# References ##
* https://github.com/AgoraIO-Community/Agora-Node-TokenServer
* https://github.com/AgoraIO/Tools/tree/master/DynamicKey/AgoraDynamicKey












