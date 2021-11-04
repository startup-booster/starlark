package ipc

import (
	"github.com/zealic/go2node"
	"go.starlark.net/starlark"

	"go.starlark.net/lib/json"
)

var jsonEncode = json.Module.Members["encode"].(*starlark.Builtin)
var jsonDecode = json.Module.Members["decode"].(*starlark.Builtin)

func call(thread *starlark.Thread, _ *starlark.Builtin, args starlark.Tuple, kwargs []starlark.Tuple) (starlark.Value, error) {
	jsonValue, err := jsonEncode.CallInternal(thread, args, kwargs)
	if err != nil {
		return nil, err
	}

	jsonString := jsonValue.(starlark.String).GoString()
	err = NodeCommunicationChannel.Write(&go2node.NodeMessage{
		Message: []byte(jsonString),
	})
	if err != nil {
		return nil, err
	}

	response, err := NodeCommunicationChannel.Read()
	if err != nil {
		return nil, err
	}

	decoded, err := jsonDecode.CallInternal(thread, starlark.Tuple{starlark.String(response.Message)}, []starlark.Tuple{})
	if err != nil {
		return nil, err
	}

	return decoded, nil
}

var IpcCallBuiltin = starlark.NewBuiltin("__nodejs_ipc_call__", call)
