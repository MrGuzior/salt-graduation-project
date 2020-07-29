import React from 'react';
import tips from './tips_list.js';

function Tips() {
    let tipsArray = [];
    for (let i = 0; i < tips.length; i++) {
        let list = tips[i].list.map(element => {
            return (<li className="tip-list-item">{element}</li>)
        })
        let html = <div className="tip">
            <h2 className="tip-heading">{tips[i].heading}</h2>
            <p className="tip-desc">{tips[i].description}</p>
            <ol className="tip-list">{list}</ol>
        </div>
        tipsArray = [...tipsArray, html]
    }

    return (
        <div className='tips-container'>
            {tipsArray}
        </div>)
}

export default Tips