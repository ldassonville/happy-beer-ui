IS_LINUX=$(shell sed --version > /dev/null 2> /dev/null && echo $$?)
ifeq ($(IS_LINUX),0)
	SED_IN_PLACE=-i
else
	SED_IN_PLACE=-i ""
endif

CONTAINER_TOOL ?= docker
SHELL:=/bin/bash -e
IMG ?= happy-beer-ui:latest
NAMESPACE ?= happy-beer
DEPLOYMENT_NAME ?= happy-beer-ui


.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage


.PHONY: check
check:
	@which node || (echo 'ERROR: Missing nodejs ( node 6 required, install from https://github.com/creationix/nvm or https://nodejs.org )' && false)
	@which ng || (echo 'ERROR: Missing angular cli ( npm install -g @angular/cli )' && false)

.PHONY: init
init: check
	npm install

.PHONY: build
build: init
	npm run build

.PHONY: docker-build
docker-build: build # Build the docker image
	@which docker || (echo 'ERROR: Missing docker ( apt-get install -y docker )' && false)
	$(CONTAINER_TOOL)  build -t ${IMG} .

.PHONY: 
docker-load: docker-build # Load the docker image in the local cluster
	kind load docker-image ${IMG}

.PHONY:
deploy: docker-load # Install the deployment in the cluster
	helm install  --create-namespace -n ${NAMESPACE} happy-beer-ui	 ./chart
