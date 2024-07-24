const mainFunc = () => {
  try {
    // contains code bloack which you are 100% sure that might throws an exception or any kind of error
    let res = RiskyFunction();
    console.log(res);
  } catch (error) {
    // Contains code block which actually handles the error
    console.log("Error !!");
  }
};

//Example risky functions
const RiskyFunction = () => {
  let a = 9;
  return a;
};

mainFunc();
