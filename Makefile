
init: node_modules
	npm install

build: test
	./node_modules/

test:
	@npm test

.PHONY: init build test publish
