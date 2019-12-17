const MAX_GOALS = 10;

export const validateGame = (game) => !goalsValidator(game) && !playerGoalsValidator(game) && selectedAll(game);

const goalsValidator = (game) => {
    const {team1, team2} = game;

    return team1.goals === team2.goals || !(team1.goals === MAX_GOALS || team2.goals === MAX_GOALS);
};

const playerGoalsValidator = (game) => {
    const {team1, team2} = game;

    return (+team1.player1.goals + +team1.player2.goals > +team1.goals) || (+team2.player1.goals + +team2.player2.goals > +team2.goals);
};

const selectedAll = (game) => game.team1.id && game.team1.player1.id && game.team1.player2.id && game.team2.id && game.team2.player1.id && game.team2.player2.id;
