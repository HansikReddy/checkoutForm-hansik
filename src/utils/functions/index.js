

export const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'fname':
        const regexName = /^[a-zA-Z\s]*$/
        return value && !regexName.test(value) ? 'Invalid first name' : ''
      case 'lname':
        const regexLname = /^[a-zA-Z\s]*$/
        return value && !regexLname.test(value) ? 'Invalid last name' : ''
      case 'mobile':
        const regexMobile = /^\+?[1-9][0-9]{7,14}$/
        return value && !regexMobile.test(value) ? 'Invalid mobile number' : ''
      case 'email':
        const regexEmail = /^\S+@\S+\.\S+$/
        return value && !regexEmail.test(value) ? 'Invalid email' : ''
      case 'address':
        const addressFeild = /^[a-zA-Z\s]*$/
        // const addressFeild = /^\d+\s+[a-zA-Z\s]+\s+\w{2,}(?:\s+\d{5})?$/
        return value && !addressFeild.test(value) ? 'Invalid address' : ''
      default:
        return ''
    }
  }

 
  