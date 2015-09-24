'use strict';

(function(){

	var app = angular.module('weatherApp', ['services']);
	var apiKey = '8d16054b69429db0';
	

	app.directive('weatherInfo', ['services', function(services){
			
		return {
			restrict: 'E',
			transclude: true,
			template : '<div class="mdl-cell mdl-cell--6-col" ><div class="mdl-card mdl-shadow--2dp" style="width: 100%;"><div class="mdl-card__title"><h4>City: {{weatherInfo.city}}, {{weatherInfo.state}} <br />Temperature: {{weatherInfo.temperature}}<br />Weather: {{weatherInfo.weather}}<br/></h4></div></div></div>',
			//templateUrl: 'templates/weatherInfo.html',
			scope: {
				city: "@",
				state: "@"
			},
			link: function link(scope) {

				init();
				function init() {
					services.weatherInfo(scope.city, scope.state).then(
						function(result) {
							//console.log(result);
							scope.weatherInfo = result;
						}
					);
				}
			}
		};
	}]);

	var service = angular.module('services', []);

	service.factory('services', function($http) {

		return {
			
			weatherInfo : function(city, state) {
				
				//console.log(city);
				//console.log(state);
				return $http.get('http://api.wunderground.com/api/' + apiKey + '/conditions/q/'+ state+ '/'+ city + '.json').then(
					
					function(result) {
						//console.log(result);
						var weatherInfo = {
							city : result.data.current_observation.display_location.city,
							state : result.data.current_observation.display_location.state,
							temperature : result.data.current_observation.feelslike_string,
							weather : result.data.current_observation.weather};

						//console.log(weatherInfo);
						return weatherInfo;
					});
				},

		}
	});




})();

