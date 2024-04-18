export function formatDate(date: Date){
    const day = date.getDate() < 10? "0" + date.getDate(): date.getDate();
    const month = date.getMonth() < 10? "0" + date.getMonth(): date.getMonth();
    const year = date.getFullYear();
    const formatDate : string = day + "." + month + "." + year;
    
    return formatDate;
}