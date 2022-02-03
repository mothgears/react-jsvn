# REACT-JSVN

React render for JSVN - ES2020 JSX alternative with class inheritance

#### JSVN
https://www.npmjs.com/package/jsvn

#### Example
```
import $$, { View }        from 'jsvn';
import render              from 'react-jsvn';
import React, { useState } from 'react';
import ReactDOM            from 'react-dom';

//Simple View
const MyView = new View({
	background : '#eee',
	width      : '200px',
	textAlign  : 'center',
	color      : m=>m.myColor,

	[$$`my-title`]: {
		$: 'JSVN Example',
	},

	[$$`my-input `('/input')]: {
		_bind: [m=>m.myText, m=>m.setMyText],
	},

	[$$()]: {
		_IF: m=>m.myText,
		
		fontFamily: 'Tahoma, sans-serif',

		[$$()]: 'Hello ',

		[$$('<>span')]: {
			fontWeight : 'bold',

			$: m=>`${m.myText}!`,
		},
	},
});

//Simple React Component
const MyComponent = props => {
	const [ myText, setMyText ] = useState('world');

	return render(MyView, { ...props, myText, setMyText });
};

//Render to root
ReactDOM.render(
	React.createElement(MyComponent, {
		myColor : '#090',
	}),
	document.getElementById('root'),
);
```

#### Installation
npm
```
npm i react-jsvn
```

yarn
```
yarn add react-jsvn
```