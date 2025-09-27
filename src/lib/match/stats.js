export class PlayerMatchStats {
  constructor(specifiedPlayer, matchInfo) {
    this.player = specifiedPlayer;
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

  getCSNumber() {
    return this.player.totalMinionsKilled;
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

  getDragonKills() {
    return this.player.dragonKills;
  }

  getBaronKills() {
    return this.player.baronKills;
  }

  getWardsPlaced() {
    return this.player.wardsPlaced;
  }

  getWardsKilled() {
    return this.player.wardsKilled;
  }

  getVisionWardsBoughtInGame() {
    return this.player.visionWardsBoughtInGame;
  }

  getAllStats() {
    return {
      kda: this.getKDA(),
      cs: this.getCSNumber(),
      visionScore: this.getVisionScore(),
      magicDamageDealt: this.getMagicDamageDealt(),
      physicalDamageDealt: this.getPhysicalDamageDealt(),
      damageToChampions: this.getDamageToChampions(),
      goldEarned: this.getGoldEarned(),
      goldPerMinute: this.getGoldPerMinute(),
      goldSpent: this.getGoldSpent(),
      soloKills: this.getSoloKills(),
      killingSpree: this.getKillingSpree(),
      turretKills: this.getTurretKills(),
      dragonKills: this.getDragonKills(),
      baronKills: this.getBaronKills(),
      wardsKilled: this.getWardsKilled(),
      visionWardsBought: this.getVisionWardsBoughtInGame(),
    };
  }
}
