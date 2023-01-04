const form = document.querySelector('form');
const textbox = document.querySelector('#textbox');


async function searchStock(symbol) {
    const API_KEY = '81GIOGTISJUE7M6S';
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    let data = await fetch(API_CALL)
        .then(response => response.json())
        .then(data => data['Time Series (5min)']);
    
    return data;
}

async function valueExtracter(symbol) {
    let timeList = [];
    let priceList= [];
    let relationDict = await searchStock(symbol);
    for (var key in relationDict){
        timeList.push(key)
        priceList.push(relationDict[key]['1. open'])}
    //console.log(timeList);
    //console.log(priceList);
    var data = [{ x: timeList, y: priceList, type: 'scatter'}];
    return data;
    //return Plotly.newPlot('myChart', data);

}


form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const text = textbox.value; 

    async function loopy(code){
        let output = await valueExtracter(code);
        console.log(output);
        var layout = {
            title: `Graph of ${code}`, 
            xaxis: {
              title: 'Date'
            },
            yaxis: {
              title: 'Price' 
            }
          };
        return Plotly.newPlot('myChart', output, layout);
    }

loopy(text);
});


