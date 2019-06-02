export const arrayReplace = (array, item, i) => {
	i = Number(i);
	return array.slice(0,i).concat(item).concat(array.slice(i+1, array.length));
}

export const dateToString = (diff) => {
	let d = new Date();
	d.setDate(d.getDate() - diff);
	
	let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}