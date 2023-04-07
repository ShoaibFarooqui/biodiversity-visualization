

// end point
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// open json and d3 select 
let data2 = d3.json(url).then(function(data){
    console.log(data);
    
   
    let point = d3.select("#selDataset");
    let sampleName = data.names;
    sampleName.forEach((sample) => {point.append("option").text(sample).property("value",sample);
    });

    let starting_sample = sampleName[0];
    makeChart(starting_sample);
    metaData(starting_sample);

     
function makeChart(firstSample){
    
    let sampledata = data.samples;
    let sampledataArray = sampledata.filter(sampleObj => sampleObj.id == firstSample);
    let sampleresult = sampledataArray[0];
    console.log(sampleresult);

    let sortedByOtuid = sampleresult.otu_ids.sort((a, b) => b.otu_ids - a.otu_ids);
    slicedData = sortedByOtuid.slice(0, 10);
    reverseData = slicedData.reverse();
    let sortedBySampleValues = sampleresult.sample_values.sort((a, b) => b.sample_values - a.sample_values);
    slicedData2 = sortedBySampleValues.slice(0, 10);
    reverseData2 = slicedData2.reverse();
    let trace1 = {
        x: reverseData2,
        y: reverseData.map(object => `OTU ${object}`),
        text: reverseData.map(object => object.otu_labels),
        type: "bar",
        orientation: "h"
    };
    let traceData = [trace1];
    let layout = {
        title: "Top 10 OTUs",
        margin: {
            l:100,
            r:100,
            t:100,
            b:100
        }
    };
    Plotly.newPlot("bar", traceData, layout);

   let circleData = [{
    x:sampleresult.otu_ids,
    y:sampleresult.sample_values,
    text: sampleresult.otu_labels,
    mode:"markers",
    marker:{
        size: sampleresult.sample_values,
        color: sampleresult.otu_ids
    }
   }]; 

   let bubbleLayout =[{
    title: "Bacteria Values by Size",
   }];

   Plotly.newPlot("bubble", circleData, bubbleLayout);
}
 
function metaData(firstSample){
    let metadata = data.metadata;
    let metadataArray = metadata.filter(sampleObj => sampleObj.id == firstSample);
    let result = metadataArray[0];

    let panel = d3.select(`#sample-metadata`);
    Object.entries(result).forEach(([key, value]) => {
        panel.append("h4").text(`${key}: ${value}`);
    });
    console.log(result);
} 





});