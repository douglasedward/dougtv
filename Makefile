.PHONY: help lint test build fmt cluster-up cluster-down observability deploy smoke clean

CLUSTER := dougtv
REGISTRY := k3d-dougtv-registry:5000

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

fmt: ## Format everything
	pnpm format
	go fmt ./...

lint: ## Lint everything
	pnpm lint
	go vet ./...

test: ## Run all tests
	go test ./... -race -count=1
	pnpm test

build: ## Build all workspace packages
	pnpm build
	go build ./...

cluster-up: ## Create the local k3d cluster
	k3d cluster create --config infra/k3d/cluster.yaml

cluster-down: ## Delete the local k3d cluster
	k3d cluster delete $(CLUSTER)

observability: ## Install the observability stack into the cluster
	./infra/observability/install.sh

deploy: ## Build, import and deploy ws-gateway to the local cluster
	docker build -f services/edge/ws-gateway/Dockerfile -t $(REGISTRY)/ws-gateway:dev .
	k3d image import $(REGISTRY)/ws-gateway:dev -c $(CLUSTER)
	kubectl apply -k infra/k8s/services/ws-gateway
	kubectl -n dougtv rollout status deploy/ws-gateway --timeout=90s

smoke: ## Assert the service is healthy and its traces reach Tempo
	./infra/observability/smoke-trace.sh

clean: ## Remove build artifacts
	rm -rf node_modules **/node_modules dist **/dist .turbo **/.turbo .next **/.next
