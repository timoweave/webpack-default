import React, { Component } from 'react';
import {say, hello } from './utils';

export class About extends Component {
    render() {
        return (
                <div>
                <ol>
                <li>Augue interdum velit euismod in pellentesque massa placerat duis ultricies.</li>
                <li>Et tortor consequat id porta nibh venenatis cras sed felis?</li>
                <li>Non pulvinar neque laoreet suspendisse interdum consectetur libero, id faucibus?</li>
                <li>Mollis nunc sed id semper risus in hendrerit gravida rutrum!</li>
                <li>Cursus mattis molestie a, iaculis at erat pellentesque adipiscing commodo!</li>
                <li>Diam vel quam elementum pulvinar etiam non quam lacus suspendisse?</li>
                <li>Elit pellentesque habitant morbi tristique senectus et netus et malesuada.</li>
                <li>Nulla at volutpat diam ut venenatis tellus in metus vulputate?</li>
                <li>Commodo, ullamcorper a lacus vestibulum sed arcu non odio euismod.</li>
                <li>Accumsan sit amet nulla facilisi morbi tempus iaculis urna, id!</li>
                </ol>
                </div>
        );
    }
}

export class Hello extends Component {
    render() {
        return (
                <div>
                <h1>{hello()}</h1>
                <p>Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien, faucibus et molestie.</p>

                <h2>{say("something interesting")}</h2>
                <p>Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit, scelerisque in dictum non, consectetur a erat.</p>

                <ol>
                <li>Amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus.</li>
                <li>Vitae proin sagittis, nisl rhoncus mattis rhoncus, urna neque viverra.</li>
                <li>Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem?</li>
                </ol>
                </div>
        );
    }
}
