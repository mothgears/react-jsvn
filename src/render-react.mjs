import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import createReactRender from './createReactRender.mjs';

export const reactRender = createReactRender(React, ReactDOM, ReactDOMServer);

export default (view, ...envs) => {
	return view.render(reactRender, ...envs);
}