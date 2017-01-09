import React from 'react';
import ReactDom from 'react-dom';
import { About }  from './elements';

about();

// NOTE: only functions afterwards

function about() {

    const component =
          (
                  <div>
                  <h1>Feugiat Vitae Tincidunt!</h1>
                  <p>Turpis in eu mi bibendum neque egestas congue quisque egestas diam in!</p>
                  <ul>
                  <li>Blandit cursus risus, at ultrices mi tempus imperdiet nulla malesuada.</li>
                  </ul>
                  
                  <h2>Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci, a scelerisque purus semper eget duis at tellus at urna? Massa id neque aliquam vestibulum morbi blandit cursus risus.</h2>
                  <About>
                  </About>
                  </div>);

    const host = document.querySelector('#react-container');
    ReactDom.render(component, host);
}

