export interface StatsDto {
    games: number;
    gameWins: number;
    gameLosses: number;
    victoryRate: number;
    durationMin: number;
    durationMax: number;
    durationAverage: number;
    winRow: number;
    actualWinRow: number;
    under3min: number;
    golden: number;
    // greaterAvantage: number;
    // greaterDisavantage: number;
    // averageScore: number;
    // averageOponnentScore: number;
    eloScore: number;
    rank: number;
}