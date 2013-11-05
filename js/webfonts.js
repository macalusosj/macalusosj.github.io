var WebFontConfig;

WebFontConfig = {
  custom: {
    families: ['Whitney SSm A', 'Whitney SSm B', 'Mercury Text G1 A', 'Mercury Text G1 B'],
    urls: ['//cloud.typography.com/7362032/783882/css/fonts.css'],
	timeout: 4000 // Set the timeout to two seconds
  }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
		// '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();