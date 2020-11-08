import React from 'react';
import createReactRender from "./createReactRender";

const render = createReactRender(React);

export default (view, ...envs) => {
	return view.return(render, ...envs);
}