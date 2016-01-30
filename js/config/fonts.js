define(['definition/font'], function(FontStyle) {
	return {
		default: new FontStyle(16, '#000', 'monospace', '#555', '', 'left', 'top'),
		bold:    new FontStyle(16, '#000', 'monospace', '#555', 'bold ', 'left', 'top'),
		large:   new FontStyle(20, '#000', 'monospace', '#555', 'bold ', 'left', 'top'),
		hud:     new FontStyle(20, '#fff', 'monospace', '#555', 'bold ', 'left', 'top'),
		frames:  new FontStyle(12, '#000', 'monospace' )
	};
});