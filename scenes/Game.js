// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
  
    super("main");
  }

  init() {
   
  }

  preload() {
  //cargar assets

  //import Cielo
  this.load.image("cielo", "../public/assets/Cielo.webp");
  this.load.image("plataforma", "../public/assets/platform.png");
  this.load.image("personaje", "../public/assets/Ninja.png");
  this.load.image("diamond", "../public/assets/diamond.webp");
  this.load.image("triangle", "../public/assets/triangle.png");
  this.load.image("square", "../public/assets/square.png");
  this.load.image("bomb", "../public/assets/bomb.png");


  }

  create() {
    //crear elemento
    this.cielo= this.add.image(400,300,"cielo").setScale(2);
     

    //crear plataforma
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400,568, "plataforma").setScale(2).refreshBody();
    this.plataformas.create(21, 350, "plataforma").refreshBody();
    
    
    // crear personaje
    this.personaje = this.physics.add.sprite(400, 300, "personaje").setScale(0.1);
    this.personaje.setCollideWorldBounds(true);
    
   
    
    // agregar colsion entre personaje y plataformas
    this.physics.add.collider(this.personaje, this.plataformas);

    // crear teclas
    this.cursor = this.input.keyboard.createCursorKeys();

    //una tecla a la vez
    //ths.a = this.input,keyboard.addKey(Phaser.)

    // grupo de recolectables y jugador
    this.recolectable = this.physics.add.group();
    this.physics.add.collider(this.personaje, this.recolectable);
    this.physics.add.collider(this.plataformas, this.recolectable);
   
    
    //evento 1 segundo
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope:this,
      loop: true
    });
  }
  
  onSecond() {
      // crear recolector 
      const tipos = ["diamond", "triangle","square","bomb"];
      const tipo = Phaser.Math.RND.pick(tipos);

      let recolectable = this.recolectable.create(
        Phaser.Math.Between(10, 790),
        0,
        tipo
      ).setScale(0.03)
      
       //rebote de item
       const rebote = Phaser.Math.FloatBetween(0.4, 0.8);
       recolectable.setBounce(rebote);
    }
  

  update() {
    // movimiento de personaje 
    if (this.cursor.left.isDown){
      this.personaje.setVelocityX(-200);
    }else if(this.cursor.right.isDown){
      this.personaje.setVelocityX(200);
    }else{
      this.personaje.setVelocityX(0);
    }
    if(this.cursor.up.isDown && this.personaje.body.touching.down){
      this.personaje.setVelocityY(-330)
    }
  }
}
