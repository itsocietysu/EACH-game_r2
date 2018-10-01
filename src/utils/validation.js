export const validation = {
    name:{
        presence:{
            message: 'Please, enter your name'
        },
        format:{
            pattern: '',
            message: '',
        }
    },
    username:{
        presence:{
            message: 'Please, enter your name'
        },
        format:{
            pattern: '',
            message: '',
        }
    },
    password:{
        presence:{
            message: 'Please, enter your name'
        },
        format:{
            pattern: '',
            message: '',
        }
    },
    birthday:{
        presence:{
            message: 'Please, enter your name'
        },
        format:{
            pattern: '',
            message: '',
        }
    },
    email:{
        presence:{
            message: 'Please, enter your name'
        },
        format:{
            pattern: '',
            message: '',
        }
    },
};

export function validate(fieldName, value) {
    const resp = [null, null];
    if (validation.hasOwnProperty(fieldName)){
        const v = validation[fieldName];
        if (value === '' || value === null){
            resp[0] = false;
            resp[1] = v['presence']['message'];
        }
        else if (!v['format']['pattern'].test(value)){
            resp[0] = false;
            resp[1] = v['format']['message'];
        }
        else resp[0] = true;
    }
    else resp[0] = true;
    return resp;
}