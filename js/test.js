describe("Таймер", function() {
    it("Return obj", function() {
        assert.typeOf(getTimeRemaining(), 'object')
    });

    describe("Total", function() {
        it("Null", function() {
            assert.equal(total, 0)
        })
    })
});
