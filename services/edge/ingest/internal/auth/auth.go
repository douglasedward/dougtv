package auth

import "errors"

// ValidateStreamKey checks that the provided key is authorised to publish.
// Real implementation will query the channel service.
func ValidateStreamKey(key string) error {
	if key == "" {
		return errors.New("stream key required")
	}
	return nil
}
