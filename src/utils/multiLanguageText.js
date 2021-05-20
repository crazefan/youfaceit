export const multiLanguageEmbedText = () => ({
  en: {
    isVictory: {
      win: ":trophy: Finally a **WIN**! Good job, team.",
      lose: ":cry: You **LOST** again. No wonder.",
    },
    bestPerformer: {
      begin: ":first_place: Best player",
      end: "Way to go!",
    },
    worstPerformer: {
      begin: ":clown: Hey, noob ",
      end: "How about you start making some frags?",
    },
    mapInfo: {
      map: "Map: ",
      score: "Score: ",
    },
    names: {
      gameSummary: "Game Summary",
      mapInfo: "Map info",
      scoreBoard: "Scoreboard",
    },
  },
  ru: {
    isVictory: {
      win: ":trophy: Это **ПОБЕДА**! Отличная работа, команда.",
      lose: ":cry: Это **ПОРАЖЕНИЕ**. Не удивительно, нубы.",
    },
    bestPerformer: {
      begin: ":first_place: Лучший игрок -",
      end: "Так держать!",
    },
    worstPerformer: {
      begin: ":clown: Худший игрок",
      end: "Чё по килам?",
    },
    mapInfo: {
      map: "Карта: ",
      score: "Счет: ",
    },
    names: {
      gameSummary: "Инфа по последней игре",
      mapInfo: "Карта",
      scoreboard: "Таблица",
    },
  },
});

export const multiLanguageCommandsText = () => ({
  en: {
    add: {
      success: "User was added successfully.",
      errorExists: "User is already added to the players list.",
      errorNotFound: "User was not found, try again.",
      errorMultipleUsers: "You cannot add multiple users or your input is empty.",
    },
    remove: {
      success: "User was removed successfully.",
      errorMultiple: "You cannot delete multiple users or your user input is empty.",
    },
    list: "List of added users:",
    help: `\`!add [FaceIt nickname]\` - add a nickname to server's watchlist 
    \n\`!yf remove [FaceIt nickname]\` - remove player from the watchlist
    \n\`!yf list\` - show the watchlist 
    \n\`!yf show\` - show the latest common game info and performance summary
    \n\`!yf lang ru | en \` - change bot's language to Russian or English
    \n At least two valid FaceIt CS:GO players' nicknames should be added for bot to work correctly.`,
  },
  ru: {
    add: {
      success: "Пользователь успешно добавлен.",
      errorExists: "Пользователь уже есть в списке.",
      errorNotFound: "Пользователь не был найден. Попробуйте снова.",
      errorMultipleUsers:
        "Вы не можете добавить несколько пользователей или вы не ввели никнейм пользователя. Попробуйте снова.",
    },
    remove: {
      success: "Пользователь был успешно удален",
      errorMultiple:
        "Вы не можете удалить несколько пользователей или вы не ввели никнейм пользователя. Попробуйте снова.",
    },
    list: "Список добавленных пользователей:",
    help: `\`!add [FaceIt nickname]\` - добавить пользователя в отслеживаемый список 
    \n\`!yf remove [FaceIt nickname]\` - удалить пользователя из списка
    \n\`!yf list\` - показать список добавленных пользователей
    \n\`!yf show\` - показать информацию о последнем матче и выступление игроков
    \n\`!yf lang ru | en \` - изменить язык бота на русский | английский
    \n Для поиска и выдачи совместных игр нужно, чтобы было добавленно минимум два игра в список отслеживаемых. Бот принимает только корректно написаные никнеймы пользователей FaceIt.`,
  },
});
