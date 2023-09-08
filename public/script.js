document.addEventListener('DOMContentLoaded', () => {
  fetchSudokuData();
});

async function fetchSudokuData() {
  try {
      const response = await fetch('/sudoku');
      const sudokuData = await response.json();
      populateSudokuTable(sudokuData);
  } catch (error) {
      console.error("Error fetching Sudoku data:", error);
  }
}

function populateSudokuTable(data) {
  const table = document.getElementById('sudoku-table');
  data.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
          const td = document.createElement('td');
          if (cell !== 0) {
              td.textContent = cell;
          } else {
              const input = document.createElement('input');
              input.setAttribute('maxlength', '1');
              input.addEventListener('input', (e) => {
                  if (!/^[1-9]$/.test(e.target.value)) {
                      e.target.value = '';
                  }
              });
              td.appendChild(input);
          }
          tr.appendChild(td);
      });
      table.appendChild(tr);
  });
}
