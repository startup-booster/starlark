print('b', ipc.call('{ "message": "testPrint", "payload": ["hello"] }'))


def k8s_resource(x):
    ipc.call(json.encode({message: k8s_resource, payload: x}))
