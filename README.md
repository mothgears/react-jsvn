# REACT-JSVN

React render for JSVN (ES6) template engine.

####UIBase.js
```
import $$ from 'jsvn';

//View
const UIBase = new $$.View({
	height       : '30px', //Style, will be added to css
	border       : '1px solid #666',
	borderRadius : '5px',
	boxSizing    : 'border-box',

	':focus': { //Local style
		outline: 'none',
	}
});

export default UIBase;
```

####Button.js
```
import $$ from 'jsvn';
import UIBase from './UIBase.js';

//View that extends UIBase and <button> tag
const Button = new $$.View(['<>button', UIBase], {
	width : '60px',

	__onclick : it=>it.action, //Event

	[$$.text] : it=>it.label, //Text node, 'it' in 'it.label' is model

	':hover': {
		background : '#9cf',
		color      : '#fff',
		cursor     : 'pointer',
	}
});

export default Button;
```

####Input.js
```
import $$ from 'jsvn';
import UIBase from './UIBase.js';

const Input = new $$.View(['/input', UIBase], { //Prefix '/' indicates a self-closing tag
	width   : '90px',
	padding : '0 15px',
});

export default Input;
```

####ListComponent.js
```
import render from 'react-jsvn';
import $$, { importCSS } from 'jsvn';
import { useMemo } from 'react';
import Button from './Button.js';

//React Function Component with view
const List = props => {
	const view = useMemo(()=>new $$.View({ //Memorizes view declaration with useMemo hook
		display : 'table',
		width   : '100%',

		//Child node based on tag '<div>' (default base)
		[$$`item`]: {
			__EACH: it=>it.items, //Will repeat this node for each item in 'it.items' array
			$key: item=>item,

			display : 'table-row',
			height  : '30px',
			width   : '100%',

			'.cell': {
				display: 'table-cell',
				paddingBottom: '5px',
				paddingTop: '5px',
				borderBottom: '1px solid #999',
			},

			//Child node based on local style '.cell'
			[$$`item-name `('cell')]: {
				[$$.text]: item=>item,
			},

			[$$`item-opts `('cell')]: {
				width: '30px',

				//Child node that extends Button view
				[$$(Button)]: {
					width: '30px',

					_label  : 'X', //Model overloading
					_action : (item, it) => ()=>it.removeItem(item),
				},
			},
		}
	}), []);
    useMemo(()=>importCSS(view), [view]);

	return render(view, props);
};

export default List;
```

####main.js
```
import render from 'react-jsvn';
import $$, { importCSS } from 'jsvn';
import React, { useMemo, useState } from 'react';
import Input from './Input.js';
import Button from './Button.js';
import List from './ListComponent.js';

const RootComponent = () => {
	const [items, setItems]     = useState(['alpha', 'gamma']);
	const [newName, setNewName] = useState('');

	//Memorizes controller
	const ctrl = useMemo(()=>({
		addToList() {
			if (!newName) alert(`Empty value!`);
			else if (!items.some(item=>item === newName)) {
				setItems([...items, newName]);
				setNewName('');
			}
			else alert(`Item ${newName} already exist!`);
		},
		removeItem(item) {
			setItems(items.filter(i => i !== item));
		}
	}), [newName, items]);

	const view = useMemo(()=>new $$.View({
		width: '100%',

		[$$`form`]:{
			position   : 'absolute',
			left       : '50%',
			marginLeft : '-320px',
			width      : '640px',
			background : '#eee',
			marginTop  : '20px',

			[$$`active-block`]: {
				display   : 'table',
				width     : '100%',
				marginTop : '20px',

				'.cell': {
					display: 'table-cell',
				},

				[$$`item-name-cnt `('cell')]: {
					paddingLeft: '20px',

					[$$`item-name `(Input)]: {
						width: '520px',

						__bind: [it=>it.newName, it=>it.setNewName], //Bind variable to this input
					},
				},

				[$$('cell')]: {
					width: '20px',
				},

				[$$('cell')]: {
					paddingRight: '20px',

					//Include Button as view
					[$$(Button)]: it=>({ //Set model for this view
						action : it.addToList,
						label  : 'Add',
					}),
				},
			},

			[$$()]: {
				width     : '100%',
				padding   : '20px',
				boxSizing : 'border-box',

				//Include React Component
				[$$(List)]: it=>it,
			},
		},

		background: '#eee',
	}), []);
    useMemo(()=>importCSS(view), [view]);

	return render(view, {...ctrl, items, setItems, newName, setNewName});
};

ReactDOM.render(
	React.createElement(RootComponent, {}),
	document.getElementById("root")
);
```