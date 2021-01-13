export function calcAnnualReturn(start_asset, end_asset, days) {
    /*console.log("start_asset=", start_asset);
    console.log("end_asset=", end_asset);
    console.log("days=", days);
    console.log("start_asset=", start_asset);
    console.log("end_asset=", end_asset);
    console.log("days=", days);
    console.log("(end_asset-start_asset) / start_asset=", (end_asset-start_asset) / start_asset);
    console.log("Math.pow(end_asset / start_asset, 250 / days) - 1=", Math.pow(end_asset / start_asset, 250 / days) - 1);
    console.log("annual return =", (Math.pow(end_asset / start_asset, 250 / days) - 1).toFixed(3));*/
    return (Math.pow(end_asset / start_asset, 250 / days) - 1).toFixed(3);       
}

export function annualReturn(data) {
    let n = data.length;
    let re = new Array(n);
    for (var i = 0; i < n; i++) {
        re[i] = new Array(n);
        re[i][i] = 0;
        for (var j = i + 1; j < n; j++) {
            re[i][j] = (Math.pow(data[j] / data[i], 250 / (j - i + 1)) - 1).toFixed(3); 
        }
    }
    return re;
}

export function maxDrawDown(assets) {
    let n = assets.length;
    let MDD = new Array(n);
    let max = new Array(n), min = new Array(n);
    for (let i = 0; i < n; i++) {
        max[i] = new Array(n);
        min[i] = new Array(n);
        min[i][i] = max[i][i] = assets[i];
        for (let j = i + 1; j < n; j++) {
            min[i][j] = Math.min(min[i][j - 1], assets[j]);
            max[i][j] = Math.max(max[i][j - 1], assets[j]);
        }
    }    
    for(let i = 0; i < n; i++) {
        MDD[i] = new Array(n);
        MDD[i][i] = 0;
        for (let j = i + 1; j < n; j++) {
            MDD[i][j] = 0;
            for (let k = i; k < j; k++) {
                MDD[i][j] = Math.max(MDD[i][j], (max[i][k] - min[k + 1][j]) / max[i][k]).toFixed(3);
            }
        }
    }
    return MDD;
}

function volatility_help(data, n) {
    let re = new Array(n);
    for(let i = 0; i < n; i++) {
        re[i] = new Array(n);
        re[i][i] = 0;
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += data[j] / data[j - 1];
            let mean = sum / (j - i);
            let squareSum = 0;
            for (let k = i + 1; k <= j; k++) {
                squareSum += Math.pow(data[k] / data[k - 1] - mean, 2);
            }
            re[i][j] = (Math.sqrt(squareSum / (j - i))).toFixed(3);
        }
    }
    return re;
}

export function volatility(data) {
    return volatility_help(data, data.length);
}

export function Sharpe(annualReturn, volatility) {
    let n = annualReturn.length;
    let re = new Array(n);
    for(let i = 0; i < n; i++) {
        re[i] = new Array(n);
        re[i][i] = 0;
        for (let j = i + 1; j < n; j++) {
            re[i][j] = ((annualReturn[i][j] - 0.05) / volatility[i][j]).toFixed(3);
        }
    }
    return re;
}

export function sortino(data, annualReturn) {
    // re是downside deviation
    let n = data.length;
    let re = new Array(n);
    for(let i = 0; i < n; i++) {
        re[i] = new Array(n);
        re[i][i] = 0;
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += Math.min(data[j] / data[j - 1] - 1);
            let mean = sum / (j - i);
            let squareSum = 0;
            for (let k = i + 1; k <= j; k++) {
                squareSum += Math.pow(Math.min(0, data[k] / data[k - 1] - 1) - mean, 2);
            }
            re[i][j] = (Math.sqrt(squareSum / (j - i))).toFixed(3);
        }
    }
    let sortino = new Array(n);
    for(let i = 0; i < n; i++) {
        sortino[i] = new Array(n);
        sortino[i][i] = 0;
        for (let j = i + 1; j < n; j++) {
            sortino[i][j] = (annualReturn[i][j] / re[i][j]).toFixed(3);
        }
    }
    return sortino;
}

export function calmar(annualReturn, maxDrawDown) {
    let n = annualReturn.length;
    let re = new Array(n);
    for (let i = 0; i < n; i++) {
        re[i] = new Array(n);
        re[i][i] = 0;
        for (let j = i + 1; j < n; j++) {
            re[i][j] = (annualReturn[i][j] / maxDrawDown[i][j]).toFixed(3);
        }
    }
    return re;
}