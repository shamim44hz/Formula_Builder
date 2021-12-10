export const inputFields = [
  {
    id: "5c905cde-1df2-471e-9f72-1f61ade1c574",
    value: " ( ",
    componentType: "(",
    operator: "(",
    isHover: false,
    addButton: false
  },
  {
    id: "d20906c8-5c4a-4d27-b295-e87ced2be595",
    value: " ( ",
    componentType: "(",
    operator: "(",
    isHover: false,
    addButton: false
  },
  {
    id: "1a764b9d-f870-4359-9cb3-46c1693d91dc",
    value: "COUNT",
    componentType: "AGGR",
    operator: "AGGR",
    isHover: false,
    addButton: false
  },
  {
    id: "3e5b2ea9-00e4-45c1-a69a-3be5d5ff145b",
    value: "County",
    componentType: "CH",
    operator: "CH",
    isHover: false,
    addButton: false
  },
  {
    id: "ee1911c6-b48b-4a4c-85d3-b85956f88ef4",
    value: " WHERE ",
    componentType: "WHERE",
    operator: "WHERE",
    isHover: false,
    addButton: false
  },
  {
    id: "6eba776b-710a-49ac-892d-2899a6acecc9",
    value: "State",
    componentType: "CH",
    operator: "CH",
    isHover: false,
    addButton: false
  },
  {
    id: "ee7f37b4-60e8-40b1-9599-4d4ed7b735a9",
    value: "=",
    componentType: "Comparator",
    operator: "Comparator",
    isHover: false,
    addButton: false
  },
  {
    id: "7dd40cff-44c3-40e8-95d7-77edc843a2db",
    value: ["CA", "FL", "CT"],
    componentType: "Categorical",
    operator: "Categorical",
    isHover: false,
    addButton: false
  },
  {
    id: "7d582323-27b9-405e-b5b3-10d0b95537a6",
    value: "",
    componentType: "AND",
    operator: "AND",
    isHover: false,
    addButton: false
  },
  {
    id: "7b4e9c4f-d5b0-47f0-8a54-cc64a834a17f",
    value: " ) ",
    componentType: ")",
    operator: ")",
    isHover: false,
    addButton: false
  },
  {
    id: "6747a822-0065-405e-bba3-55d0a717dc95",
    value: "/",
    componentType: "MATH",
    operator: "MATH",
    isHover: false,
    addButton: false
  },
  {
    id: "d891c7f1-823d-48d2-bdbe-8e8146f86711",
    value: " ( ",
    componentType: "(",
    operator: "(",
    isHover: false,
    addButton: false
  },
  {
    id: "2054db90-dce0-4720-a7b5-168cec48a0e8",
    value: "AVG",
    componentType: "AGGR",
    operator: "AGGR",
    isHover: false,
    addButton: false
  },
  {
    id: "09de36f6-eb3c-44d0-a3ac-c2c5aac2ba21",
    value: "Vendor",
    componentType: "CH",
    operator: "CH",
    isHover: false,
    addButton: false
  },
  {
    id: "e4e1b346-0278-429b-a722-27e7ed93aeed",
    value: " ) ",
    componentType: ")",
    operator: ")",
    isHover: false,
    addButton: false
  },
  {
    id: "5b0f7346-9636-4fa3-ab4b-d1fefcb2e6f7",
    value: "x",
    componentType: "MATH",
    operator: "MATH",
    isHover: false,
    addButton: false
  },
  {
    id: "b3edeb9c-45f7-4e74-acac-624a5eef204f",
    value: "2000",
    componentType: "CONST",
    operator: "CONST",
    isHover: false,
    addButton: false
  },
  {
    id: "31376108-4930-4a04-ae76-c80e1fc85693",
    value: " ) ",
    componentType: ")",
    operator: ")",
    isHover: false,
    addButton: false
  },
  {
    id: "7e708a96-7888-4ddf-8e36-b9840be4c80f",
    value: " WHERE ",
    componentType: "WHERE",
    operator: "WHERE",
    isHover: false,
    addButton: false
  },
  {
    id: "6dca44f0-a8e7-4cf4-8bdb-33e2c2691165",
    value: "Country",
    componentType: "CH",
    operator: "CH",
    isHover: false
  },
  {
    id: "2cacb832-c255-4ca5-bd8b-3cc1a15bd0a2",
    value: "<>",
    componentType: "Comparator",
    operator: "Comparator",
    isHover: false
  },
  {
    id: "0eaac380-45a9-4726-9d30-e6ef975e0d03",
    value: ["USA"],
    componentType: "Categorical",
    operator: "Categorical",
    isHover: false
  }
];

const matcher = {
  "=": "in",
  "<>": "not in"
};

let stack = [];
let mathOperators = ["/", "+", "-", "x"];
let index = [];

