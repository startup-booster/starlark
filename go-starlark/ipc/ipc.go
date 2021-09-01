package ipc

import (
	"fmt"

	"go.starlark.net/starlark"
	"go.starlark.net/starlarkstruct"
)

func testPrint(thread *starlark.Thread, fn *starlark.Builtin, args starlark.Tuple, kwargs []starlark.Tuple) (starlark.Value, error) {
	fmt.Printf("Hello %#v\n", args[0])

	return starlark.String(fmt.Sprintf("Goodbye %#v!", args[0])), nil
}

var Module = &starlarkstruct.Module{
	Name: "ipc",
	Members: starlark.StringDict{
		"testPrint": starlark.NewBuiltin("ipc.testPrint", testPrint),
	},
}
