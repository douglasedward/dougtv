FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /bin/presence ./services/realtime/presence/cmd/presence

FROM alpine:3.19
COPY --from=builder /bin/presence /presence
ENTRYPOINT ["/presence"]
