# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this
# software and associated documentation files (the "Software"), to deal in the Software
# without restriction, including without limitation the rights to use, copy, modify,
# merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
# PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



import base64
import time
import math

def dict_from_payload(base64_input: str):
    decoded = base64.b64decode(base64_input)
    print(decoded)
    result = {
        "Ext_sensor" :
       {
         0:"No external sensor",
         1:"Temperature Sensor",
         4:"Interrupt Sensor send",
         5:"Illumination Sensor",
         6:"ADC Sensor",
         7:"Interrupt Sensor count",
       }[decoded[6]&0x7F],

       #Battery,units:V
       "BatV":((decoded[0]<<8 | decoded[1]) & 0x3FFF)/1000,
       #SHT20,temperature,units:â„ƒ
       "TempC_SHT": round(((decoded[2]<<24>>16 | decoded[3])/100),2),
       #SHT20,Humidity,units:%
       "Hum_SHT":round(((decoded[4]<<8 | decoded[5])/10),1),
    }

    # DS18B20,temperature,units:â„ƒ
    if decoded[6] & 0x7F == 1:
        result["TempC_DS"] = round(((decoded[7] << 24 >> 16 | decoded[8]) / 100), 2)
    # Exit pin status,PA4
    if decoded[6] & 0x7F == 4:
        result["Exti_status"] = "True" if decoded[7] == 1 else "False"
    # Exti pin level,PA4
    if decoded[6] & 0x7F == 4:
        result["Exti_pin_level"] = "High" if decoded[7] == 1 else "Low"
    # BH1750,illumination,units:lux
    if decoded[6]&0x7F == 5:
        result["ILL_lux"] = decoded[7] << 8 | decoded[8]
    #  #ADC,PA4,units:V
    if decoded[6]&0x7F == 6:
        result["ADC_V"] = (decoded[7]<<8 | decoded[8])/1000
    # Exti count,PA4,units:times
    if decoded[6]&0x7F == 7:
        result["Exit_count"] = decoded[7]<<8 | decoded[8]
    #Applicable to working mode 4,5,6,7, and working mode 4,6,7 requires short circuit PA9 and PA10
    if (decoded[6]&0x80) >> 7 == 1:
        result["No_connect"] = "Sensor no connection"

    return result
    

print(dict_from_payload("y48B4gPoAX//f/8="))

#BatteryMillivoltage:2772
#BatteryPercentage:"54.400"
#Ext_sensor:"Temperature_Sensor"
#Humidity:"73.1"
#TemperatureC:"-21.20"
#TemperatureF:"-6.16"