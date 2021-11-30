import React, { useState } from "react";
import "./App.css";
import {
  checkPalindromeForAllDateFormats,
  getDateAsString,
  getNextPalindromeDate,
  getPreviousPalindromeDate,
} from "./date";

function App() {
  const [datee, setDate] = useState("");
  const [result, setResult] = useState("");
  const [pos, setPos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (datee !== "") {
      var date = datee.split("-");
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];

      date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy),
      };

      var dateStr = getDateAsString(date);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;

      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }

      if (!isPalindrome) {
        const [ctr1, nextDate] = getNextPalindromeDate(date);
        const [ctr2, prevDate] = getPreviousPalindromeDate(date);

        if (ctr1 > ctr2) {
          setResult(
            `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`
          );
          setPos(false);
        } else {
          setResult(
            `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`
          );
          setPos(false);
        }
      } else {
        setResult("Yay! Your birthday is palindrome!");
        setPos(true);
      }
    }
  };

  return (
    <div className="App">
      <h1>Palindrome Birthday!</h1>
      <h4>Enter your Birthday date</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={datee}
        />
        <button onClick={handleSubmit}>Show</button>
      </form>
      <h3 className={`result ${pos ? "font" : ""}`}>{pos ? result.toLocaleUpperCase() : result}</h3>
      <a href="https://github.com/jagdishsaini90/pailndrome-birthday">find this repo at Github</a>
    </div>
  );
}

export default App;
