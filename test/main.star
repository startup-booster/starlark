load('test/k8s.star', 'k8s_resource')

k8s_resource('pod.yaml')
print(k8s_resource('pod.yaml'))
