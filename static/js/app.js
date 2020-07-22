function buildPlot(){
  url = "/api/pals-summary"
  d3.json(url).then(function(data){
    console.log(data)
    var trace = {
      x: data.map(d => d.Type),
      y: data.map(d => d.Count),
      type: 'bar'}
    var data = [trace]
    var layout = {title: "Pet Type Counter"}
    Plotly.newPlot('plot', data, layout);
  })}

function buildTable(){
  url = "/api/pals";
  d3.json(url).then(function(data){
    console.log(data)
    var name = data.map(d => d.name)
    var type = data.map(d => d.type)
    var age = data.map(d => d.age)
    var table = d3.select("#pets-table")
    var tbody = table.select("tbody")
    var trow

    for (var i = 0; i < name.length; i++) {
      trow = tbody.append("tr");
      trow.append("td").text(name[i]);
      trow.append("td").text(type[i]);
      trow.append("td").text(age[i])
    }

  })
}
buildPlot()
buildTable()



// function buildTable() {
// /* data route */
// var url = "/api/pals";
// d3.json(url).then(function(response) {

//   var pet_name = response.map(p => p.name);
//   var pet_type = response.map(p => p.type);
//   var pet_age = response.map(p => p.age);

//   var table = d3.select("#pets-table");
//   var tbody = table.select("tbody");
//   console.log(tbody);
//   var trow;
//   for (var i = 0; i < pet_name.length; i++) {
//     trow = tbody.append("tr");
//     trow.append("td").text(pet_name[i]);
//     trow.append("td").text(pet_type[i]);
//     trow.append("td").text(pet_age[i]);
//     }
// });
// }

// buildPlot();