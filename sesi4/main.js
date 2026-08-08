import { kalkulator } from "./kalkulator.js";

const value = [
    [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), "+"],
    [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), "-"],
    [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), "*"],
    [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), "/"]
]

for (let i = 0; i < value.length; i++) {
    console.log(kalkulator(value[i][0], value[i][1], value[i][2]))
}