import { Observable, Observer } from "rxjs";
import { constants } from "../../constants";
import { loaderObservable, logoutSubscriber } from "../subscriber";
 const requestMethod = {
  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  DELETE : "DELETE",
}

const fetchCall = (
  url,
  method,
  data = {},
  // header?: any,
  isFormData= false,
  isLocalCall= false
) => {
  let options = {
    method: method,
    // mode: "cors",
    // headers: {},
  };
  // if (method !== requestMethod.GET) {
  //   options = {
  //     ...options,
  //     body: isFormData ? data : JSON.stringify(data),
  //   };
  // }
  // if (localStorage.getItem("id") && localStorage.getItem("token")) {
  //   options.headers["Host"] = window.origin;
  //   options.headers["x-auth-token"] = JSON.parse(
  //     localStorage.getItem("token") || ""
  //   );
  //   options.headers["x-userid"] = JSON.parse(localStorage.getItem("id") || "");
  //   options.headers["authorization"] = JSON.parse(
  //     localStorage.getItem("token") || ""
  //   );
  // }

  return Observable.create((observer) => {
    try {
      loaderObservable.next(true);
      const finalUrl = isLocalCall ? url : url;
      fetch(finalUrl, options)
        .then((res) => {
      
          return res.json();;
        })
        .then((body) => {
          observer.next(body);
          loaderObservable.next(false);
          if (isLocalCall) {
            observer.next(body);
            observer.complete();
            return;
          }
          if (body instanceof Blob) {
            observer.next(body);
            observer.complete();
            return;
          }
          switch (body.statusCode) {
            case 200:
              observer.next(body);
              observer.complete();
              break;
            case 401:
            case 403:
              logoutSubscriber.next(true);
              observer.error(body);
              break;
            default:
              observer.error(body);
              break;
          }
        })
        .catch((err) => {
          observer.error(err);
          loaderObservable.next(false);
        });
    } catch (error) {
      loaderObservable.error(false);
      observer.error(error);
    }
  });
};

export { fetchCall, requestMethod };
