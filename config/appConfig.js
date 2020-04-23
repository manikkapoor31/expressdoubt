let appConfig={}

appConfig.port=3000//port has to be 4 digits
appConfig.allowedCorsOrigin="*";
appConfig.env="dev"
appConfig.db={
    uri: 'mongodb://test:test@127.0.0.1:27017/blogAppDB'
}
appConfig.apiVersion='/api/v1';
module.exports={

}