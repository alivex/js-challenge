import _ from "lodash";
import Dimensions from "./dimensions";

class Assessment {
  constructor() {
    this.questions = null;
    this.results = null;
  }

  // Generate 30 questions
  generateAssessment() {
    this.questions = _.shuffle(this.getCombinations(Dimensions, 2));
  }

  // mapping into 2 elements per question, selected randomly
  getCombinations(array, size) {
    function c(left, right) {
      function getQuestion({ name, answers }) {
        var random;
        do {
          random = answers[Math.floor(Math.random() * answers.length)];
        } while (taken.get(name).has(random));
        taken.get(name).add(random);
        return { dimension: name, answer: random };
      }

      left.forEach((v, i, a) => {
        var temp = [...right, v];
        if (temp.length === size) {
          result.push(temp.map(getQuestion));
        } else {
          c([...a.slice(0, i), ...a.slice(i + 1)], temp);
        }
      });
    }

    var result = [],
      taken = new Map(array.map(({ name }) => [name, new Set()]));

    c(array, {});
    return result;
  }

  // Generate results based on Answers
  generateResults(answers) {
    var result = answers.reduce(
      (acc, o) => ((acc[o.dimension] = (acc[o.dimension] || 0) + 1), acc),
      {}
    );

    this.results = result;
  }
}

export default Assessment;
