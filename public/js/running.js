$(document).ready(function() {
  var API_URL = 'http://10.0.6.80:3000/api/todoist/project/155704829/items';
  $.get(API_URL, function(data) {
    $('#content').show();
    data.data.map(function(item, index) {
      var classEven = index % 2 ? 'dark' : '';
      var bits = item.content.split('::');
      var exercice = bits[1];
      var repetitions = bits[0];
      var html = '<li><span class=\'blue\'>' + repetitions + '</span> ' + exercice + '</li>';
      $('#data').append(html);
    });

    // $('#btn_start').click(function() {
    //   doSend('start_routine');
    //   return false;
    // });
    init();
  });


  var wsUri = 'ws://10.0.6.80:3333/';
  var output;
  function init() {
    // output = document.getElementById('output');
    testWebSocket();
  }
  function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      onOpen(evt);
    };
    websocket.onclose = function(evt) {
      onClose(evt);
    };
    websocket.onmessage = function(evt) {
      onMessage(evt);
      // if (evt.data === 'pebble_start_routine') {
      //   document.location.href = 'running';
      // }
    };
    websocket.onerror = function(evt) {
      onError(evt);
    };
  }
  function onOpen(evt) {
    writeToScreen('CONNECTED');
  }
  function onClose(evt) {
    writeToScreen('DISCONNECTED');
  }
  function onMessage(evt) {
    writeToScreen(evt.data);
    if (evt.data === 'exercise_start') {
      console.log('exercise_start');
      var items = $('#data li');
      for (var i = 0, len = items.length; i < len; i++) {
        if (!$(items[i]).hasClass('active') && !$(items[i]).hasClass('finished')) {
          $(items[i]).addClass('active');
          break;
        }
      }
    }
    else if (evt.data === 'exercise_complete') {
      var items = $('#data li');
      for (var i = 0, len = items.length; i < len; i++) {
        if ($(items[i]).hasClass('active') && !$(items[i]).hasClass('finished')) {
          $(items[i]).addClass('finished');
          break;
        }
      }
    }
    // websocket.close();
  }
  function onError(evt) {
    writeToScreen(evt.data);
  }
  function doSend(message) {
    writeToScreen('SENT: ' + message);
    websocket.send(message);
  }
  function writeToScreen(message) {
    console.log(message);
  }
});

//
// <ul>
//   <li class="finished">
//     <span class="blue">30</span> push-ups
//   </li>
//   <li class="dark active">
//     <span class="blue">15</span> pull-ups
//   </li>
//   <li>
//     <span class="blue">30</span> sit-ups
//   </li>
//   <li class="dark">
//     <span class="blue">20</span> push-ups
//   </li>
// </ul>
