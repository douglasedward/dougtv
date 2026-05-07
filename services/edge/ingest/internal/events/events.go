package events

// Publisher emits domain events to the message bus.
// Real implementation will use a NATS JetStream client.
type Publisher struct{}

// StreamStarted publishes a stream.started event.
func (p *Publisher) StreamStarted(channelID, streamID string) error {
	return nil
}

// StreamEnded publishes a stream.ended event.
func (p *Publisher) StreamEnded(channelID, streamID string) error {
	return nil
}
