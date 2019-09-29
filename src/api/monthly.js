//月末结账查询
export function monthlyQuery(post,list){
	return post('/v1/monthly/monthlyQuery',list)
}
//结账检查
export function checkout(post,list){
	return post('/v1/monthly/checkout',list)
}
//月末结账
export function monthlyClosing(post,list){
	return post('/v1/monthly/monthlyClosing',list)
}
//反结账
export function counterSettlement(post,list){
	return post('/v1/monthly/counterSettlement',list)
}
//损益结转
export function CarryForwardLossProfit(post,list){
	return post('/v1/journal/CarryForwardLossProfit',list)
}