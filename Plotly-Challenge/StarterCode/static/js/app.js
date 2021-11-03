

// Plot Function
function makePlots(chartData) {

    d3.json("samples.json").then((data) => {
    
    //Create variables for plot
    var value = chartData.sample_values;
    var otus = chartData.otu_ids;
    var htext = chartData.otu_labels;

    //Slice data  
    var xticks = value.slice(0, 10).reverse();
    var yticks = otus.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  
    //   makePlots
    let trace1 = {
      x: xticks,
      y: yticks,
      text: xticks,
      type: 'bar',
      orientation: 'h'
    };
    var layout1 = {
      title: "<b>Top 10 Bacteria Cultures Found in Bellybutton</b>",
      xaxis: { autorange: true },
      yaxis: { autorange: true },
    };
    plotData = [trace1]
    Plotly.newPlot("bar", plotData, layout1);


    let trace2 = {
      x: otus,
      y: value,
      text: htext,
      mode: "markers",
      orientation: 'h',
      marker: {
        color: otus,
        size: value
      }
    };
    let layout2 = {

      hovermode: "closest",
      width: 1100,
      height: 600

    }
    plotdata2 = [trace2]
    Plotly.newPlot("bubble", plotdata2, layout2)

  });
};


//load demographic data
function demographicData(sampleValue) {
  
  d3.json("samples.json").then((data) => {
    var metaData = data.metadata;
    var choice = metaData.filter(arrayObject2 => arrayObject2.id == sampleValue.id)[0];
    var demographics = d3.select("#sample-metadata");
    demographics.html("");
   
    Object.entries(choice).forEach(([key, value]) => {
      
        
        demographics.append("h5").text(`${key}: ${value}`);

    });
  });
};


//function to filter data then send to plot function and demographic function
function getData(selectMe) {
  d3.json("samples.json").then(data => {

    let dataSample = data.samples
    let filteredObject = dataSample.filter(arrayObject => arrayObject.id == selectMe)[0];

    makePlots(filteredObject)
    demographicData(filteredObject)
  })
};




//function to activate dropdown menu
function dropdownValues() {
  var dropdownMenu = d3.select("#selDataset");
  d3.json("samples.json").then(function (data) {
    data.names.forEach((name) => {
      dropdownMenu.append("option").text(name).property("value", name)
    });
  });
};


/* Initializing function*/
function init() {
   d3.json("samples.json").then(data => {
    var defaultSample = data.names[0];


    getData(defaultSample);
    demographicData(defaultSample);
    dropdownValues();

  })
}


//change function. feeds new value to data function
function optionChanged(selectionChange) {
  getData(selectionChange);
}

init();


