## api versions

api could have different versions, v1, v2, mock, offline, etc, but they all share the same interface of the api, event they may vary from some other prospects.

```js
nscAPI.inteface([{
  group: 'project',
  name: 'getProject'
}])

nscAPI.version('v1', [{
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
```

You can easily define another version of api, inside of which, you can invoke any other version of api to achieve a mixed api version.

All the versions of api can be easily inspected.

```js
nscAPI.intercept({ version: 'v1', group: 'project', name: 'getProject' }, {
  beforeRequestSend,
  onRequestError,
  onResponse,
  onResponseError
})

nscAPI.v1 // this is actually an instance of axios
nscAPI.v1.interceptors.request.eject(...)
```
