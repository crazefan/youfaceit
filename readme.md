## YouFaceIt

YouFaceIt is a discord bot made with [Discord.js](https://discord.js.org/).
It allows players on a server to show their latest **FaceIt CS:GO** game info and result, detect who played best and worst, show personal stats etc.

_The idea was born on our Discord server, our team needed a way to indicate who played worst and needed to improve their game and who played best to cheer them up!_

#### Prerequisites

To use it on your discord server you need to have:

- a valid faceit api key
- create an app in Discord development server
- Discord bot token
- a way to deploy your server (I personally use AWS Lambda)

The bot is in continuous development and is planned to be a public bot with easy access through adding to the server.

#### Deploy

#### Usage

commands:
`!add`
`!remove`
`!list`
`!show`
`!stats`

#### Testing and development

To run it in testing mod you will need **Node.js** and **npm**.

Clone the repository and run the following commands in :

```
npm install
node .
```

Please check out the `env.example` file and add your tokens to new `.env` file.
