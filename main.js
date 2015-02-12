/* jshint camelcase: false */
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

'use strict';

$(document).ready(init);

function init() {
  getLocation();
}

var weather = {};

function getLocation() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options);
}

function success(pos) {
  var url1 = 'http://api.wunderground.com/api/aad218fcd659a15a/forecast10day/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';
  var url2 = 'http://api.wunderground.com/api/aad218fcd659a15a/conditions/q/' + pos.coords.latitude + ',' + pos.coords.longitude + '.json';

  $.getJSON(url1, function(response) {
    weather.forecast = response;
    displayForecast();
  });

  $.getJSON(url2, function(response) {
    weather.current = response;
    displayForecast();
  });
}

function error(err) {
  console.log(err);
}

function displayForecast() {
  if (Object.keys(weather).length === 2) {
    $('#city').text(weather.current.current_observation.display_location.city + ', ' +  weather.current.current_observation.display_location.state);
    $('#current').text(weather.current.current_observation.weather);
    $('#temperature').html(weather.current.current_observation.temp_f + '&deg;');
    weather.forecast.forecast.simpleforecast.forecastday.forEach(function(day) {
      var html = '<tr><td>' + day.date.weekday + '</td><td><img src="' + day.icon_url + '"></td><td>' + day.high.fahrenheit + '&deg;</td><td>' + day.low.fahrenheit + '&deg;</td></tr>';
      $('#forecast > tbody').append(html);
    });
  }
}
