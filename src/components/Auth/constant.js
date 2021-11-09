const constant = {
    signupInputs:[
        {
            label: 'Name',
            name: 'name',
            type: 'text',
        },
        {
            label: 'E-mail',
            name: 'email',
            type: 'email',
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
        },
        {
            label: 'Location',
            name: 'location',
            type: 'text',
        }
    ],

    signinInputs : [

        {
            label: 'E-mail',
            name: 'email',
            type: 'email',
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
        },

    ],
    passwordRecovery : [

        {
            label: 'E-mail',
            name: 'email',
            type: 'email',
        },
    ]
}

export default constant;