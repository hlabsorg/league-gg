export class MatchStats {
  constructor(matchInfo) {
    this.matchInfo = matchInfo;
  }

  getKDA(player) {
    return `${player.kills}/${player.deaths}/${player.assists}`;
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

  getGoldSpent(player) {
    return player.goldSpent;
  }

  getSoloKills(player) {
    return player.soloKills;
  }

  getAllStats() {
    return {
      kda: {
        label: "KDA",
        getValue: (player) => this.getKDA(player)
      },
      cs: {
        label: "CS",
        getValue: (player) => this.getCS(player)
      },
      visionScore: {
        label: "Vision Score",
        getValue: (player) => this.getVisionScore(player)
      },
      damageDealt: {
        label: "Damage Dealt",
        getValue: (player) => this.getDamageDealt(player)
      },
      goldEarned: {
        label: "Gold Earned",
        getValue: (player) => this.getGoldEarned(player)
      }
    };
  }
} 