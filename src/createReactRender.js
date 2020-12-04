export default react =>
	(tag, classes, params, style, events, children, pureHTML = null) => {
		if (!children) children = [];
		if (pureHTML) params.dangerouslySetInnerHTML = {__html: pureHTML};
		events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});
		return react.createElement(tag, { className: classes.join(' '), style, ...events, ...params }, ...children);
	};