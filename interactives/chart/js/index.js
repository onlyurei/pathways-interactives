define(['json!data/earth-sun.json', 'nv', 'd3', 'knockout', 'sugar'], function (data, nv, d3, ko) {

    var table = {
        theads: [{ key: data[0].xAxis.axisLabel }].add(data.map(function (datum) {
            return datum.datum.map(function (_datum) {
                return {
                    key: _datum.key,
                    axisLabel: datum.yAxis.axisLabel
                };
            });
        }).flatten()),
        tbodies: []
    };

    var tbodies = data.map(function (datum) {
        return datum.datum.map(function (_datum) {
            return _datum.values.map('y');
        })
    }).flatten().inGroupsOf(data[0].datum[0].values.length);

    table.tbodies = Array.prototype.zip.apply(data[0].datum[0].values.map('x'), tbodies);

    var charts = data.map(function (datum) {
        return datum.name;
    });

    var viewModel = {
        table: table,
        charts : charts,
        chart: ko.observable(charts[0])
    };

    data.each(function (datum, index) {

        var div = document.createElement('div');
        div.setAttribute('data-name', datum.name);
        div.setAttribute('data-bind', "visible: chart() == '" + datum.name + "'");

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'svg' + index;

        div.appendChild(svg);
        document.body.appendChild(div);

        nv.addGraph(function () {
            var chart = nv.models.lineChart()
                    .useInteractiveGuideline(true)
                    .margin({ left: 75 })
                    .color(['#02558f', '#fd7700', '#df02f9'])
                ;

            if (datum.forceY) {
                chart.forceY(datum.forceY);
            }

            if (datum.xAxis) {
                chart.xAxis
                    .axisLabel(datum.xAxis.axisLabel)
                    .tickFormat(d3.format(datum.xAxis.tickFormat))
                ;
            }

            if (datum.yAxis) {
                chart.yAxis
                    .axisLabel(datum.yAxis.axisLabel)
                    .tickFormat(d3.format(datum.yAxis.tickFormat))
                ;
            }

            d3.select('#' + svg.id)
                .datum(datum.datum)
                .transition().duration(500).call(chart)
            ;

            return chart;
        });

    });

    setTimeout(function () {
        ko.applyBindings(viewModel);
    }, 100);
});

