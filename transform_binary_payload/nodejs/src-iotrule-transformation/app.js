// Copyright Odis Harkins. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const lht65 = require("./src-iotrule-transformation/dragino_lht65_fw17.js");
const lgt92 = require("./src-iotrule-transformation/dragino_lgt92_fw162.js");


//test = async(event, context) => {
exports.handler = async(event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var buf = Buffer.from(event.PayloadData, 'base64');
    
    switch (event.PayloadDecoderName) {
        case 'dragino_lht65':
             return lht65.Decoder(buf, 0);

        case 'dragino_lgt92':
            return lgt92.Decoder(buf, 0);
        default:
			console.error("No Decoder For Sensor");
            return "No Decoder For Sensor"
            
    }
};