define(['basic/entity', 'core/graphic'], function(Entity, graphic) {
	graphic.add('img/gold_icon.png');

	function Moneymation(cost) {
		Entity.call(this);
		this.image = graphic['img/gold_icon.png'];
		this.animationWay = 0;
		this.cost = cost;
	}

	Moneymation.prototype = new Entity();

	Moneymation.prototype.onUpdate = function () {
		if(this.animationWay <= 50) {
			this.animationWay += 1.5;
		} else {
			this.parent.remove(this);

		}
	};

	Moneymation.prototype.onDraw = function (ctx) {
		ctx.font = "14px arial";
		ctx.fillStyle = "red";
		ctx.fillText("-"+this.cost, 20, (this.animationWay * 2) * -1);
		ctx.drawImage(this.image, 0, (this.animationWay * 2) * -1, 20, 20);
	};

	return Moneymation;
});