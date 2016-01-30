define(['core/graphic', 'geo/v2', 'basic/entity'],
		function(graphics, V2, Entity) {
			function ImageEntity(pos, src, scale) {
				this.img = graphics[src];
				Entity.call(this, pos, new V2(this.img.width, this.img.height));
				this.scale = scale || 1;
				this.alpha = 1;
			}

			ImageEntity.prototype = new Entity();

			ImageEntity.prototype.onDraw = function(ctx) {
				ctx.globalAlpha = this.alpha;
				ctx.drawImage(this.img, 0, 0, this.size.x|0, this.size.y|0, 0, 0, (this.size.x*this.scale)|0, (this.size.y*this.scale)|0);
				ctx.globalAlpha = 1;
			};

			return ImageEntity;
		}
);
