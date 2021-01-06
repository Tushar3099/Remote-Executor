class ValidationService {
  async execute(code, input, lang, id) {
    // console.log("validating");
    switch (lang) {
      case "javascript": {
        let words = ["require(", "exports.", "module.exports"];
        // prevent imports
        var valid = !words.some((el) => {
          return code.includes(el);
        });
        return {
          isValid: valid,
          message: "You have unacceptable libs imported",
        };
      }
      case "python": {
        let reg1 = RegExp(
          /\bimport\W+(?:\w+\W+){0,}(?:os|subprocess|importlib)\b/g
        );
        words = ["open("];

        if (code.match(reg1)) {
          return {
            isValid: false,
            message: "You have unacceptable libs imported",
          };
        } else if (
<<<<<<< HEAD
          words.every((el) => code.toLowerCase().includes(el.toLowerCase()))
=======
          !words.every(el => code.toLowerCase().includes(el.toLowerCase()))
>>>>>>> 8ba1999345de29ac621848df532983f857213ca7
        ) {
          return {
            isValid: false,
            message: "You have unacceptable libs imported",
          };
        }
        return {
          isValid: true,
        };
      }
      case "java": {
        return {
          isValid: true,
        };
      }
      case "cpp": {
        return {
          isValid: true,
        };
      }
      case "c": {
        return {
          isValid: true,
        };
      }
      default: {
        return {
          isValid: false,
          message: "Please select a valid language",
        };
      }
    }
  }
}

export default new ValidationService();
