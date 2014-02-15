
describe('Catalyst', function() {
  describe('LinkedStateMixin', function() {
    it('should be defined', function() {
      expect(Catalyst.LinkedStateMixin).toBeDefined()
    })

    it('expose the #linkState method', function(done) {
      expect(Catalyst.LinkedStateMixin.linkState).toBeDefined()
    })
  })
})
