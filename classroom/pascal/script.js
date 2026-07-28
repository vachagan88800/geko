const rows = 17;

const triangle = document.getElementById("triangle");

let previousRow = [];

for (let i = 0; i < rows; i++) {

    const row = [];
    const rowDiv = document.createElement("div");

    rowDiv.className = "row";

    for (let j = 0; j <= i; j++) {

        if (j === 0 || j === i) {
            row.push(1);
        } else {
            row.push(previousRow[j - 1] + previousRow[j]);
        }

        const hex = document.createElement("div");
        hex.className = "hex";
        hex.textContent = row[j];

        rowDiv.appendChild(hex);
    }

    previousRow = row;
    triangle.appendChild(rowDiv);
}