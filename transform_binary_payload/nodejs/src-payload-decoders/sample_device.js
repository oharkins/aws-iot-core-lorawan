// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var directions = ['N', 'E', 'S', 'W'];
var colors = ['red', 'green'];

function decodeUplink(input) {
    switch (input.fPort) {
        case 1:
            return {
                // Decoded data
                data: {
                    direction: directions[input.bytes[0]],
                    speed: input.bytes[1],
                },
            };
        default:
            return {
                errors: ['unknown FPort ' + input.fPort],
            };
    }
}

function encodeDownlink(input) {
    var i = colors.indexOf(input.data.led);
    if (i === -1) {
        return {
            errors: ['invalid LED color'],
        };
    }
    return {
        // LoRaWAN FPort used for the downlink message
        fPort: 2,
        // Encoded bytes
        bytes: [i],
    };
}

function decodeDownlink(input) {
    switch (input.fPort) {
        case 2:
            return {
                // Decoded downlink (must be symmetric with encodeDownlink)
                data: {
                    led: colors[input.bytes[0]],
                },
            };
        default:
            return {
                errors: ['invalid FPort'],
            };
    }
}

module.exports = { decodeUplink }

