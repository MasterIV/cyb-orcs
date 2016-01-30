define(['basic/entity', 'geo/v2', 'core/graphic', 'config/config'], function(Entity, V2, graphic, config) {
	graphic.add('img/orc_spritesheet.png');
	graphic.add('img/orc_red_spritesheet.png');
	graphic.add('img/hero_gold_spritesheet.png');
	graphic.add('img/hero_silver_spritesheet.png');

	function Creature(spawn, map, type) {

	}

	Creature.prototype = new Entity();

	return Creature;
});
