export class PlayerMatchStats {
  constructor(matchPlayer, matchInfo) {
    this.player = matchPlayer;
    this.matchInfo = matchInfo;
  }

  getKDA() {
    return `${this.player.kills}/${this.player.deaths}/${this.player.assists}`;
  }

  getKDARatio() {
    return (this.player.kills + this.player.assists) / this.player.deaths;
  }

  getCS() {
    return `${this.player.totalMinionsKilled} (${((this.player.totalMinionsKilled * 60) / this.matchInfo.gameDuration).toFixed(1)}/min)`;
  }

  getVisionScore() {
    return this.player.visionScore;
  }

  getMagicDamageDealt() {
    return this.player.magicDamageDealtToChampions;
  }

  getDamageToChampions() {
    return this.player.totalDamageDealtToChampions;
  }

  getGoldEarned() {
    return this.player.goldEarned;
  }

  getGoldPerMinute() {
    return Math.floor(this.player.challenges.goldPerMinute);
  }

  getGoldSpent() {
    return this.player.goldSpent;
  }

  getSoloKills() {
    return this.player.challenges.soloKills;
  }

  getKillingSpree() {
    return this.player.largestKillingSpree;
  }

  getPhysicalDamageDealt() {
    return this.player.physicalDamageDealtToChampions;
  }

  getTurretKills() {
    return this.player.turretKills;
  }

  getdragonKills() {
    return this.player.dragonKills;
  }
  getBaronKills() {
    return this.player.baronKills;
  }

  getWardsPlaced() {
    return this.player.wardsPlaced;
  }

  getwardsKilled() {
    return this.player.wardsKilled;
  }

  getVisionWardsBoughtInGame() {
    return this.player.visionWardsBoughtInGame;
  }

  getRenderedStats() {
    return [
      {
        label: "KDA",
        value: this.getKDA(),
      },
      {
        label: "CS",
        value: this.getCS(),
      },
      {
        label: "Vision Score",
        value: this.getVisionScore(),
      },
      {
        label: "Physical Damage To Champions",
        value: this.getPhysicalDamageDealt(),
      },
      {
        label: "Magic Damage To Champions",
        value: this.getMagicDamageDealt(),
      },
      {
        label: "Total Damage To Champions",
        value: this.getDamageToChampions(),
      },
      {
        label: "Gold Earned",
        value: this.getGoldEarned(),
      },
      {
        label: "Gold/Min",
        value: this.getGoldPerMinute(),
      },
      {
        label: "Control Wards Bought",
        value: this.getVisionWardsBoughtInGame(),
      },
    ];
  }
}

export class MatchStats {
  constructor(matchInfo) {
    this.matchInfo = matchInfo;
  }

  getKDA(player) {
    return `${player.kills}/${player.deaths}/${player.assists}`;
  }

  getKDARatio(player) {
    return (player.kills + player.assists) / player.deaths;
  }

  getCS(player) {
    return `${player.totalMinionsKilled} (${((player.totalMinionsKilled * 60) / this.matchInfo.gameDuration).toFixed(1)}/min)`;
  }

  getVisionScore(player) {
    return player.visionScore;
  }

  getMagicDamageDealt(player) {
    return player.magicDamageDealtToChampions;
  }

  getDamageToChampions(player) {
    return player.totalDamageDealtToChampions;
  }

  getGoldEarned(player) {
    return player.goldEarned;
  }

  getGoldPerMinute(player) {
    return Math.floor(player.challenges.goldPerMinute);
  }

  getGoldSpent(player) {
    return player.goldSpent;
  }

  getSoloKills(player) {
    return player.challenges.soloKills;
  }

  getKillingSpree(player) {
    return player.largestKillingSpree;
  }

  getPhysicalDamageDealt(player) {
    return player.physicalDamageDealtToChampions;
  }

  getTurretKills(player) {
    return player.turretKills;
  }

  getdragonKills(player) {
    return player.dragonKills;
  }
  getBaronKills(player) {
    return player.baronKills;
  }

  getWardsPlaced(player) {
    return player.wardsPlaced;
  }

  getwardsKilled(player) {
    return player.wardsKilled;
  }

  getVisionWardsBoughtInGame(player) {
    return player.visionWardsBoughtInGame;
  }

  getAllStats() {
    return {
      kda: {
        label: "KDA",
        getValue: (player) => this.getKDA(player),
      },
      cs: {
        label: "CS",
        getValue: (player) => this.getCS(player),
      },
      visionScore: {
        label: "Vision Score",
        getValue: (player) => this.getVisionScore(player),
      },
      magicDamageDealt: {
        label: "Magic Damage To Champions",
        getValue: (player) => this.getMagicDamageDealt(player),
      },
      physicalDamageDealt: {
        label: "Physical Damage To Champions",
        getValue: (player) => this.getPhysicalDamageDealt(player),
      },
      damageToChampions: {
        label: "Total Damage To Champions",
        getValue: (player) => this.getDamageToChampions(player),
      },
      goldEarned: {
        label: "Gold Earned",
        getValue: (player) => this.getGoldEarned(player),
      },
      goldPerMinute: {
        label: "Gold/Min",
        getValue: (player) => this.getGoldPerMinute(player),
      },
      goldSpent: {
        label: "Gold Spent",
        getValue: (player) => this.getGoldSpent(player),
      },
      soloKills: {
        label: "Solo Kills",
        getValue: (player) => this.getSoloKills(player),
      },
      killingSpree: {
        label: "Largest Killing Spree",
        getValue: (player) => this.getKillingSpree(player),
      },
      turretKills: {
        label: "Turret Kills",
        getValue: (player) => this.getTurretKills(player),
      },
      dragonKills: {
        label: "Dragon Kills",
        getValue: (player) => this.getdragonKills(player),
      },
      baronKills: {
        label: "Baron Kills",
        getValue: (player) => this.getBaronKills(player),
      },
      wardsKilled: {
        label: "Wards Killed",
        getValue: (player) => this.getwardsKilled(player),
      },
      visionWardsBought: {
        label: "Control Wards Bought",
        getValue: (player) => this.getVisionWardsBoughtInGame(player),
      },
    };
  }
}
