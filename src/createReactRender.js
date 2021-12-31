import htmlParser from 'html-react-parser';

export default (react, reactDOM, reactDOMServer) => ({
	lib: react,

	render (tag, classes, props, style, events, children, pureHTML = null) {
		const activators = [];

		if (!children) children = [];
		else children = children.map(child=>{
			//Third party component
			if (child && child.JSVNContainer) {
				if (!child.renderEngine || child.renderEngine.lib === react) {
					//React component
					return react.createElement(child.component, child.props);
				} else {
					//Custom component
					const { html, activate } = child.renderEngine.convert(child.component, child.props);
					if (activate) activators.push(activate);
					return htmlParser(html);
				}
			}
			//Reacts Elements
			return child;
		});
		if (pureHTML) props.dangerouslySetInnerHTML = {__html: pureHTML};
		events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});

		const options = { className: classes.join(' '), style, ...events, ...props };
		const reactElement = react.createElement(tag, options, ...children);

		for (const activate of activators) {
			const domParent = ReactDOM.findDOMNode(reactElement);
			activate(domParent);
		}

		return reactElement;
	},

	convert (component, props) {
		const reactElement = react.createElement(component, props);

		return {
			html     : reactDOMServer.renderToString(reactElement),
			activate : domParent => reactDOM.hydrate(reactElement, domParent),
		}
	}
});