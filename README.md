### concept

<version>.<group>.<name>

### define
```js
nscAPI.define('v1.user.simpleList', {
  method: 'get',
  url: `/v1/api/users?fields=id,name`
})
nscAPI.define('v2.product.create', product => ({
  method: 'post',
  url: `/v2/products`,
  data: product
}))
nscAPI.define('v3.user.get', function (args) {
  return nscAPI.v1.user.get(args)
})
nscAPI.define('offline.user.create', definition)
nscAPI.define('online.user.create', definition)
nscAPI.define('smart.user.create', function (args) {
  if (online) {
    return nscAPI.online.user.create(args)
  } else {
    return nscAPI.offline.user.create(args)
  }
})
nscAPI.define('smart.*.*', function (args, { group, name }) {
  const version = online ? nscAPI.online : nscAPI.offline
  return version[group][name](args)
})
```

### usage
```js
nscAPI.call('v1.user.get', options)

nscAPI('v1.user.get', options)
nscAPI('v2.product.create', options)
nscAPI.v1.user.get(options)

const { v1: v1API } = nscAPI
v1API.user.get(options)
```

### config
```js
myAPI.config('v1', config)
myAPI.config('v1.project', config)
myAPI.config('v1.project.get', config)
myAPI.config('mock', {
  baseUrl: 'http://mock.com'
})
myAPI.config('v1', {
  baseUrl: 'http://v1.com'
})
```

### intercept
```js
myAPI.intercept('v1', interceptor)
myAPI.intercept('v1.project', interceptor)
myAPI.intercept('v1.project.get', interceptor)
```


### multi instances
already has versions, no need to have different instances.