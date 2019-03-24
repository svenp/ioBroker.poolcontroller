
'use strict';

var utils = require('@iobroker/adapter-core'); // Get common adapter utils
var request = require('request');
var adapter = new utils.Adapter('poolcontroller');

function startAdapter(options) {
    options = options || {};
    Object.assign(options, {name: adapterName});

    adapter = new utils.Adapter(options);
	
adapter.on('ready', function () {
    main();
});
});

function main() {
// If started as allInOne/compact mode => return function to create instance
if (module && module.parent) {
    module.exports = startAdapter;
} else {
    // or start the instance directly
    startAdapter();
}
var host = adapter.config.host
var port = adapter.config.port
var result, json;

 
//#################################################################

request(
	{
		url: "http://" + host + ":" + port + "/GetState.csv"
			},
		function(error, responce, content)	{
			adapter.log.debug('Request done');

			if (!error){


				content =content.replace(/ /g, '_'); 	 //alle Leerzeichen durch Unterstrich ersetzten
				var data=CSVToArray(content);         //CSV in ein Array einlesen

			    // User Variablen anlegen Achtung keine Punkte im Namen verwenden. 
			    var i=16;
			    for (i=16; i<=23;i++){
				adapter.setObjectNotExists('visButtons.Relais'+[i-16], {
				type: 'state',
				common:   {
					name: data[1][i],
			       		type: 'number',
					write: true,
					read:  true
			       	},
				});
			     }
			     i=28;
			     for (i=28; i<=35;i++){
				adapter.setObjectNotExists('visButtons.Relais'+[i-20], {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					write: true,
					read:  true
				},
				});
			      }
			       i=0;
			   for (i=0; i<=41;i++){
				if (i===0){
				adapter.setObjectNotExists(data[1][i], {
			 	type: 'state',
				common:   {
				       	name: data[1][i],
					type: 'string',
					write: false,
					read:  true
				},
				});
				}
			       if (i>=1 && i<=5){
				adapter.setObjectNotExists('ADC'+[i-1], {
				type: 'state',
				common:   {

					name: data[1][i],
			       		type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===6){
				adapter.setObjectNotExists('Redox', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===7){
				adapter.setObjectNotExists('pH', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i>=8 && i<=15){
				adapter.setObjectNotExists('Temperatur'+[i-7], {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i>=16 && i<=23){
				adapter.setObjectNotExists('Relais'+[i-16], {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i>=24 && i<=27){
				adapter.setObjectNotExists('Digital_Input'+[i-23], {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i>=28 && i<=35){
				adapter.setObjectNotExists('Relais'+[i-20], {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
			       		write: false,
					read:  true
				},
				});
				}
				if (i===36){
				adapter.setObjectNotExists('CL_Rest', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===37){
				adapter.setObjectNotExists('pH-_Rest', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===38){
				adapter.setObjectNotExists('pH+_Rest', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===39){
				adapter.setObjectNotExists('Cl_consumption', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				if (i===40){
				adapter.setObjectNotExists('pH-_consumption', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
				 if (i===41){
				adapter.setObjectNotExists('pH+_consumption', {
				type: 'state',
				common:   {
					name: data[1][i],
					type: 'number',
					unit: data[2][i],
					write: false,
					read:  true
				},
				});
				}
			   }
	
			    //SYSINFO Variablen mit aktuellen Werten beschreiben
			    adapter.setState('sysinfo.VERSION', data[0][1]);
			    adapter.setState('sysinfo.CPU_TIME', parseFloat(Number(data[0][2]).toFixed(2)));
			    adapter.setState('sysinfo.RESET_ROOT_CAUSE', parseFloat(Number(data[0][3]).toFixed(2)));
			    adapter.setState('sysinfo.NTP_FAULT_STATE', parseFloat(Number(data[0][4]).toFixed(2)));
			    adapter.setState('sysinfo.CONFIG_OTHER_ENABLE', parseFloat(Number(data[0][5]).toFixed(2)));
			    adapter.setState('sysinfo.DOSAGE_CNTRL', parseFloat(Number(data[0][6]).toFixed(2)));
			    adapter.setState('sysinfo.pH+_DOSAGE_RELAIS_ID', parseFloat(Number(data[0][7]).toFixed(2)));
			    adapter.setState('sysinfo.pH-_DOSAGE_RELAIS_ID', parseFloat(Number(data[0][8]).toFixed(2)));
			    adapter.setState('sysinfo.Chlor_DOSAGE_RELAIS_ID', parseFloat(Number(data[0][9]).toFixed(2)));

			   // User Variablen mit aktuellen Werten beschreiben
			    i=0; 
			    for (i=0; i<=41;i++){
			       var wert = offset + ( gain * value);
			       var offset =  parseFloat(data[3][i]);
			       var gain =   parseFloat(data[4][i]);
			       var value =   parseFloat(data[5][i]);
			       var wert =  offset + ( gain * value);
			   
    		 	        if (i===0) {
           		            wert = ((wert>>8)<10?0:'')+''+(wert>>8)+':'+((wert&0xFF)<10?0:'')+''+(wert&0xFF);
         			    adapter.setState('Time',wert);
        			}
       				if (i>=1 && i<=5){
				    adapter.setState('ADC'+[i-1], parseFloat(Number(wert).toFixed(2)));
			      	}
			      	if (i===6){
			      	    adapter.setState('Redox', parseFloat(Number(wert).toFixed(2)));
			      	}
				if (i===7){
					adapter.setState('pH', parseFloat(Number(wert).toFixed(2)));
			      	}
				if (i>=8 && i<=15){
				    adapter.setState('Temperatur'+[i-7], parseFloat(Number(wert).toFixed(2)));  
				} 
				if (i>=16 && i<=23){
				    adapter.setState('Relais'+[i-16], parseFloat(Number(wert).toFixed(2)));  
				}
				if (i>=24 && i<=27){   
				    adapter.setState('Digital_Input'+[i-23], parseFloat(Number(wert).toFixed(2)));  
				}
				if (i>=28 && i<=35){
				    adapter.setState('Relais'+[i-20], parseFloat(Number(wert).toFixed(2)));   
				}
				if (i===36){
				   adapter.setState('CL_Rest', parseFloat(Number(wert).toFixed(2)));   
				}
				if (i===37){
				    adapter.setState('pH-_Rest', parseFloat(Number(wert).toFixed(2)));   
				}
			      	if (i===38){
			      	    adapter.setState('pH+_Rest', parseFloat(Number(wert).toFixed(2)));  
			      	}
			      	if (i===39){
			      	    adapter.setState('Cl_consumption', parseFloat(Number(wert).toFixed(2))); 
			      	}
			      	if (i===40){
			      	     adapter.setState('pH-_consumption', parseFloat(Number(wert).toFixed(2)));
			      	}
			      	if (i===41){
			      	    adapter.setState('pH+_consumption', parseFloat(Number(wert).toFixed(2)));
			      	}
			   }
			   adapter.log.info("Variablen updated"); 
		} 
		else 	{
			adapter.log.error(error);
		}		
	}
);
	setTimeout(function () {
		 adapter.terminate ? adapter.terminate() : process.exit()
		adapter.stop();
	}, 20000);	 				
  
//###########################################################################################    
    
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

}
