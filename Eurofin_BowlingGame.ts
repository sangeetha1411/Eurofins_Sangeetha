class BowlingGame {
  private rolls: number[] = [];

  roll(pins: number): void {
    this.rolls.push(pins);
  }

  score(): number {
    let score = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        score += 10 + this.strikeBonus(rollIndex);
        rollIndex++;
      } else if (this.isSpare(rollIndex)) {
        score += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        score += this.sumOfBallsInFrame(rollIndex);
        rollIndex += 2;
      }
    }

    return score;
  }

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private strikeBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private spareBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 2];
  }

  private sumOfBallsInFrame(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}

const game = new BowlingGame();

// A gutter game (20 times 0 pin) should score 0
for (let i = 0; i < 20; i++) {
  game.roll(0);
}
console.log(game.score()); // output: 0

// An all one game (20 times 1 pin) should score 20
for (let i = 0; i < 20; i++) {
  game.roll(1);
}
console.log(game.score()); // output: 20

// A spare followed by a 3 should score 16
game.roll(5);
game.roll(5); // spare
game.roll(3);
for (let i = 0; i < 17; i++) {
  game.roll(0);
}
console.log(game.score()); // output: 16

// A strike followed by a 3 and a 4 should score 24
game.roll(10); // strike
game.roll(3);
game.roll(4);
for (let i = 0; i < 16; i++) {
  game.roll(0);
}
console.log(game.score()); // output: 24

// The perfect game (12 times 10) should score 300
for (let i = 0; i < 12; i++) {
  game.roll(10);
}
console.log(game.score()); 
