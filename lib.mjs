import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import ReactDOMServer from 'react-dom/server';

import htmlParser from 'html-react-parser';

export const reactRender = {
	lib: React,

	render (tag, classes, props, style, events, children, pureHTML = null) {
		const activators = [];

		if (!children) children = [];
		else children = children.map(child=>{
			//Third party component
			if (child?.JSVNContainer) {
				if (!child.renderEngine || child.renderEngine.lib === React) {
					//React component
					if (child.children) return React.createElement(child.component, child.props, ...child.children); //>= 0.11.13
					else                return React.createElement(child.component, child.props); //<= 0.11.12
				} else {
					//Custom component
					const { html, activate } = child.renderEngine.convert(child.component, child.props, child.children);
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
		const reactElement = React.createElement(tag, options, ...children);

		for (const activate of activators) {
			const domParent = ReactDOM.findDOMNode(reactElement);
			activate(domParent);
		}

		return reactElement;
	},

	convert (component, props, children = null) {
		const reactElement = children
			? React.createElement(component, props, ...children)
			: React.createElement(component, props);

		return {
			html     : ReactDOMServer.renderToString(reactElement),
			activate : domParent => hydrateRoot(domParent, reactElement),
		}
	}
}

export default (view, ...envs) => {
	return view.render(reactRender, ...envs);
}