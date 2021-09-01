package main

import (
	"log"
	"os"

	"github.com/startup-booster/starlark/go-starlark/ipc"

	"go.starlark.net/lib/json"
	"go.starlark.net/lib/math"
	"go.starlark.net/lib/time"

	"go.starlark.net/starlark"
)

func initThread() *starlark.Thread {
	thread := &starlark.Thread{
		Load: load,
	}

	starlark.Universe["json"] = json.Module
	starlark.Universe["time"] = time.Module
	starlark.Universe["math"] = math.Module
	starlark.Universe["__nodejs_ipc_call__"] = ipc.IpcCallBuiltin

	return thread
}

func load(t *starlark.Thread, path string) (starlark.StringDict, error) {
	// TODO: This is a very trivial loader - not fully compatible with Tilt's loader yet.
	return starlark.ExecFile(t, path, nil, nil)
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("usage: %s <script>", os.Args[0])
		os.Exit(1)
	}

	starfile := os.Args[1]

	err := ipc.InitNodeCommunication()
	if err != nil {
		panic(err)
	}

	thread := initThread()
	_, err = load(thread, starfile)
	if err != nil {
		log.Fatal(err)
	}
}
