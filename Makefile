.PHONY: start-dev
start-dev:
	docker compose -f docker/development/compose.yml up --build -d

.PHONY: stop-dev
stop-dev: ## Stop the development docker container.
	docker compose -f docker/development/compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/compose.yml down
