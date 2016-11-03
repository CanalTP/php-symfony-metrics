var canvas = document.getElementsByClassName('canvas');
for (var idx = 0; idx < canvas.length; idx++) {
    var elt = canvas[idx];
    drawPie(elt.id, parseFloat(elt.getAttribute('value')).toFixed());
}

function drawPie(id, percent) {
    var ratio = percent / 100;
    var chart = document.getElementById(id);
    var d = chart.getContext("2d");

    //not covered
    d.beginPath();
    d.arc(50, 50, 50, 0, 2 * Math.PI, false);
    var gradient = d.createRadialGradient(50, 50, 25, 50, 50, 50);
    gradient.addColorStop(0, '#FE8C5A');
    gradient.addColorStop(1, '#DF2500');
    d.lineWidth = 1;
    d.strokeStyle = 'black';
    d.stroke();
    d.fillStyle = gradient;

    d.fill();

    //covered
    d.beginPath();
    d.moveTo(50, 50);
    d.arc(50, 50, 50, -0.5 * Math.PI, ratio * 2 * Math.PI - 0.5 * Math.PI, false);
    gradient = d.createRadialGradient(50, 50, 25, 50, 50, 60);
    gradient.addColorStop(0, '#C4F373');
    gradient.addColorStop(1, '#6EBF01');
    d.fillStyle = gradient;
    d.fill();

    //center-circle
    d.beginPath();
    d.moveTo(50, 50);
    d.arc(50, 50, 25, 0, 2 * Math.PI, false);
    d.fillStyle = "#336699";
    d.lineWidth = 1;
    d.strokeStyle = 'black';
    d.stroke();
    d.fill();

    //texte
    d.moveTo(50, 50);
    d.fillStyle = "#ffffff";
    d.font = "11pt sans-serif";
    d.fillText(percent + "%", 36, 56);


}
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawCharts);
function drawCharts() {

    var charts = document.getElementsByClassName('chart');

    for (var idx = 0; idx < charts.length; idx++) {
        var elt = charts[idx];
        var dataChart = JSON.parse(elt.getAttribute('data-chart'));
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Evolution');
        data.addRows(dataChart);

        var options = {
            colors: ['yellow'],
            backgroundColor: { fill:'transparent' },
            legend: 'none',
            width: 100,
            height: 130,
            curveType: 'function',
            hAxis: {
                gridlines: {color: "grey"},
                textPosition: 'none',
                title: null
            },
            vAxis: {
                ticks: [0, 25, 75, 90, 100],
                gridlines: {color: "grey"},
                textColor: "black",
                title: null
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(elt.id));

        chart.draw(data, options);
    }
}
