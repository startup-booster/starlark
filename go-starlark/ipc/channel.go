package ipc

import (
	"github.com/zealic/go2node"
)

var NodeCommunicationChannel go2node.NodeChannel

func InitNodeCommunication() error {
	channel, err := go2node.RunAsNodeChild()
	if err != nil {
		return err
	}
	NodeCommunicationChannel = channel
	return nil
}
