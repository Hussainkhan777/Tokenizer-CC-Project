function tokenize(snippet) {
  let tokens = [];
  let parts = snippet.split(/\s+|(?=[=+*-/();])|(?<=[=+*-/;()])/);

  for (let part of parts) {
    if (part.trim() !== "") {
      tokens.push(part);
    }
  }
  return tokens;
}

function tokenizeCode() {
  let codeInput = document.getElementById("codeInput").value;
  let tokenArray = tokenize(codeInput);
  displayTokenizedOutput(tokenArray);
}

function displayTokenizedOutput(tokenArray) {
  let symbolTable = new Map();
  let dmlPattern = /\b(SELECT|INSERT|UPDATE|DELETE)\b/i;
  let dmlCountMap = new Map();
  let dmlCount = 1;

  for (let token of tokenArray) {
    let tokenMatcher = dmlPattern.exec(token);
    if (tokenMatcher !== null) {
      let dmlToken = tokenMatcher[0].toUpperCase();
      if (!dmlCountMap.has(dmlToken)) {
        dmlCountMap.set(dmlToken, dmlCount++);
      }
      symbolTable.set(token, "<DML," + dmlCountMap.get(dmlToken) + ">");
    }
  }

  let tokensOutput = "";
  let hashTableOutput = "";

  for (let token of tokenArray) {
    if (symbolTable.has(token)) {
      tokensOutput += symbolTable.get(token) + " ";
    } else {
      tokensOutput += "<" + token + "> ";
    }
  }

  for (let [key, value] of symbolTable) {
    hashTableOutput += "Key: " + key + ", Value: " + value + "\n";
  }

  document.getElementById("outputSection1").textContent = tokensOutput;
  document.getElementById("outputSection2").textContent = hashTableOutput;
}
