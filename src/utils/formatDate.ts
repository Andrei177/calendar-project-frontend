export function formatDate(date: Date){
    const day = date.getDate() < 10? "0" + date.getDate(): date.getDate();
    const month = date.getMonth() < 9? "0" + (date.getMonth() + 1): (date.getMonth() + 1); // просто месяцы начинаются с нуля
    const year = date.getFullYear();
    const formatDate : string = day + "." + month + "." + year;
    
    return formatDate;
}