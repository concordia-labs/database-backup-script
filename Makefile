setup:
	npm i

run:
	node src/index.js

clear-logs:
	rm -rf logs/*

clear-dumps:
	rm -rf dumps/*

clear-all:
	rm -rf logs/*
	rm -rf dumps/*