function convertToLayers(legend) {
	let tempStore;
	const layerColor = [];
	const regex = /stop\(([-0-9.]+), (rgba\([0-9., ]+\))\)/g;

	do {
		tempStore = regex.exec(legend);
		if (tempStore)
			layerColor.push({ value: parseFloat(tempStore[1]), color: tempStore[2] });
	}
	while (tempStore);

	return layerColor;
}

const rainLegend =
	`stop(0, rgba(225, 200, 100, 0))
	stop(0.1, rgba(200, 150, 150, 0))
	stop(0.2, rgba(150, 150, 170, 0))
	stop(0.5, rgba(120, 120, 190, 0))
	stop(1, rgba(110, 110, 205, 0.3))
	stop(10, rgba(80,80, 225, 0.7))
	stop(140, rgba(20, 20, 255, 0.9))`;

const rainLayers = convertToLayers(rainLegend);

const cloudLegend =
	`stop(0, rgba(255, 255, 255, 0.0))
   stop(10, rgba(253, 253, 255, 0.1))
   stop(20, rgba(252, 251, 255, 0.2))
   stop(30, rgba(250, 250, 255, 0.3))
   stop(40, rgba(249, 248, 255, 0.4))
   stop(50, rgba(247, 247, 255, 0.5))
   stop(60, rgba(246, 245, 255, 0.75))
   stop(70, rgba(244, 244, 255, 1))
   stop(80, rgba(243, 242, 255, 1))
   stop(90, rgba(242, 241, 255, 1))
   stop(100, rgba(240, 240, 255, 1))`;

const clouldLayers = convertToLayers(cloudLegend);

const tempLegend =
	`stop(-65, rgba(130, 22, 146, 1))
	stop(-55, rgba(130, 22, 146, 1))
	stop(-45, rgba(130, 22, 146, 1))
	stop(-40, rgba(130, 22, 146, 1))
	stop(-30, rgba(130, 87, 219, 1))
	stop(-20, rgba(32, 140, 236, 1))
	stop(-10, rgba(32, 196, 232, 1))
	stop(0, rgba(35, 221, 221, 1))
	stop(10, rgba(194, 255, 40, 1))
	stop(20, rgba(255, 240, 40, 1))
	stop(25, rgba(255, 194, 40,1))
	stop(30, rgba(252, 128, 20, 1))`;

const tempLayers = convertToLayers(tempLegend);

const windLegend =
	`stop(1, rgba(255,255,255, 0))
	stop(5, rgba(238,206,206, 0.4))
	stop(15, rgba(179,100,188, 0.7))
	stop(25,rgba(63,33,59, 0.8))
	stop(50, rgba(116,76,172, 0.9))
	stop(100, rgba(70,0,175,1))
	stop(200, rgba(13,17,38,1))`;

const windLayers = convertToLayers(windLegend);

const pressureLegend =
	`stop(940, rgba(0,115,255,1))
	stop(960, rgba(0,170,255,1))
	stop(980, rgba(75,208,214,1))
	stop(1000, rgba(141,231,199,1))
	stop(1010, rgba(176,247,32,1))
	stop(1020, rgba(240,184,0,1))
	stop(1040, rgba(251,85,21,1))
	stop(1060, rgba(243,54,59,1))
	stop(1080, rgba(198,0,0,1));   `;
	
const pressureLayers = convertToLayers(pressureLegend);

export const layerColors = {
	precipitation_new: rainLayers, 
	clouds_new: clouldLayers, 
	temp_new: tempLayers, 
	wind_new: windLayers, 
	pressure_new: pressureLayers
}


