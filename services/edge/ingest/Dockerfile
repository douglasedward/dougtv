FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /bin/ingest ./services/edge/ingest/cmd/ingest

FROM alpine:3.19
COPY --from=builder /bin/ingest /ingest
ENTRYPOINT ["/ingest"]
