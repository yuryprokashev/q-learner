/*
Далее, мои параметры Опыта - это разности между параметрами Сред.
Вот есть Символ1. У него есть две Среды. Эти две Среды образуют Опыт.
Теперь, параметр1 у Среды1 равен 150, потому что курс Символа1 такой.
А параметр2 у Среды2 равен 150.5. Их разность 0.5 потому что курс Символа1 такой.
Но именно их разность - это параметр1-2 Опыта.
Как мне сделать так, чтобы одинаковый был код для двух разных символов?
Считать параметры Опыта относительно курса Символа.
Потому что сигнал, который я ловлю здесь в параметре Опыта - он относительно курса Символа Опыта.
Если у меня амплитуда Сигнала равна 0.5, а курс равен 150 - это одно дело. И совсем другое дело,
когда амплитуда 0.5, а курс 50.
 */
module.exports = (currentParameterValue, refParameterValue, refSymbolPrice)=>{
    return (currentParameterValue - refParameterValue)/ refSymbolPrice;
}