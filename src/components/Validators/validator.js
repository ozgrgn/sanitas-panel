function emailValidator() {
  return function email(value) {
    return (
      (value &&
        !!value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) ||
      JSON.stringify({
        tr: "Lütfen geçerli bir email giriniz",
        en: "Please enter a valid email",
      })
    );
  };
}

function requiredValidator() {
  return function required(value) {
    return (
      (value !== undefined && value !== null && value !== "") ||
      JSON.stringify({
        tr: "Bu alan zorunlu",
        en: "This field is required",
      })
    );
  };
}

export { emailValidator, requiredValidator };
