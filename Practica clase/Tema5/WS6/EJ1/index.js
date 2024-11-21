google.charts.load('current', {
    'packages':['corechart', 'geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouDcb0hJqq_pgmrkf_Rn8E'
});

// Initial Election Results Data
let initialElectionData = [
    ['Partido', 'Escaños'],
    ['Partido Popular (PP)', 136],
    ['Partido Socialista (PSOE)', 122],
    ['Sumar', 31],
    ['Vox', 33],
    ['Otros', 28]
];

// Alternative Election Results Data (after 10 seconds)
let updatedElectionData = [
    ['Partido', 'Escaños'],
    ['Partido Popular (PP)', 140],
    ['Partido Socialista (PSOE)', 118],
    ['Sumar', 28],
    ['Vox', 30],
    ['Otros', 34]
];

// Tourism Data
let tourismData = [
    ['País', 'Millones de Visitantes'],
    ['France', 90],
    ['Spain', 84],
    ['United States', 80],
    ['China', 66],
    ['Italy', 65],
    ['Turkey', 52],
    ['Mexico', 45],
    ['Germany', 39],
    ['United Kingdom', 38],
    ['Thailand', 38]
];

google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    // Bar Chart
    let barData = google.visualization.arrayToDataTable(initialElectionData);
    let barOptions = {
        title: 'Representación en el Congreso de los Diputados',
        chartArea: {width: '50%'},
        hAxis: {title: 'Número de Escaños'},
        vAxis: {title: 'Partidos'}
    };
    let barChart = new google.visualization.BarChart(document.getElementById('barChart'));
    barChart.draw(barData, barOptions);

    // Pie Chart
    let pieData = google.visualization.arrayToDataTable(initialElectionData);
    let pieOptions = {
        title: 'Distribución de Escaños por Partido',
        is3D: true
    };
    let pieChart = new google.visualization.PieChart(document.getElementById('pieChart'));
    pieChart.draw(pieData, pieOptions);

    // Geographical Chart
    let geoData = google.visualization.arrayToDataTable(tourismData);
    let geoOptions = {
        title: 'Ranking Mundial de Países Turísticos',
        colorAxis: {colors: ['#e7711c', '#4374e0']}
    };
    let geoChart = new google.visualization.GeoChart(document.getElementById('geoChart'));
    geoChart.draw(geoData, geoOptions);

    // Animate Bar Chart after 10 seconds
    setTimeout(function() {
        let updatedBarData = google.visualization.arrayToDataTable(updatedElectionData);
        barChart.draw(updatedBarData, barOptions);
        
        let updatedPieData = google.visualization.arrayToDataTable(updatedElectionData);
        pieChart.draw(updatedPieData, pieOptions);
    }, 10000);
}