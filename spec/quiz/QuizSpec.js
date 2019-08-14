describe("Quiz", function() {
    fs = require('fs');
    myCode = fs.readFileSync('../../../../app.js','utf-8'); // depends on the file encoding
    eval(myCode);

    it("will store employee in quizEmployees array", function() {
        const allEmployees = [
            { name: "Bob", img: "Bob.img" }
        ];
        const departmentForQuiz = 'All';
        storeEmployeesByDepartment();
        expect(quizEmployees).toEqual(allEmployees);
    });
});
  