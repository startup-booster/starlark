package ipc

import (
	"fmt"

	"github.com/zealic/go2node"
	"go.starlark.net/starlark"
	"go.starlark.net/starlarkstruct"
)

func read(thread *starlark.Thread, _ *starlark.Builtin, args starlark.Tuple, kwargs []starlark.Tuple) (starlark.Value, error) {
	if args != nil && args.Len() != 0 {
		return nil, fmt.Errorf("expected 0 argument, got %d", args.Len())
	}

	msg, err := NodeCommunicationChannel.Read()
	if err != nil {
		return nil, err
	}
	return starlark.String(msg.Message), nil
}

func write(thread *starlark.Thread, _ *starlark.Builtin, args starlark.Tuple, kwargs []starlark.Tuple) (starlark.Value, error) {
	if args == nil || args.Len() != 1 {
		return nil, fmt.Errorf("expected 1 argument, got %d", args.Len())
	}

	arg := args.Index(0)
	if arg.Type() != "string" {
		return nil, fmt.Errorf("expected argument to be a string, got %#v", arg.Type())
	}

	str := args.Index(0).(starlark.String).GoString()
	err := NodeCommunicationChannel.Write(&go2node.NodeMessage{
		Message: []byte(str),
	})
	return starlark.None, err
}

func call(thread *starlark.Thread, _ *starlark.Builtin, args starlark.Tuple, kwargs []starlark.Tuple) (starlark.Value, error) {
	_, err := write(thread, nil, args, kwargs)
	if err != nil {
		fmt.Println("ERROR!")
		return nil, err
	}
	return read(thread, nil, starlark.Tuple{}, []starlark.Tuple{})
}

var Module = &starlarkstruct.Module{
	Name: "ipc",
	Members: starlark.StringDict{
		"call": starlark.NewBuiltin("ipc.call", call),
	},
}
