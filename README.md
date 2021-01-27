# REACT-JSVN

React render for JSVN.

#### JSVN
https://www.npmjs.com/package/jsvn

#### Example
```
import render             from 'react-jsvn';
import $$, { importCSS }  from 'jsvn';
import React, { useMemo } from 'react';
import ReactDOM           from 'react-dom';

const MyComponent = () => {
    const view = useMemo(()=>new $$.View({
        width      : '100%',
        height     : '30px',
        background : '#eee',

        [$$.text]: it=>it.textValue
    }), []);
    useMemo(()=>importCSS(view), [view]);

    return render(view, {textValue: 'Hello World!'});
};

ReactDOM.render(
    React.createElement(MyComponent, {}),
    document.getElementById('root')
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