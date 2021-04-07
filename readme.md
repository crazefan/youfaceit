## YouFaceIt 🤖🎮

YouFaceIt is a discord bot made with [Discord.js](https://discord.js.org/).
It allows players on a server to show their latest **FaceIt CS:GO** game info and result, detect who played best and worst, show personal stats etc.

_The idea was born on our Discord server, our team needed a way to automate the indication of who played worst and needed to improve their game (and call him a noob of course) and who played best in order to praise them for good job!_

### Prerequisites

To use it on your discord server you need to have:

- a valid [FaceIt API](https://developers.faceit.com/) key
- Discord bot token from an [Discord developer portal](https://discord.com/developers/applications)
- a way to deploy your server (I personally use [AWS EC2](https://aws.amazon.com/ec2/))

_The bot is in continuous development and is planned to be a public bot with easy access through adding to the server._

### Usage

When your bot is up and running and is on your server, you can use these commands:

- `!add [FaceIt nickname]` - to add a player to a watch list
- `!remove [FaceIt nickname]` - to remove a player from the list
- `!list` - show the watch list of added players
- `!game` - detect latest common game of 2 and more players in the list and show info about the match

### Testing and development 👨‍💻

To run it in development mod you will need **Node.js** and **npm**.

Clone the repository and run the following commands:

```
npm install
node .
```

Please check out the `env.example` file and add your tokens to new `.env` file in root folder.
