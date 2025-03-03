const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  const game = new Phaser.Game(config);
  
  let differences = [];
  let foundDifferences = 0;
  
  function preload() {
    this.load.json('levels', 'data/levels.json');
    this.load.image('level1_left', 'assets/images/level1_left.png');
    this.load.image('level1_right', 'assets/images/level1_right.png');
  }
  
  function create() {
    const levels = this.cache.json.get('levels');
    const currentLevel = levels[0];
  
    // 画像を配置
    this.add.image(200, 300, 'level1_left');
    this.add.image(600, 300, 'level1_right');
  
    // 差分データを取得
    differences = currentLevel.differences;
  
    // クリックイベント
    this.input.on('pointerdown', (pointer) => {
      const clickedX = pointer.x;
      const clickedY = pointer.y;
  
      for (let i = 0; i < differences.length; i++) {
        const diff = differences[i];
        const distance = Phaser.Math.Distance.Between(clickedX, clickedY, diff.x, diff.y);
  
        if (distance <= diff.radius) {
          foundDifferences++;
          differences.splice(i, 1); // 発見した差分を削除
          alert('正解！');
          return;
        }
      }
      alert('不正解...');
    });
  }
  
  function update() {
    // ゲームの状態を更新
    if (foundDifferences === differences.length) {
      alert('クリア！');
    }
  }
  