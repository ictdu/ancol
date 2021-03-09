export const formatToLocalPH = (n: number) => {
    n = Math.abs(n);
    return "₱ " + n.toLocaleString('en-PH', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}