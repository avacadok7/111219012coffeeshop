
module.exports = {
    content:[
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme:{
        extend:{
            colors:{
                primary:"#714F43",
            },
            container:{
                center: true,
                padding:{
                    DEFAULT: "1rem",
                    sm: "3rem",
                },
            },
            fontFamily:{
                jaro: ['Jaro', 'sans-serif'],
            },
        },
    },
    plugins:[],

}