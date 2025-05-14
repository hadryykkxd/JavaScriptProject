import Phaser from 'phaser';

// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicia o jogo
const game = new Phaser.Game(config);

// Variáveis globais
let quadrado;

// Carrega assets (imagens, sons, etc.)
function preload() {
    // Por enquanto, não usamos assets
}

// Cria objetos na tela
function create() {
    // Cria um quadrado vermelho
    quadrado = this.add.rectangle(400, 300, 50, 50, 0xff0000);
    // Habilita física para o quadrado
    this.physics.add.existing(quadrado);
    quadrado.body.setCollideWorldBounds(true); // Não sai da tela
}

// Atualiza o jogo a cada frame
function update() {
    // Captura teclas
    const cursors = this.input.keyboard.createCursorKeys();
    const velocidade = 200;

    // Movimento
    quadrado.body.setVelocity(0); // Reseta velocidade
    if (cursors.left.isDown) {
        quadrado.body.setVelocityX(-velocidade); // Moves left
    } else if (cursors.right.isDown) {
        quadrado.body.setVelocityX(velocidade); // Moves right
    }
    if (cursors.up.isDown) {
        quadrado.body.setVelocityY(-velocidade); // Moves up
    } else if (cursors.down.isDown) {
        quadrado.body.setVelocityY(velocidade); // Moves down
    }
}