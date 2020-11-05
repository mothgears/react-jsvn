import React from 'react';
import jsvn_$$ from 'jsvn';

export const decorate = ($$, react) => {
	if ($$.View.decorator) throw new Error('react-jsvn/decorate : JSVN is already decorated.');

	if (!react) {
		if (typeof React === 'object' && React) {
			react = React;
		} else {
			throw new Error('react-jsvn/decorate : React library not found.');
		}
	}

	$$.View = class extends $$.View {
		static get decorator () { return 'react'; }

		static render (tag, classes, params, style, events, children) {
			if (!children) children = [];
			events = Object.entries(events).reduce((arr, [k, v])=>{ arr['on' + k[0].toUpperCase() + k.slice(1)] = v; return arr;}, {});
			return react.createElement(tag, { className: classes.join(' '), style, ...events, ...params }, ...children);
		}

		static styles (css, className) {
			if (document.head && !document.querySelector(`style[data-view="${className}"]`)) {
				document.head.insertAdjacentHTML('beforeend', `<style data-view="${className}">${css}</style>`);
			}
		}
	};
	return $$;
};

export default decorate(jsvn_$$, React);