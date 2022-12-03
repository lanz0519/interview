## 项目启动

1.用docker-compose启动，数据库之类的都配置好了

```javascript
docker-compose up
```



关于端口，默认占用3000


项目启动完成后访问loclhost:3000/index.html，应该能看到一个简单的前端界面，可以在此界面上体验api功能交互

## 文档

api文档采用api fox这款软件。

基本的功能、环境区分都有，并且可以导入导出Swagger格式和各种格式的api配置。

使用Swagger格式配合使用express-openapi-validator可以完成api接口的入参校验等功能，一举两得。

## 错误处理

日志方面使用express-winston+winston

两边的配置是一样的可以通用。

日志分为console、file、error

api请求会打印在console上，同样记录在file中，error日志会区分为单独的文件

## Test

1.直接运行

```
npm test
```

test使用ava + supertest，可以配合使用nyc进行代码覆盖测试比较方便

supertest可以建立独立的服务然后用来测试比较方便