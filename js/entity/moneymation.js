define(['basic/entity', 'core/graphic'], function(Entity, graphic) {
	graphic.add('img/gold_icon.png');

	function Moneymation(cost, shape, moreMoney) {
		Entity.call(this);
		this.image = graphic['img/gold_icon.png'];
		this.animationWay = 0;
		this.moreMoney = moreMoney;
		this.cost = cost;
		this.shape = shape;
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
		var xPosition = this.shape.iconPos().x;
		var yPosition = this.shape.iconPos().y + (this.animationWay * 2) * -1;

		if (this.cost > 0 && this.moreMoney){
			console.log(this.shape.iconPos());
			ctx.font = "14px arial";
			ctx.fillStyle = "white";
			ctx.fillText("+"+this.cost, xPosition + 70, yPosition + 15 );
			ctx.drawImage(this.image, xPosition + 45, yPosition, 20, 20);

		} else if (this.cost < 0 || !this.moreMoney) {
			ctx.font = "14px arial";
			ctx.fillStyle = "red";
			ctx.fillText("-"+this.cost, xPosition + 70, yPosition + 15 );
			ctx.drawImage(this.image, xPosition + 45, yPosition, 20, 20);
		}
	};

	return Moneymation;
});