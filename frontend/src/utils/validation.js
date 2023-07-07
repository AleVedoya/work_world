
const validation = (values) => {
    let errors = {}

    if(!values.email){
        errors.email = "llenar el campo correo"
    }
    else if (!values.email.includes("@")){
        errors.email = "Email should contain @"
    }

    if(!values.password){
        errors.password = "llenar el campo contraseña"
    }


    return errors;

}

export default validation;