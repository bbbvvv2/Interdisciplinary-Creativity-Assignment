
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: '#eef3ec',
  scene: {
    preload: preload,
    create: create
  }
};

let feedbackText;
let nextButton;
let selected = false;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('kitchen', 'https://cdn.pixabay.com/photo/2016/10/22/18/47/kitchen-1766461_960_720.jpg');
  this.load.image('optionA', 'https://cdn-icons-png.flaticon.com/512/1046/1046870.png');
  this.load.image('optionB', 'https://cdn-icons-png.flaticon.com/512/6195/6195700.png');
}

function create() {
  // Background
  this.add.image(480, 320, 'kitchen').setDisplaySize(960, 640).setAlpha(0.35);

  // Title and Question
  const titleStyle = { font: "32px Open Sans", fill: "#4e7342", fontStyle: "bold" };
  const questionStyle = { font: "22px Open Sans", fill: "#333", wordWrap: { width: 800 } };
  this.add.text(480, 40, "Scene 1: Packing Lunch", titleStyle).setOrigin(0.5);
  this.add.text(480, 90, "How will you pack your lunch today?", questionStyle).setOrigin(0.5);

  // Option A (Plastic wrap)
  const optionA = this.add.image(280, 280, 'optionA').setInteractive().setScale(0.5).setAlpha(0.85);
  this.add.text(280, 370, "Plastic Wrap", { font: "18px Open Sans", fill: "#aa3333" }).setOrigin(0.5);

  // Option B (Reusable container)
  const optionB = this.add.image(680, 280, 'optionB').setInteractive().setScale(0.5).setAlpha(0.85);
  this.add.text(680, 370, "Reusable Container", { font: "18px Open Sans", fill: "#336633" }).setOrigin(0.5);

  // Feedback Text
  feedbackText = this.add.text(480, 460, "", {
    font: "20px Open Sans",
    fill: "#444",
    backgroundColor: "#ffffffcc",
    padding: { x: 20, y: 15 },
    wordWrap: { width: 700 },
    align: "center"
  }).setOrigin(0.5).setAlpha(0);

  // Next Button
  nextButton = this.add.text(480, 550, "Next", {
    font: "22px Open Sans",
    fill: "#fff",
    backgroundColor: "#88b04b",
    padding: { x: 25, y: 12 },
    borderRadius: 10
  }).setOrigin(0.5).setInteractive().setAlpha(0);

  // Hover animation
  [optionA, optionB].forEach(option => {
    option.on('pointerover', () => {
      if (!selected) option.setScale(0.55);
    });
    option.on('pointerout', () => {
      if (!selected) option.setScale(0.5);
    });
  });

  // Interaction Logic
  optionA.on('pointerdown', () => {
    if (selected) return;
    selected = true;
    feedbackText.setText("Oops! About 8 million tons of plastic waste ends up in the ocean every year.
(Source: National Geographic)");
    feedbackText.setFill("#aa3333");
    feedbackText.setAlpha(1);
    nextButton.setAlpha(1);
  });

  optionB.on('pointerdown', () => {
    if (selected) return;
    selected = true;
    feedbackText.setText("Great job! Using reusable containers can cut plastic waste by up to 81%.
(Source: Oceana)");
    feedbackText.setFill("#336633");
    feedbackText.setAlpha(1);
    nextButton.setAlpha(1);
  });

  nextButton.on('pointerdown', () => {
    feedbackText.setText("Get ready for the next challenge!");
    nextButton.setAlpha(0);
  });
}
