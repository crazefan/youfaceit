## YouFaceIt 🤖🎮

YouFaceIt is a discord bot made with [Discord.js](https://discord.js.org/).
It allows players on a server to show their latest **FaceIt CS:GO** game info and result, detect who played best and worst, show personal stats etc.

_The idea was born on our Discord server, our team needed a way to automate the indication of who played worst and needed to improve their game (and call him a noob of course) and who played best in order to praise them for good job!_

### Prerequisites 🛠️

To use it on your Discord server you need to have:

- a valid [FaceIt API](https://developers.faceit.com/) key
- Discord bot token from an [Discord developer portal](https://discord.com/developers/applications)
- a way to deploy your server (I personally use [Heroku](https://heroku.com/))
- [MongoDB](https://www.mongodb.com/) connection string for storing and managing your team info\*

\*_Dont forget to whitelist your server ip in MongoDB Atlas connection settings_

_The bot is expected to be available for wide usage on Top.gg website right after the review._

### Usage 👥

When your bot is up and running and is added to your Discord server, you can use the following commands:

- `!yf add [FaceIt nickname]` - to add a player to a watch list
- `!yf remove [FaceIt nickname]` - to remove a player from the list
- `!yf list` - show the watch list of added players
- `!yf show` - detect latest common game of 2 and more players in the list and show info about the match
- `!yf help` - show help and commands info
- `!yf ru | en` - change bot's language to Russian | English, by default bot is in English

### Testing and development 👨‍💻

To run it in development mod you will need **Node.js** and **npm**.

Clone the repository and run the following commands:

```
npm install
node .
```

Please check out the `env.example` file and add your tokens to new `.env` file in root folder.
