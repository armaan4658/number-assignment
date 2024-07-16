const express = require('express');
const dotenv = require('dotenv');
const helperFunctions = require("./utils/helperFunction");
const pool = require("./utils/db.config");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());





// API to process the number
app.post('/process-number', async (req, res) => {
  const { number } = req.body;

   // Validate the input
   if (!number  || !helperFunctions.isNumeric(number) || number < 1 || number > 25) {
    return res.status(400).send('Input must be a number between 1 and 25.');
  }


  const multipliedNumber = Number(number) * 7;
  let file = '';

  if (multipliedNumber > 140) {
    file = 'A';
  } else if (multipliedNumber > 100) {
    file = 'B';
  } else if (multipliedNumber > 60) {
    file = 'C';
  } else {
    file = 'D';
  }

  try {

    // Check if all files have entries
    const files = ['A', 'B', 'C', 'D'];
    const allFilesFilled = await Promise.all(
      files.map(async (f) => {
        const result = await pool.query('SELECT COUNT(*) FROM numbers WHERE file = $1', [f]);
        return parseInt(result.rows[0].count, 10) > 0;
      })
    );

    if (allFilesFilled.every(Boolean)) {
      return res.status(200).send('All files have entries. Process is complete.');
    }

    // Save the result to the database
    const result = await pool.query(
      'INSERT INTO numbers (input_number, multiplied_number, file) VALUES ($1, $2, $3) RETURNING *',
      [number, multipliedNumber, file]
    );

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error('Error processing number:', error);
    res.status(500).send('Server error');
  }
});

// API to list all numbers from all files
app.get('/list-numbers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM numbers ORDER BY id');
    if(!result.rows.length) return res.status(200).send("No data found");
    res.status(200).json({ data: result.rows});
  } catch (error) {
    console.error('Error listing numbers:', error);
    res.status(500).send('Server error');
  }
});

// API to delete all entries from the numbers table
app.delete('/delete-all-numbers', async (req, res) => {
    try {
      await pool.query('DELETE FROM numbers');
      res.status(200).send('All entries have been deleted.');
    } catch (error) {
      console.error('Error deleting entries:', error);
      res.status(500).send('Server error');
    }
  });

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
