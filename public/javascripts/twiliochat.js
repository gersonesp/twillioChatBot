//twilio chat
const fetch = require("node-fetch");

const state = {};

function fetchAccessToken(username, handler) {
  // fetch("/token", { identity: username, device: "browser" })
  //   .then(resp => resp.json())
  //   .then(token => (state[token] = token))
  //   .catch(error =>
  //     console.log("Failed to fetch the Access Token with error: " + error)
  //   );
  $.post("/token", { identity: username, device: "browser" }, null, "json")
    .done(function(response) {
      handler(response.token);
    })
    .fail(function(error) {
      console.log("Failed to fetch the Access Token with error: " + error);
    });
}

fetchAccessToken();

function connectMessagingClient(token) {
  // Initialize the Chat messaging client
  Twilio.Chat.Client.create(token).then(function(client) {
    tc.messagingClient = client;
    updateConnectedUI();
    tc.loadChannelList(tc.joinGeneralChannel);
    tc.messagingClient.on("channelAdded", $.throttle(tc.loadChannelList));
    tc.messagingClient.on("channelRemoved", $.throttle(tc.loadChannelList));
    tc.messagingClient.on("tokenExpired", refreshToken);
  });
}

tc.loadChannelList = function(handler) {
  if (tc.messagingClient === undefined) {
    console.log("Client is not initialized");
    return;
  }

  tc.messagingClient.getPublicChannelDescriptors().then(function(channels) {
    tc.channelArray = tc.sortChannelsByName(channels.items);
    $channelList.text("");
    tc.channelArray.forEach(addChannel);
    if (typeof handler === "function") {
      handler();
    }
  });
};

tc.joinGeneralChannel = function() {
  console.log('Attempting to join "general" chat channel...');
  if (!tc.generalChannel) {
    // If it doesn't exist, let's create it
    tc.messagingClient
      .createChannel({
        uniqueName: GENERAL_CHANNEL_UNIQUE_NAME,
        friendlyName: GENERAL_CHANNEL_NAME
      })
      .then(function(channel) {
        console.log("Created general channel");
        tc.generalChannel = channel;
        tc.loadChannelList(tc.joinGeneralChannel);
      });
  } else {
    console.log("Found general channel:");
    setupChannel(tc.generalChannel);
  }
};

function initChannelEvents() {
  console.log(tc.currentChannel.friendlyName + " ready.");
  tc.currentChannel.on("messageAdded", tc.addMessageToList);
  tc.currentChannel.on("typingStarted", showTypingStarted);
  tc.currentChannel.on("typingEnded", hideTypingStarted);
  tc.currentChannel.on("memberJoined", notifyMemberJoined);
  tc.currentChannel.on("memberLeft", notifyMemberLeft);
  $inputText.prop("disabled", false).focus();
}
