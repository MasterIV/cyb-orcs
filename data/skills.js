var skills = {
	miner: { formel: function(n) { return n+3; }},
	hp: { formel: function(n) { return (n+3)*10; }},
	attack: { formel: function(n) { return n+3; }},
	ranged: { formel: function(n) { return n+3; }},
	repair: { formel: function(n) { return n*2; }}
};

var epRate = 1;

function getEp(level) {
	return (level*level-level)*30;
}

function getLevel(xp) {
	return (Math.sqrt(xp/30+0.25)+0.5)|0;
}
