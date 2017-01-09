import React from 'react';
import ReactDom from 'react-dom';
import { Hello }  from './elements';
// import moment from 'moment';

main();

// NOTE: only functions afterwards

function main() {

    const component =
          (
                  <div>
                  <Hello>
                  </Hello>
                  <h1>Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci.</h1>
                  
                  </div>);

    const host = document.querySelector('#react-container');
    ReactDom.render(component, host);
}

