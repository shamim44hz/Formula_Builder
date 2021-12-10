import "./styles.css";
import "./Formula";
import "./second";

export default function App() {
  // let formula =
  //   " ( ( SUM Category_Level_1 WHERE Category_Level_3 = AMC - Audio/ Video Equipment ) / ( COUNT Tgt_Create_Date ) ) x ( SUM Category_Level_3 WHERE Category_Level_3 = Allied Services,AMC - NE,Background Check Services ) ";
  // let formula =
  //   " COUNT ( Category_Level_1 WHERE Major_City = Aliso Viejo,Anaheim,Amsterdam ) / SUM ( TCV WHERE Contract_Name = CNTRNM1003,CNTRNM1000 ) x 100 ";

  let formula =
    " COUNT Category_Level_1 WHERE Major_City = Aliso Viejo,Anaheim,Amsterdam / SUM TCV WHERE Contract_Name = CNTRNM1003,CNTRNM1000  ";
  let aggr = ["SUM", "COUNT", "AVG", "NULL"];
  let formulaPieces = formula.split(" ");
  let count = 0;
  let formulaCount = 0;

  let select = ""; // for the select part in the json
  let stack = []; // to handle the '(' and ')' brackets
  let combiner = []; // to get all the formulaPieces other than brackets
  let partialQueries = []; // its used to combine the pieces to a formula

  const handlePartialFormula = (formula) => {
    const splittedFormula = formula.split(" ");
    const splitWhere = formula.split("WHERE");
    const formulaHere = splitWhere[0]
      .split(" ")
      .slice(2)
      .filter((item) => item !== "")
      .join(" ");
    // console.log("Line 26", formulaHere)
    let aggregateFunction = "";
    let whereCondition = null;
    for (let i of splittedFormula) {
      if (aggr.includes(i)) {
        aggregateFunction = i;
        break;
      }
    }
    const assignerDict = {
      "=": "in",
      "<>": "not in",
      "<": "<",
      ">": ">",
      ">=": ">=",
      "<=": "<="
    };
    let arr = [];
    let operators;
    let concatenator;
    let elements;

    /**
     * Following code executes if there is where condition
     */
    // console.log("splitwhere--", splitWhere);
    if (splitWhere.length > 1) {
      console.log(splitWhere[splitWhere.length - 1]);
      arr = splitWhere[splitWhere.length - 1]
        .split(" ")
        .filter((item) => item !== "");
      // console.log("arr", arr, arr.length);
      let noOfElements = arr[arr.length - 1].split(",");
      // console.log("noOfElements-", noOfElements);
      if (noOfElements.length > 1) {
        for (let i = 0; i < arr.length; i++) {
          if (Object.keys(assignerDict).includes(arr[i])) {
            operators = splitWhere[1].split(arr[i]);
            elements = operators[1].split(",").map((item) => item.trim(" "));
            arr[i] = assignerDict[arr[i]];
            concatenator = arr[i];
            break;
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (Object.keys(assignerDict).includes(arr[i])) {
            operators = splitWhere[1].split(arr[i]);
            elements = operators[1].split(",").map((item) => item.trim(" "));
            concatenator = arr[i];
            break;
          }
        }
      }
      let str = "(";

      for (let i = 0; i < elements.length; i++) {
        str += `'${elements[i]}'`;
        if (i !== elements.length - 1) str += ", ";
      }
      str += ")";

      whereCondition = operators[0].trim("") + ` ${concatenator} ` + str;
    }

    // console.log("WHere condition:-", whereCondition)
  };

  const handleTypeOne = () => {
    let i = 0;
    while (i < formulaPieces.length) {
      if (formulaPieces[i] === "(") {
        // stack.push("(");
        select += "( ";
        i += 1;
      } else if (formulaPieces[i] === ")") {
        // stack.pop();
        formulaCount += 1;
        select += `part_${formulaCount} )`;
        partialQueries.push(combiner);
        combiner = [];
        if (formulaPieces[i + 1] === "/") {
          select += "/";
          i += 1;
        } else {
          while (i < formulaPieces.length - 1) {
            select += `${formulaPieces[i + 1]} `;
            i += 1;
            if (formulaPieces[i + 1] === "(") break;
          }
        }
      } else {
        combiner.push(`${formulaPieces[i]} `);
        i += 1;
      }
    }
    // console.log(formulaPieces);
    // console.log("select = ", select);
    // console.log(partialQueries);
  };

  for (let i of formulaPieces) {
    if (aggr.includes(i)) count += 1;
  }
  if (count > 1) handleTypeOne();

  for (let item of partialQueries) {
    item = item.slice(1);
    // console.log(item.join(" "));
    // handlePartialFormula(item.join(" "));
  }
  // console.log(count);
  return (
    <div className="App">
      <h1>Swasti Kataruka</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
