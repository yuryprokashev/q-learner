/*
Усиливаем сигнал в 10000 раз и отрезаем десятичные чтобы получить целое.
 */
module.exports = parameterValue =>{
    return Math.trunc(parameterValue * 10000)
}