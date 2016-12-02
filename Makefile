GIT_HASH=$(shell git rev-parse --short HEAD)

install:
	docker run -i --rm --name install -v `pwd`:/usr/src/app -w /usr/src/app node:6 npm install

run: install
	docker-compose down
	docker-compose up

bash:
	docker run -it --rm -v `pwd`:/usr/src/app -w /usr/src/app --entrypoint="bash" node:6

haha:
	$(info ************  $(GIT_HASH) ************)
