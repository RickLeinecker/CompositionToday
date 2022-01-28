
export function toSqlDatetime(inputDate: Date | null | undefined): string | null{
    if(!inputDate){
        return null;
    }

    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
}
