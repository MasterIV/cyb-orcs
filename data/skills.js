var skills = {
	miner: { formel: function(n) { return n+3; }},
	hp: { formel: function(n) { return (n+3)*10; }},
	attack: { formel: function(n) { return n+3; }},
	ranged: { formel: function(n) { return n+3; }},
	repair: { formel: function(n) { return n*2; }}
};

var epRate = 1;

function getEp(level) {
	return (level*level-level)*15;
}

function getLevel(xp) {
	return (Math.sqrt(xp/15+0.25)+0.5)|0;
}
