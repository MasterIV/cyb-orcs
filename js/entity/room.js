define(['basic/entity', 'geo/v2'], function(Entity, V2) {
	function Room(pos, shape, definition) {
		Entity.call(this, pos);
		this.shape = shape;
		this.definition = definition;
	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function(ctx) {

	};

	return Room;
});
