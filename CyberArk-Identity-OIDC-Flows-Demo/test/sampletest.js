const assert = require('assert');

describe("New Test",() => {
	before(() => {
	console.log("Test initialization");
	});
	after(() => {
	console.log("Post Test Execution");
	});
});

describe("New Test",() => {
	beforeEach(() => {
	console.log("Each Test initialization");
	});
	it("Sample test case",() => {
		assert.equal(4+4,8);
	});
});