const handleWhere = (afterWhere) => {
  console.log(afterWhere);
  let copiedArr = afterWhere;
  for (let i = 0; i < copiedArr.length; i++) {
    if (Array.isArray(copiedArr[i]) === true) {
      copiedArr[i - 1] = matcher[copiedArr[i - 1]];
      let emptyStr = "( ";
      for (let j = 0; j < copiedArr[i].length; j++) {
        if (j !== copiedArr[i].length - 1) emptyStr += `'${copiedArr[i][j]}', `;
        else emptyStr += `'${copiedArr[i][j]}' `;
      }
      emptyStr += ")";
      copiedArr[i] = emptyStr;
    } else if (copiedArr[i] === " ( " && index.length === 0) stack.push("(");
    else if (copiedArr[i] === " ) " && stack.length !== 0) stack.pop();
    else if (
      mathOperators.includes(copiedArr[i]) ||
      copiedArr[i] === " ( " ||
      (copiedArr[i] === " ) " && stack.length === 0)
    ) {
      // console.log(i);
      index.push(i);
    }
    copiedArr = copiedArr.filter(
      (item) => !index.includes(copiedArr.indexOf(item))
    );
    // console.log(copiedArr)
  }
  // console.log("Index", index);
  // console.log(copiedArr.join(" "));
  return copiedArr.join(" ");
};

let formulaObjects = [];
let demoObject = {
  select: ["1 as join_key", "COUNT(SRN) as tot_count"], // 1 as join_key" DEFAULT
  group_by: ["join_key"], //DEFAULT
  where: ["PM_or_BD_Call = 'BD' and Status in ('Closed', 'Completed')"],
  from: {}, //DEFAULT
  left_join: true //DEFAULT
};
let myObject = { ...demoObject };

let item = 0;
let counter = 0;

// ( ( COUNT County WHERE State = CA,FL,CT ) / ( AVG Vendor ) x 2000 ) WHERE Country <> USA

while (item < inputFields.length) {
  let beforeWhere = [];
  let afterWhere = [];
  if (inputFields[item].operator === "AGGR") {
    while (inputFields[item].operator !== "WHERE") {
      beforeWhere.push(inputFields[item].value);
      item += 1;
      if (inputFields[item].operator === ")") break;
    }
    while (
      inputFields[item].operator !== ")" &&
      item < inputFields.length - 1
    ) {
      afterWhere.push(inputFields[item].value);
      item += 1;
    }
    // console.log(beforeWhere.join(" "))
    // console.log(beforeWhere.slice(0,2).join(" "))
    console.log("Before", beforeWhere);
    console.log("AFter", afterWhere);
    myObject.select[1] = beforeWhere.slice(0, 2).join(" ");

    let whereResponse = handleWhere(afterWhere);
    // console.log(whereResponse);
    myObject.where = [whereResponse];
    formulaObjects.push(myObject);
    myObject = { ...demoObject };
    // console.log("Before Where:-", beforeWhere);
    // console.log("After Where", afterWhere);
  } else item += 1;
}

// console.log(formulaObjects);

/**
 * @Distingiuising_brackets
 *  */

// let bracketTracker = [];
// let stackArr = [];
// // (A / b)

// let i = 0;

// // console.log(inputFields.length)

// while (i < inputFields.length) {
//   if (
//     inputFields[i].operator === "(" &&
//     inputFields[i + 1].operator === "AGGR"
//   ) {
//     stackArr.push("(");
//     bracketTracker.push("(");
//     i += 1;
//   } else if (inputFields[i].operator === ")" && stackArr.length > 0) {
//     let mathStore;
//     while (i < inputFields.length) {
//       if (
//         inputFields[i].operator === "MATH" ||
//         inputFields[i].operator === "(" ||
//         inputFields[i].operator === ")"
//       ) {
//         if (inputFields[i].operator === "MATH")
//           mathStore = inputFields[i].operator;

//         if (inputFields[i].operator === "AGGR") {
//           stackArr.pop();
//           bracketTracker.push(mathStore);
//           bracketTracker.push(")");
//           break;
//         }
//         i += 1;
//       } else break;
//     }
//     i += 1;
//   } else {
//     i += 1;
//   }
// }

// // console.log(bracketTracker);

/**
 * 1. AGGR -> Opening bracket compulsory
 * 2. After opening bracket closing bracket is compulsory before starting an AGGR
 * 3. Bracket would open only with AGGR
 */

// Experiment
// let demoArr = [];
// for (let item of inputFields) {
//   if (
//     item.operator === "MATH" ||
//     item.operator === "(" ||
//     item.operator === ")"
//   ) {
//     demoArr.push(item.value);
//   }
// }

// console.log(demoArr.join(" "));
//
