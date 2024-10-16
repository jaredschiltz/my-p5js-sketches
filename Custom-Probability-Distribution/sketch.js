let pmf = {}

function setup() {
  createCanvas(400, 400);
  // Make unfair dice roll
  denominator = 18

  // numerators must add up to denomimator and results in num/den = 1
  // e.g. there is a 5/18 percent of rolling '1'
  //      there is a 3/18 percent of rolling '2'
  //      there is a 2/18 percent of rolling '3'
  //      ... etc.
  //.     5/18 + 3/18 + 2/18 + 1/18 + 3/18 + 4/18 = 1
  
  // store all numerators
  pmf[1] = 5
  pmf[2] = 3
  pmf[3] = 2
  pmf[4] = 1
  pmf[5] = 3
  pmf[6] = 4
  
  // Create an array with repeated values - This will be our probability table
  probability_table = new Array()
  for (items in pmf) {
    for(i = 0; i < pmf[items]; i++) {
      probability_table.push(items)
    }
  }
  
  print(probability_table)
  
  // Test Probability Table
  let trials = 10000000
  // Reuse pmf for calculating histogram
  pmf[1] = 0
  pmf[2] = 0
  pmf[3] = 0
  pmf[4] = 0
  pmf[5] = 0
  pmf[6] = 0
  for (i = 0; i < trials; i++) {
    pmf[probability_table[Math.floor(Math.random() * probability_table.length)]]++
  }
  print("rolling 1: simulated(p): " + pmf[1]/trials + " actual(p): " + 5/18)
   print("rolling 2: simulated(p): " + pmf[2]/trials + " actual(p): " + 3/18)
   print("rolling 3: simulated(p): " + pmf[3]/trials + " actual(p): " + 2/18)
   print("rolling 4: simulated(p): " + pmf[4]/trials + " actual(p): " + 1/18)
   print("rolling 5: simulated(p): " + pmf[5]/trials + " actual(p): " + 3/18)
   print("rolling 6: simulated(p): " + pmf[6]/trials + " actual(p): " + 4/18)
  noLoop()
}

function draw() {
  background(220);
}