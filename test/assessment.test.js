import Assessment from "../src/assessment";

// Feel free to rewrite this test suite. This is provided as guidance.
describe("The Assessment", () => {
  let assessment = new Assessment();

  assessment.generateAssessment();

  const questions = assessment.questions;

  describe("The questions", () => {
    it("should have 30 questions", () => {
      expect(questions).toHaveLength(30);
    });
    it("should not show the same answer twice", () => {
      // we insert each and every object's question into the Set and we check if the size
      // before and after adding are the same. This works because Set.size returns a
      // number based on unique data (set only adds entries if the data is unique)
      let seen = new Set();

      var hasDuplicates;

      questions.forEach(q => {
        q.map(({ answer }) => {
          return (hasDuplicates =
            seen.size === seen.add(answer).size ? true : false);
        });
      });

      expect(hasDuplicates).toBeFalsy();
    });

    it("should match each dimension to the other dimensions exactly 2 times", () => {

      let seen = new Set();
      var hasMore = 0;

      questions.forEach(q => {
        var a = [];
        q.map(({ dimension }) => {
          a.push(dimension);
        });

        var serial = a.sort().join();

        if (seen.size === seen.add(serial).size) {
          hasMore++;
          if (hasMore == 2) {
            return (hasMore = 3);
          } else {
            hasMore = 1;
          }
        }
        return hasMore;
      });

      expect(hasMore).toBeLessThan(2);
    });

    it("should provide ipsative questions (two possible answers)", () => {
      questions.forEach(q => {
        expect(q).toHaveLength(2);
      });
    });
  });

  describe("when completed", () => {
    // Simulate picking answers randomly
    let answers = [];
    questions.forEach(q => {
      answers.push(q[Math.floor(Math.random() * q.length)]);
    });

    // Getting the results
    assessment.generateResults(answers);

    const results = assessment.results;

    it("should provide results as Object", () => {
      expect(typeof results).toBe("object");
    });

    it("should represent the results based on 6 dimensions, with valid score as number", () => {
      expect(results).toEqual(
        expect.objectContaining({
          Adaptive: expect.any(Number),
          Integrity: expect.any(Number),
          Collaborative: expect.any(Number),
          Result: expect.any(Number),
          Customer: expect.any(Number),
          Detail: expect.any(Number)
        })
      );
    });
  });
});
