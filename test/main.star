
def __ipc_wrapper__(name):
    def call(payload):
        result = __nodejs_ipc_call__({
            "message": name,
            "payload": payload,
        })
        if 'error' in result:
            print('Error from IPC call: ', result['error'])
        return result.get('response', None)
    return call


k8s_resource = __ipc_wrapper__('k8s_resource')

k8s_resource('pod.yaml')
print(k8s_resource('pod.yaml'))
