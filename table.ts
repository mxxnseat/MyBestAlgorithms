function goodRow(o, bl, t) {
    return (
        `${o.name}` +
        " ".repeat(bl + t - o.name.length) +
        "|" +
        " ".repeat(t) +
        `${o.amount}\n`
    );
}
function headerRow(n, bl, t) {
    return n + " ".repeat(bl + t - n.length) + "|" + " ".repeat(t) + "шт\n";
}

export function generateMessage(body: any) {
    let result = ``;
    const tabsCount = 3;
    const biggestNameLength = body.items.sort((prev, next) => {
        return next.name.length - prev.name.length;
    })[0].name.length;

    const biggestAmountLength = body.items
        .sort((prev, next) => {
            return (
                next.amount.toString().length - prev.amount.toString().length
            );
        })[0]
        .amount.toString().length;
    const dashLength =
        2 + biggestNameLength + tabsCount * 2 + biggestAmountLength;

    result += headerRow("Название товара", biggestNameLength, tabsCount);
    result += "-".repeat(dashLength) + "\n";
    body.items.forEach((el) => {
        const str = goodRow(el, biggestNameLength, tabsCount);

        result += str;
        result += `-`.repeat(dashLength) + "\n";
    });
    result += "Данные о покупателе:\n";
    result += `${body.name}\n`;
    result += `${body.address}\n`;
    result += `${body.phone}`;

    return result;
}
