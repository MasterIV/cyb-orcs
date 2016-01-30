define(['basic/entity', 'config/config', 'core/graphic'], function (Entity, config, graphic) {
    graphic.add('img/hero_gold_spritesheet.png');
    graphic.add('img/hero_silver_spritesheet.png');
    graphic.add('img/orc_red_spritesheet.png');
    graphic.add('img/orc_spritesheet.png');
    var size = config.size;


    function Creature(pos){
        Entity.call(this, pos);
        this.skill = null;
        this.hp = null;
        this.attack = null;
        this.randomPos = {};
        this.randomPosition();
    }

    Creature.prototype = new Entity();

    Creature.prototype.randomPosition = function () {
        this.tiles = [];
        var probability = .1;
        for(var x = 0; x < size.map.x; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < size.map.y; y++) {
                this.tiles[x][y] = Math.random() < probability ? 1 : null;
                if (this.tiles[x][y]) {
                    this.randomPos.x = x;
                    this.randomPos.y = y;
                }
            }
        }
    };

    Creature.prototype.draw = function (ctx) {
        ctx.drawImage(
            graphic['img/orc_spritesheet.png'],
            0, 0, 100, 100,
            this.randomPos.x * size.tile.x, this.randomPos.y * size.tile.y, size.tile.x, size.tile.y
        );
    };

    Creature.prototype.walk = function () {
        
    };

    Creature.prototype.attack = function () {

    };

    return Creature;
});