$(document).ready(function() {
  $('#content').hide();
  var API_URL = 'http://10.0.6.80:3000/api/todoist/project/155704829/items';
  $.get(API_URL, function(data) {
    $('#loading').hide();
    $('#content').show();
    console.log('data', data.data);
    data.data.map(function(item, index) {
      var classEven = index % 2 ? 'dark' : '';
      var bits = item.content.split('::');
      var exercice = bits[1];
      var repetitions = bits[0];
      var html = '<li><span class="blue">' + repetitions + '</span> ' + exercice + '</li>';
      $('#data').append(html);
    });
  });
});
