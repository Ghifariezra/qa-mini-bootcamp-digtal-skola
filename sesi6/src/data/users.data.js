export const usersData = {
    validData: [
        {
            userId: '6906253b673f8dae6a1023d8',
            username: 'Ridhwan',
            age: 29,
            protected: true
        },
        { 
            userId: '6a5daa0a4a401d30190c4e7b', 
            username: 'aik', 
            age: 31
         }
    ],
    addData: {
        valid: [
            {
                username: 'Ahooyyy',
                age: "25"
            },
        ],
        invalid: [
            {
                username: 'AssoooyyyBangetttt',
                age: 25
            },
        ],
        withLengthMoreThen256: [
            {
                username: 'asdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddadsdaaddasadadadsadsadsaddsaasdadsadsadsads',
                age: 25
            },
        ],
        withLengthMoreThen255: [
            {
                username: 'asdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddadsdaaddaasdsadasda',
                age: 25
            },
        ],
    }
}