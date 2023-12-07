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

  let tokensOutput = "";

  for (let token of tokenArray) {
    let tokenMatcher = dmlPattern.exec(token);
    if (tokenMatcher !== null) {
      let dmlToken = tokenMatcher[0].toUpperCase();
      if (!dmlCountMap.has(dmlToken)) {
        dmlCountMap.set(dmlToken, dmlCount++);
      }
      let dmlKey = "<DML," + dmlCountMap.get(dmlToken) + ">";
      symbolTable.set(dmlToken, dmlKey);
      tokensOutput += symbolTable.get(dmlToken) + " ";
    } else if (symbolTable.has(token)) {
      tokensOutput += symbolTable.get(token) + " ";
    } else {
      tokensOutput += "<" + token + "> ";
    }
  }

  let outputSection1 = document.getElementById("outputSection1");
  outputSection1.textContent = tokensOutput;

  let hashTableBody = document.getElementById("hashTableBody");
  hashTableBody.innerHTML = ""; // Clear previous content

  for (let [key, value] of symbolTable) {
    let row = document.createElement("tr");
    let keyCell = document.createElement("td");
    let valueCell = document.createElement("td");

    keyCell.textContent = key;
    valueCell.textContent = value;

    row.appendChild(keyCell);
    row.appendChild(valueCell);

    hashTableBody.appendChild(row);
  }
}
