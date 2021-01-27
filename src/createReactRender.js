export default react =>
	(tag, classes, params, style, events, children, pureHTML = null) => {
		if (!children) children = [];
		else children = children.map(child=>child && child.JSVNContainer ? react.createElement(child.component, child.props) : child);
		if (pureHTML) params.dangerouslySetInnerHTML = {__html: pureHTML};
		events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});
		return react.createElement(tag, { className: classes.join(' '), style, ...events, ...params }, ...children);
	};