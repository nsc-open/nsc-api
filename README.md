## api versions

api could have different versions, v1, v2, mock, offline, etc, but they all share the same interface of the api, event they may vary from some other prospects.

```js
const myAPI = nscAPI.create([{
  group: 'project',
  apis: ['', '']
}])

myAPI.version('v1', [{
  group: 'project',
  name: 'getProject', // or 'project.getProject'
  method: 'get',
  url: '/api/projects/:id'
}], {
  baseURL: '/',
  transformRequest,
  transformResponse (r) {
    return r.data.data
  },
  headers,
  ...otherAxiosOptions
})

myAPI.define('v1.project.get', implementation)
myAPI.define('mock.project.get', implementation)
myAPI.define('v2.project.get', function (args) {
  //return myAPI.v1.project.get()
  return this.axios({})
})

myAPI.config('v1', config)
myAPI.config('v1.project', config)
myAPI.config('v1.project.get', config)
myAPI.config('mock', {
  baseUrl: 'http://mock.com'
})
myAPI.config('v1', {
  baseUrl: 'http://v1.com'
})

myAPI.intercept('v1', interceptor')
myAPI.intercept('v1.project', interceptor')
myAPI.intercept('v1.project.get', interceptor')

myAPI.v1.project.get()
myAPI.mock.project.get()
```

You can easily define another version of api, inside of which, you can invoke any other version of api to achieve a mixed api version.

All the versions of api can be easily inspected.

```js
myAPI.intercept({ version: 'v1', group: 'project', name: 'getProject' }, {
  beforeRequestSend,
  onRequestError,
  onResponse,
  onResponseError
})

myAPI.v1 // this is actually an instance of axios
myAPI.v1.interceptors.request.eject(...)
```
