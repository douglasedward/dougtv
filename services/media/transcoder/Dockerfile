FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /bin/transcoder ./services/media/transcoder/cmd/transcoder

FROM alpine:3.19
COPY --from=builder /bin/transcoder /transcoder
ENTRYPOINT ["/transcoder"]
