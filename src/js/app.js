class Game {
  constructor(fieldSize) {
    this.fieldSize = fieldSize ** 2;
    this.previousIndex = 0;
    this.currentIndex = 0;
    this.target = 0;
    this.past = 0;
  }

  clearStatistics(message) {
    this.target = 0;
    this.past = 0;
    alert(message);
  }

  drawField() {
    const field = document.querySelector(".field");
    for (let i = 0; i < this.fieldSize; i += 1) {
      const hole = document.createElement("div");
      hole.className = "hole";
      hole.id = `hole${i}`;
      hole.addEventListener("click", () => {
        if (hole.classList.contains("hole_has-goblin")) {
          this.target += 1;
          hole.classList.remove("hole_has-goblin");
          if (this.target == 10) {
            this.clearStatistics("Победа!");
          }
        } else {
          this.past += 1;
          if (this.past === 5) {
            this.clearStatistics("Вы проиграли!");
          }
        }
        document.getElementById("caught").textContent = this.target;
        document.getElementById("lost").textContent = this.past;
      });
      field.appendChild(hole);
    }

    this.drawGoblin();
  }

  drawGoblin() {
    setInterval(() => {
      do {
        this.currentIndex = Math.floor(Math.random() * this.fieldSize);
      } while (this.currentIndex === this.previousIndex);

      if (this.previousIndex >= 0) {
        const previousHole = document.getElementById(
          `hole${this.previousIndex}`,
        );
        previousHole.classList.remove("hole_has-goblin");
      }

      const currentHole = document.getElementById(`hole${this.currentIndex}`);
      currentHole.classList.add("hole_has-goblin");
      this.previousIndex = this.currentIndex;
    }, 1000);
  }
}

const newGame = new Game(4);
newGame.drawField();
