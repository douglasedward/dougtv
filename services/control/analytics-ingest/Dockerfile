FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /bin/analytics-ingest ./services/control/analytics-ingest/cmd/analytics-ingest

FROM alpine:3.19
COPY --from=builder /bin/analytics-ingest /analytics-ingest
ENTRYPOINT ["/analytics-ingest"]
