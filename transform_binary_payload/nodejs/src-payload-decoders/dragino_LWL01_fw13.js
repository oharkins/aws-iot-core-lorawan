function decodeUplink(input) {
    return Decoder(input.bytes,input.fPort);
}
function Decoder(bytes, port) {
    // Decode an uplink message from a buffer
    // (array) of bytes to an object of fields.
    var value=(bytes[0]<<8 | bytes[1]) & 0x3FFF;
    var batV=value/1000;//Battery,units:V
     
    value=bytes[2]<<8 | bytes[3];
    var distance=(value)+" mm";//distance,units:mm
    if(value===0)
      distance = "No Sensor";
    else if(value<280)
      distance = "Invalid Reading";
      
    return {
         Bat:batV +" V",
         Distance:distance
    };
  }
module.exports = { decodeUplink };
