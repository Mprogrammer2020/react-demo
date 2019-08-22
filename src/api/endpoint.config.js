const configs = {
  development: {
    oauth: "https://oauth.taradtoryoddev.com/api",
    client_id: "2AKDQSU6RZ0YNC7YPAKATH76R",
    client_secret: "CJ6BTI9C1LQHKWZA0E6OLEIK2",
    erp: "https://api.taradtoryoddev.com/erp/v1",
    chat: "http://msg.taradtoryoddev.com:8802/api/v1"
  },
  test: {
    oauth: "https://oauth.taradtoryoddev.com/api",
    client_id: "2AKDQSU6RZ0YNC7YPAKATH76R",
    client_secret: "CJ6BTI9C1LQHKWZA0E6OLEIK2",
    erp: "https://api.taradtoryoddev.com/erp/v1",
    chat: "http://msg.taradtoryoddev.com:8802/api/v1"
  },
  production: {
    oauth: "https://oauth.taradtoryoddev.com/api",
    client_id: "2AKDQSU6RZ0YNC7YPAKATH76R",
    client_secret: "CJ6BTI9C1LQHKWZA0E6OLEIK2",
    erp: "https://api.taradtoryoddev.com/erp/v1",
    chat: "http://msg.taradtoryoddev.com:8802/api/v1"
  },
  getProudcts:{
    oauth: "https://api.taradtoryoddev.com/erp/v1",
    client_id: "2AKDQSU6RZ0YNC7YPAKATH76R",
    client_secret: "CJ6BTI9C1LQHKWZA0E6OLEIK2",
    erp: "https://api.taradtoryoddev.com/erp/v1",
    chat: "http://msg.taradtoryoddev.com:8802/api/v1"
  },
  

};

const env = process.env.NODE_ENV || "development";

export default configs[env];
