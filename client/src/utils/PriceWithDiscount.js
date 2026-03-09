export const pricewithDiscount = (price, dis) => {
    const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - discountAmount

    return actualPrice
}