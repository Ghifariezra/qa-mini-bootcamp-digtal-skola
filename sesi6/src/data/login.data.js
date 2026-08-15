export const loginData = {
    validBody: {
        username: "admin",
        password: "admin",
    },
    invalidBody: {
        username: "invalid",
        password: "invalid",
    },
    missingFieldsBody: {
        username: "admin"
    },
    sqlInjectionBody: {
        username: "' OR '1'='1",
        password: "' OR '1'='1"
    },
    xssAttackBody: {
        username: "<script>alert('xss')</script>", 
        password: "password123" 
    },
    expiredToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzg2NzczMDY0LCJleHAiOjE3ODY3NzY2NjR9.K_6_Nc3hghcDYlpSJCI8BdqE9lr2SZDwQUgHFvdLtTo"
};