document.getElementById('load').onclick = function() {
    fetch('https://brianobruno.github.io/cats.json')
      .then(function(response) { return response.json(); })
      .then(function(data) {
        var table = document.getElementById('facts');
        
      
        table.innerHTML = table.rows[0].innerHTML;
 
        data.facts.sort((a, b) => a.factId - b.factId).forEach(function(fact) {
          var row = table.insertRow(-1);
          row.insertCell(0).textContent = fact.factId;
          row.insertCell(1).textContent = fact.text;
        });
        
      
        document.getElementById('catImg').src = data.catPhoto;
      });
  };
  