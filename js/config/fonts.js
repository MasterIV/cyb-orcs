define(['definition/font'], function(FontStyle) {
	return {
		default:     new FontStyle(16, '#fff', 'monospace', '#555', '', 'left', 'top'),
		bold:        new FontStyle(16, '#fff', 'monospace', '#555', 'bold ', 'left', 'top'),
		large:       new FontStyle(20, '#fff', 'monospace', '#555', 'bold ', 'left', 'top'),
		hud:         new FontStyle(20, '#fff', 'monospace', '#555', 'bold ', 'left', 'top'),
		center:      new FontStyle(20, '#fff', 'monospace', '#555', 'bold ', 'center', 'middle'),
		halfcenter:  new FontStyle(20, '#fff', 'monospace', '#555', 'bold ', 'left', 'middle'),
		frames:  new FontStyle(12, '#000', 'monospace' )
	};
});
