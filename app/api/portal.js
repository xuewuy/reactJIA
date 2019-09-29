export function getGettingStartedInitData(post){
	return post("/v1/web/portal/perfectData", {})
}

export function closeGettingStarted(post){
	return post("/v1/web/portal/closeGettingStarted", {})
}
